import React from 'react';

function UserDropdown({ users, onChange }) {
  return (
    <select onChange={(e) => onChange(e.target.value)} className="dropdown">
      <option value="">Select a user</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

export default UserDropdown;
