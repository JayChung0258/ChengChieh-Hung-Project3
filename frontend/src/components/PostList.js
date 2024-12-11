import React from 'react';
import { Link } from 'react-router-dom';

function PostList({ posts, currentUser, onEdit, onDelete }) {
    return (
        <div>
            {posts.map(post => (
                <div key={post._id} style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
                    <p>{post.content}</p>
                    <Link to={`/users/${post.author.username}`}>{post.author.username}</Link> - {new Date(post.createdAt).toLocaleString()}
                    {currentUser && currentUser._id === post.author._id && (
                        <div>
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
    )
}

export default PostList;
