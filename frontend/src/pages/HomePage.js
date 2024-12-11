import React, { useEffect, useState } from 'react';
import { fetchPosts, createPost } from '../api';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

function HomePage({ currentUser }) {
    const [posts, setPosts] = useState([]);

    async function loadPosts() {
        const data = await fetchPosts();
        setPosts(data);
    }

    useEffect(() => {
        loadPosts();
    }, []);

    async function handleCreatePost(content) {
        const newPost = await createPost(content);
        setPosts([newPost, ...posts]);
    }

    async function handleEditPost(id, content) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ content })
        });
        const updated = await res.json();
        setPosts(posts.map(p => p._id === id ? updated : p));
    }

    async function handleDeletePost(id) {
        await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        setPosts(posts.filter(p => p._id !== id));
    }

    return (
        <div>
            <h2>All Posts</h2>
            {currentUser && <PostForm onSubmit={handleCreatePost} />}
            <PostList posts={posts} currentUser={currentUser} onEdit={handleEditPost} onDelete={handleDeletePost} />
        </div>
    )
}

export default HomePage;
