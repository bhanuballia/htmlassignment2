// src/UserList.jsx
import React from 'react';
import UserCard from './UserCard';

function UserList({ users }) {
  // Conditional rendering for the "No results" message
  if (users.length === 0) {
    return <p>No users match your search.</p>;
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      padding: '20px'
    }}>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
