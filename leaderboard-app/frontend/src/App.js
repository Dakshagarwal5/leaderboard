import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leaderboard from './components/Leaderboard';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [claimedPoints, setClaimedPoints] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClaimPoints = async () => {
    if (!selectedUserId) {
      alert('Please select a user');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/claim', {
        userId: selectedUserId,
      });

      const claimed = res.data.claimedPoints;
      setClaimedPoints(claimed);
      await fetchUsers(); // Refresh leaderboard
    } catch (err) {
      console.error('Error claiming points:', err);
      alert('Failed to claim points');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">🌟 Monthly Wealth Ranking</h2>

        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="dropdown"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <button onClick={handleClaimPoints} className="claim-button">
          Claim Points
        </button>

        {claimedPoints !== null && (
          <p style={{ color: '#10b981', fontWeight: '600', textAlign: 'center' }}>
            🎉 You claimed {claimedPoints} points!
          </p>
        )}

        <Leaderboard users={users} />
      </div>
    </div>
  );
}

export default App;
