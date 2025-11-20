import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

const Profile = ({ user, onLogout }) => {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        avatar: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (user) {
            setProfileData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                username: user.username || '',
                email: user.email || '',
                avatar: user.avatar || ''
            });
        }
    }, [user]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
        setSuccess('');
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
        setSuccess('');
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.updateProfile(profileData);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setError('New password must be at least 6 characters');
            return;
        }

        setPasswordLoading(true);
        setError('');

        try {
            await authService.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            setSuccess('Password changed successfully!');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError(err.message || 'Failed to change password');
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleLogout = () => {
        authService.logout();
        onLogout();
    };

    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h2 className="card-title mb-0 h4">My Profile</h2>
                        </div>

                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-auto">
                                    {profileData.avatar ? (
                                        <img
                                            src={profileData.avatar}
                                            alt="Avatar"
                                            className="rounded-circle"
                                            width="80"
                                            height="80"
                                        />
                                    ) : (
                                        <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                                            {profileData.firstName?.charAt(0) || profileData.username?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                </div>
                                <div className="col">
                                    <h3 className="h5 mb-1">{profileData.firstName} {profileData.lastName}</h3>
                                    <p className="text-muted mb-1">@{profileData.username}</p>
                                    <p className="text-muted mb-0">{profileData.email}</p>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right me-1"></i>
                                        Logout
                                    </button>
                                </div>
                            </div>

                            <ul className="nav nav-tabs mb-3" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('profile')}
                                        type="button"
                                        role="tab"
                                    >
                                        <i className="bi bi-person me-1"></i>
                                        Edit Profile
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('password')}
                                        type="button"
                                        role="tab"
                                    >
                                        <i className="bi bi-key me-1"></i>
                                        Change Password
                                    </button>
                                </li>
                            </ul>

                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {error}
                                    <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    {success}
                                    <button type="button" className="btn-close" onClick={() => setSuccess('')} aria-label="Close"></button>
                                </div>
                            )}

                            <div className="tab-content">
                                {activeTab === 'profile' && (
                                    <form onSubmit={handleProfileSubmit}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label htmlFor="firstName" className="form-label">First Name</label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={profileData.firstName}
                                                    onChange={handleProfileChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={profileData.lastName}
                                                    onChange={handleProfileChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="username" className="form-label">Username</label>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={profileData.username}
                                                onChange={handleProfileChange}
                                                className="form-control"
                                                required
                                                minLength="3"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={profileData.email}
                                                onChange={handleProfileChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="avatar" className="form-label">Avatar URL</label>
                                            <input
                                                type="url"
                                                id="avatar"
                                                name="avatar"
                                                value={profileData.avatar}
                                                onChange={handleProfileChange}
                                                className="form-control"
                                                placeholder="https://example.com/avatar.jpg"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-check-circle me-1"></i>
                                                    Update Profile
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}

                                {activeTab === 'password' && (
                                    <form onSubmit={handlePasswordSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                            <input
                                                type="password"
                                                id="currentPassword"
                                                name="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="newPassword" className="form-label">New Password</label>
                                            <input
                                                type="password"
                                                id="newPassword"
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                className="form-control"
                                                required
                                                minLength="6"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordChange}
                                                className="form-control"
                                                required
                                                minLength="6"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-warning"
                                            disabled={passwordLoading}
                                        >
                                            {passwordLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Changing...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-key-fill me-1"></i>
                                                    Change Password
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
