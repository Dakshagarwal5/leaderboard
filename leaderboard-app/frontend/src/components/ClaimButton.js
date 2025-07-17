

import React from 'react';

function ClaimButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        margin: '10px 0',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      Claim Points
    </button>
  );
}

export default ClaimButton;
