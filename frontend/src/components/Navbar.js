import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ currentUser, onLogout }) {
    return (
        <nav>
            <Link to="/">Home</Link>
            {currentUser ? (
                <>
                    <span>Logged in as {currentUser.username}</span>
                    <button onClick={onLogout}>Logout</button>
                    <Link to={`/users/${currentUser.username}`}>Profile</Link>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;
