import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import { logout } from './api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Attempt to fetch the current user (if logged in) on first load
  useEffect(() => {
    // Check session by calling an endpoint or parsing JWT from cookies
    // For simplicity, we might need a dedicated endpoint like /api/auth/me
    // Here, let's skip and assume we have no direct endpoint. In a real app, implement it.
  }, []);

  async function handleLogout() {
    await logout();
    setCurrentUser(null);
  }

  return (
    <Router>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage currentUser={currentUser} />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={setCurrentUser} />} />
          <Route path="/register" element={<RegisterPage onRegisterSuccess={setCurrentUser} />} />
          <Route path="/users/:username" element={<UserPage currentUser={currentUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
