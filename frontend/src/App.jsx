import React, { useState, useEffect } from 'react';
import TaskList from './pages/TaskList';
import Login from './components/Login';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import authService from './services/authService';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTasks, setShowTasks] = useState(false);

  useEffect(() => {
    try {
      // Check if user is already logged in
      const token = authService.getAuthToken();
      if (token) {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        setShowTasks(true);
      }
      setLoading(false);
    } catch (error) {
      console.error('App initialization error:', error);
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    authService.setAuthToken(token);
    setShowTasks(true);
  };

  const handleLogout = () => {
    setUser(null);
    authService.logout();
    setShowTasks(false);
  };

  const handleShowTasks = () => {
    setShowTasks(true);
  };

  const handleShowProfile = () => {
    setShowTasks(false);
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      <a href="#main-content" className="visually-hidden-focusable position-absolute">Skip to main content</a>
      {user && (
        <Navbar
          user={user}
          onLogout={handleLogout}
          onNavigate={(destination) => {
            if (destination === 'tasks') {
              handleShowTasks();
            } else if (destination === 'profile') {
              handleShowProfile();
            }
          }}
        />
      )}

      <main id="main-content" className="py-4">
        <div className="container-fluid">
          {user && showTasks && (
            <TaskList />
          )}

          {user && !showTasks && (
            <Profile user={user} onLogout={handleLogout} />
          )}

          {!user && (
            <Login onLogin={handleLogin} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
