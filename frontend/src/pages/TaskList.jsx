import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import taskService from '../services/taskService';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        priority: '',
        sortBy: 'createdAt:desc'
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    });
    const [stats, setStats] = useState(null);

    // Client-side filtering for search
    const filteredTasks = tasks.filter(task => {
        const searchText = filters.search.toLowerCase();
        const matchesSearch = !searchText || 
            task.title.toLowerCase().includes(searchText) ||
            (task.description && task.description.toLowerCase().includes(searchText)) ||
            (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchText)));
        
        const matchesStatus = !filters.status || task.status === filters.status;
        const matchesPriority = !filters.priority || task.priority === filters.priority;
        
        return matchesSearch && matchesStatus && matchesPriority;
    });

    useEffect(() => {
        fetchTasks();
        fetchStats();
    }, [filters.status, filters.priority, filters.sortBy, pagination.page]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const params = {
                page: pagination.page,
                limit: pagination.limit,
                status: filters.status,
                priority: filters.priority,
                sortBy: filters.sortBy
            };
            
            // Remove empty filters except search (we'll handle search on client side)
            Object.keys(params).forEach(key => {
                if (params[key] === '' || params[key] === null) {
                    delete params[key];
                }
            });

            const response = await taskService.getTasks(params);
            setTasks(response.tasks);
            setPagination(response.pagination);
            setError('');
        } catch (err) {
            setError('Failed to fetch tasks. Please try again.');
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await taskService.getTaskStats();
            setStats(response);
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    const handleAddTask = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleSaveTask = async (taskData) => {
        try {
            if (editingTask) {
                await taskService.updateTask(editingTask._id, taskData);
            } else {
                await taskService.createTask(taskData);
            }
            setShowForm(false);
            setEditingTask(null);
            fetchTasks();
            fetchStats();
        } catch (err) {
            setError(err.message || 'Failed to save task');
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(taskId);
                fetchTasks();
                fetchStats();
            } catch (err) {
                setError(err.message || 'Failed to delete task');
            }
        }
    };

    const handleStatusChange = async (taskId, type, value) => {
        try {
            const task = tasks.find(t => t._id === taskId);
            if (!task) return;

            let updatedTask = { ...task };

            if (type === 'status') {
                updatedTask.status = value;
            } else if (typeof type === 'number') {
                // Subtask toggle
                updatedTask.subtasks = task.subtasks.map((subtask, index) =>
                    index === type ? { ...subtask, completed: value } : subtask
                );
            }

            await taskService.updateTask(taskId, updatedTask);
            fetchTasks();
            fetchStats();
        } catch (err) {
            setError(err.message || 'Failed to update task');
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
        setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            status: '',
            priority: '',
            sortBy: 'createdAt:desc'
        });
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    return (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col-12 d-flex justify-content-between align-items-center">
                    <h1>Task Manager</h1>
                    <button className="btn btn-primary" onClick={handleAddTask}>
                        + Add New Task
                    </button>
                </div>
            </div>

            {stats && (
                <div className="row mb-4">
                    <div className="col-12 col-sm-6 col-md-3 mb-3">
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title">Total Tasks</h5>
                                <h2 className="card-text">{stats.totalTasks}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-3">
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title">Overdue</h5>
                                <h2 className="card-text text-danger">{stats.overdueTasks}</h2>
                            </div>
                        </div>
                    </div>
                    {stats.statusStats.map(stat => (
                        <div key={stat._id} className="col-12 col-sm-6 col-md-3 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">{stat._id}</h5>
                                    <h2 className="card-text">{stat.count}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="row mb-4 g-3">
                <div className="col-12 col-md-6 col-lg-3">
                    <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        placeholder="Search tasks..."
                        className="form-control"
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <select name="status" value={filters.status} onChange={handleFilterChange} className="form-select">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <select name="priority" value={filters.priority} onChange={handleFilterChange} className="form-select">
                        <option value="">All Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="form-select">
                        <option value="createdAt:desc">Newest First</option>
                        <option value="createdAt:asc">Oldest First</option>
                        <option value="dueDate:asc">Due Date (Earliest)</option>
                        <option value="dueDate:desc">Due Date (Latest)</option>
                        <option value="priority:desc">Priority (High to Low)</option>
                        <option value="priority:asc">Priority (Low to High)</option>
                    </select>
                </div>

                <div className="col-12">
                    <button className="btn btn-secondary" onClick={clearFilters}>
                        Clear Filters
                    </button>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
                </div>
            )}

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading tasks...</p>
                </div>
            ) : tasks.length === 0 ? (
                <div className="text-center">
                    <h3>No tasks found</h3>
                    <p>Create your first task to get started!</p>
                </div>
            ) : (
                <>
                    <div className="row">
                        {filteredTasks.map(task => (
                            <div key={task._id} className="col-12 col-md-6 col-lg-4 mb-3">
                                <TaskCard
                                    task={task}
                                    onEdit={handleEditTask}
                                    onDelete={handleDeleteTask}
                                    onStatusChange={handleStatusChange}
                                />
                            </div>
                        ))}
                    </div>

                    {pagination.pages > 1 && (
                        <nav aria-label="Task pagination">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                        disabled={pagination.page === 1}
                                    >
                                        Previous
                                    </button>
                                </li>
                                <li className="page-item disabled">
                                    <span className="page-link">
                                        Page {pagination.page} of {pagination.pages}
                                    </span>
                                </li>
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                        disabled={pagination.page === pagination.pages}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </>
            )}

            {showForm && (
                <TaskForm
                    task={editingTask}
                    onSave={handleSaveTask}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingTask(null);
                    }}
                />
            )}
        </div>
    );
};

export default TaskList;
