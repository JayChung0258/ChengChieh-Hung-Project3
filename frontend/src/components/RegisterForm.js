import React, { useState } from 'react';
import { registerUser } from '../api';

function RegisterForm({ onRegisterSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await registerUser(username, password);
        if (data.user) {
            onRegisterSuccess(data.user);
        } else {
            alert(data.error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm;
