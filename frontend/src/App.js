import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import { logout } from './api';
import './css/App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function checkLogin() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        console.log("User data from /auth/me:", data.user);
        setCurrentUser(data.user);
      } else {
        console.log("Failed to authenticate:", res.status);
        setCurrentUser(null);
      }
    }
    checkLogin();
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
