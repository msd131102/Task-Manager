const Task = require('../models/Task');
const { protect } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, tags, subtasks } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const task = new Task({
            user: new mongoose.Types.ObjectId(req.user.id),
            title,
            description,
            priority,
            dueDate,
            tags,
            subtasks
        });

        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Error in createTask:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all tasks with pagination, search, and filter
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Convert user ID to ObjectId for proper MongoDB querying
        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Build query
        let query = { user: userId };

        // Search functionality
        if (req.query.search) {
            query.$text = { $search: req.query.search };
        }

        // Filter by status
        if (req.query.status) {
            query.status = req.query.status;
        }

        // Filter by priority
        if (req.query.priority) {
            query.priority = req.query.priority;
        }

        // Filter by due date range
        if (req.query.dueDateFrom || req.query.dueDateTo) {
            query.dueDate = {};
            if (req.query.dueDateFrom) {
                query.dueDate.$gte = new Date(req.query.dueDateFrom);
            }
            if (req.query.dueDateTo) {
                query.dueDate.$lte = new Date(req.query.dueDateTo);
            }
        }

        // Sort options
        let sort = {};
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        } else {
            sort.createdAt = -1; // Default sort by newest first
        }

        const tasks = await Task.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const total = await Task.countDocuments(query);

        res.json({
            tasks,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error in getTasks:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: new mongoose.Types.ObjectId(req.user.id) });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Task not found' });
        }
        console.error('Error in getTaskById:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate, tags, subtasks } = req.body;

        const task = await Task.findOne({ _id: req.params.id, user: new mongoose.Types.ObjectId(req.user.id) });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (title) task.title = title;
        if (description !== undefined) task.description = description;
        if (status) task.status = status;
        if (priority) task.priority = priority;
        if (dueDate !== undefined) task.dueDate = dueDate;
        if (tags) task.tags = tags;
        if (subtasks) task.subtasks = subtasks;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Task not found' });
        }
        console.error('Error in updateTask:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: new mongoose.Types.ObjectId(req.user.id) });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed successfully' });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Task not found' });
        }
        console.error('Error in deleteTask:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);
        
        const stats = await Task.aggregate([
            {
                $match: { user: userId }
            },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const priorityStats = await Task.aggregate([
            {
                $match: { user: userId }
            },
            {
                $group: {
                    _id: '$priority',
                    count: { $sum: 1 }
                }
            }
        ]);

        const totalTasks = await Task.countDocuments({ user: userId });
        const overdueTasks = await Task.countDocuments({
            user: userId,
            dueDate: { $lt: new Date() },
            status: { $ne: 'completed' }
        });

        res.json({
            totalTasks,
            overdueTasks,
            statusStats: stats,
            priorityStats
        });
    } catch (error) {
        console.error('Error in getTaskStats:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const protectedTaskRoutes = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getTaskStats
};

module.exports = {
    ...protectedTaskRoutes,
    protect
};
