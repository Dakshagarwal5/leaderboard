

import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ users }) => {
  if (!users || users.length === 0) return <p>No users found</p>;

  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const topThree = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Top 3 Performers</h2>
      <div className="top-three">
        {topThree.map((user, index) => (
          <div key={user._id} className={`top-card top-${index + 1}`}>
            <h3>#{index + 1}</h3>
            <p>{user.name}</p>
            <p>{user.points} pts</p>
          </div>
        ))}
      </div>

      <h2>📋 Full Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {rest.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 4}</td>
              <td>{user.name}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;


