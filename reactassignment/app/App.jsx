// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  // State for all fetched users
  const [users, setUsers] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);
  // State for the search input value
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect hook to perform the data fetching side-effect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
      } catch (err) {
        setError('Failed to load users. Try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []); // Empty dependency array means this runs only once on mount

  // Filter users based on the search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Conditional rendering based on different states
  if (loading) {
    return <div className="app-container">Loading users...</div>;
  }

  if (error) {
    return <div className="app-container error-message">{error}</div>;
  }

  return (
    <div className="app-container">
      <h1>User Explorer</h1>
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <UserList users={filteredUsers} />
    </div>
  );
}

export default App;
