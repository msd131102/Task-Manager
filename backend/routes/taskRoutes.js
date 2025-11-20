const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

// Apply authentication middleware to all routes
router.use(protect);

// Route for task statistics
router.get('/stats', taskController.getTaskStats);

// Route for getting all tasks with search/filter/pagination
router.route('/')
    .get(taskController.getTasks)
    .post(taskController.createTask);

// Route for individual task operations
router.route('/:id')
    .get(taskController.getTaskById)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);

module.exports = router;
