
import React, { useState } from "react";
import axios from "axios";

const ClaimPoints = ({ users, onPointsClaimed }) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [claimResult, setClaimResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    if (!selectedUserId) return;
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/claim-points`, {
        userId: selectedUserId,
      });

      const { points } = response.data;

      setClaimResult(points);
      onPointsClaimed(selectedUserId, points); // callback to update leaderboard
    } catch (err) {
      console.error("Error claiming points:", err);
      alert("Failed to claim points. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <label>Select User: </label>
      <select
        value={selectedUserId}
        onChange={(e) => {
          setSelectedUserId(e.target.value);
          setClaimResult(null); // reset result on change
        }}
      >
        <option value="">-- Select --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={handleClaim} disabled={!selectedUserId || loading} style={{ marginLeft: "10px" }}>
        {loading ? "Claiming..." : "Claim"}
      </button>

      {claimResult !== null && (
        <p style={{ marginTop: "10px" }}>
          🎉 User gained <strong>{claimResult} points!</strong>
        </p>
      )}
    </div>
  );
};

export default ClaimPoints;
