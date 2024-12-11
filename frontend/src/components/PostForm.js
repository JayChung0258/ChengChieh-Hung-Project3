import React, { useState } from 'react';
import '../css/PostForm.css';

function PostForm({ onSubmit }) {
    const [content, setContent] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!content.trim()) return;
        onSubmit(content);
        setContent('');
    }

    return (
        <div className="post-form">
            <h2>Create a Post</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default PostForm;
