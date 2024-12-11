import React, { useState } from 'react';

function PostForm({ onSubmit }) {
    const [content, setContent] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(content);
        setContent('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="What's happening?"></textarea>
            <button type="submit">Post</button>
        </form>
    );
}

export default PostForm;
