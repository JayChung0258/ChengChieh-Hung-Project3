import React, { useState } from 'react';
import { login } from '../api';

function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await login(username, password);
        if (data.user) {
            onLoginSuccess(data.user);
        } else {
            alert(data.error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm;
