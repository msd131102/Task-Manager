import axios from 'axios';
import authService from './authService';

const API_BASE_URL = 'http://localhost:5000/api/tasks';

// Initialize auth headers
authService.initAuth();

const taskService = {
    // Get all tasks with optional filters
    getTasks: async (params = {}) => {
        try {
            const response = await axios.get(API_BASE_URL, { params });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    // Get single task by ID
    getTaskById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    // Create new task
    createTask: async (taskData) => {
        try {
            const response = await axios.post(API_BASE_URL, taskData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    // Update task
    updateTask: async (id, taskData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, taskData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    // Delete task
    deleteTask: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    // Get task statistics
    getTaskStats: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/stats`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    }
};

export default taskService;
