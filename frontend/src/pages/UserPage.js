import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile, updateUserDescription } from '../api';
import UserProfile from '../components/UserProfile';
import PostList from '../components/PostList';

function UserPage({ currentUser }) {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);

    async function loadUserData() {
        const data = await getUserProfile(username);
        setUserData(data);
    }

    useEffect(() => {
        loadUserData();
    }, [username]);

    async function handleUpdateDescription(desc) {
        const res = await updateUserDescription(username, desc);
        setUserData({ ...userData, user: res.user });
    }

    if (!userData) return <div>Loading...</div>;

    return (
        <div>
            <UserProfile user={userData.user} currentUser={currentUser} onUpdateDescription={handleUpdateDescription} />
            <h3>{userData.user.username}'s Posts</h3>
            <PostList
                posts={userData.posts}
                currentUser={currentUser}
                onEdit={async (id, content) => {
                    const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ content })
                    });
                    const updated = await res.json();
                    setUserData({
                        ...userData,
                        posts: userData.posts.map(p => p._id === id ? updated : p)
                    });
                }}
                onDelete={async (id) => {
                    await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
                        method: 'DELETE',
                        credentials: 'include'
                    });
                    setUserData({
                        ...userData,
                        posts: userData.posts.filter(p => p._id !== id)
                    });
                }}
            />
        </div>
    );
}

export default UserPage;
