import React from 'react';

const Navbar = ({ user, onLogout, onNavigate }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Task Manager</span>
                <div className="d-flex">
                    <button className="btn btn-outline-light me-2" onClick={() => onNavigate('tasks')}>
                        Tasks
                    </button>
                    <button className="btn btn-outline-light me-2" onClick={() => onNavigate('profile')}>
                        Profile
                    </button>
                    <button className="btn btn-outline-danger" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
