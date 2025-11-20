import React, { useState } from 'react';
import authService from '../services/authService';
import './Login.css';

const Login = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                const response = await authService.login({
                    email: formData.email,
                    password: formData.password
                });
                onLogin(response.user, response.token);

            } else {
                const response = await authService.register(formData);
                onLogin(response.user, response.token);
            }

        } catch (err) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        });
    };

    return (
        <div className="auth-bg">
            <div className="auth-card animate-card">

                <div className="auth-header">
                    <div className="auth-logo">
                        🌟
                    </div>
                    <h1 className="auth-title">{isLogin ? "Welcome Back" : "Create Account"}</h1>
                    <p className="auth-subtitle">
                        {isLogin ? "Sign in to continue" : "Join the community today"}
                    </p>
                </div>

                {error && <div className="auth-error">⚠️ {error}</div>}

                <form onSubmit={handleSubmit}>

                    {!isLogin && (
                        <>
                            <div className="row-two">
                                <div className="input-group-custom">
                                    <label>🔤 First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="🧑‍📝 Enter your first name"
                                        required
                                    />
                                </div>

                                <div className="input-group-custom">
                                    <label>👤 Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="🧑 Enter your last name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group-custom">
                                <label>📛 Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="🏷️ Choose a username"
                                    minLength="3"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="input-group-custom">
                        <label>📧 Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="📩 Enter your email"
                            required
                        />
                    </div>

                    <div className="input-group-custom">
                        <label>🔐 Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="🔒 Enter your password"
                            minLength="6"
                            required
                        />
                    </div>

                    <button className="auth-btn" disabled={loading}>
                        {loading ? "⏳ Please wait..." : isLogin ? "➡️ Sign In" : "✨ Create Account"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
                    <button className="switch-btn" onClick={toggleMode}>
                        {isLogin ? "Create Account" : "Sign In"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Login;
