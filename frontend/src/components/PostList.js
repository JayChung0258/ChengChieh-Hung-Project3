import React from 'react';
import '../css/PostList.css';

function PostList({ posts, currentUser, onEdit, onDelete }) {
    return (
        <div className="post-list">
            {posts.map(post => (
                <div className="post-card" key={post._id}>
                    <div className="post-meta">
                        <div className="post-avatar"></div>
                        <a className="post-author" href={`/users/${post.author.username}`}>
                            {post.author.username}
                        </a>
                        <span className="post-timestamp">
                            {new Date(post.createdAt).toLocaleString()}
                        </span>
                    </div>
                    <div className="post-content">
                        {post.content}
                    </div>
                    {currentUser && currentUser._id === post.author._id && (
                        <div className="post-actions">
                            <button onClick={() => {
                                const newContent = prompt('Edit Post', post.content);
                                if (newContent) onEdit(post._id, newContent);
                            }}>Edit</button>
                            <button onClick={() => onDelete(post._id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PostList;
