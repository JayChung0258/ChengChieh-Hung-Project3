const API_URL = process.env.REACT_APP_API_URL;

export async function fetchPosts() {
    const res = await fetch(`${API_URL}/posts`, {
        credentials: 'include'
    });
    return res.json();
}

export async function createPost(content) {
    const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content })
    });
    return res.json();
}

export async function login(username, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
    });
    return res.json();
}

export async function registerUser(username, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
    });
    return res.json();
}

export async function logout() {
    const res = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    });
    return res.json();
}

export async function getUserProfile(username) {
    const res = await fetch(`${API_URL}/users/${username}`, {
        credentials: 'include'
    });
    return res.json();
}

export async function updateUserDescription(username, description) {
    const res = await fetch(`${API_URL}/users/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ description })
    });
    return res.json();
}
