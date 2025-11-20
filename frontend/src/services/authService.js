import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth';

// Store token in localStorage
const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

// Get token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Set auth header for axios requests
const setAuthHeader = () => {
    const token = getAuthToken();
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

const authService = {
    // Store token in localStorage
    setAuthToken,
    
    // Get token from localStorage
    getAuthToken,

    // Register new user
    register: async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, userData);
            if (response.data.token) {
                setAuthToken(response.data.token);
                setAuthHeader();
            }
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    // Login user
    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, credentials);
            if (response.data.token) {
                setAuthToken(response.data.token);
                setAuthHeader();
            }
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    // Logout user
    logout: () => {
        setAuthToken(null);
        setAuthHeader();
    },

    // Get current user profile
    getProfile: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/profile`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    // Update user profile
    updateProfile: async (profileData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/profile`, profileData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    // Change password
    changePassword: async (passwordData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/change-password`, passwordData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    // Check if user is logged in
    isAuthenticated: () => {
        const token = getAuthToken();
        return !!token;
    },

    // Get current user from token
    getCurrentUser: () => {
        const token = getAuthToken();
        if (!token) return null;
        
        try {
            // Simple JWT decode (for basic info)
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64));
            return JSON.parse(jsonPayload);
        } catch (error) {
            return null;
        }
    },

    // Initialize auth header
    initAuth: () => {
        setAuthHeader();
    }
};

export default authService;
