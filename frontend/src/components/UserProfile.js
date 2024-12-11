import React, { useState } from 'react';

function UserProfile({ user, currentUser, onUpdateDescription }) {
    const [description, setDescription] = useState(user.description || '');
    const canEdit = currentUser && currentUser._id === user._id;

    function handleSave() {
        onUpdateDescription(description);
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <p>Joined: {new Date(user.joined).toLocaleDateString()}</p>
            {canEdit ? (
                <>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                    <button onClick={handleSave}>Save Description</button>
                </>
            ) : (
                <p>{user.description}</p>
            )}
        </div>
    );
}

export default UserProfile;
