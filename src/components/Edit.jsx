// Popup.js
import React from 'react';
import '../Styles/Popup.css';

function Edit({ message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Notice</h2>
        <p>{message}</p>
        <button type="button" className="close-btn" onClick={onClose}>Edit Profile</button>
      </div>
    </div>
  );
}

export default Edit;
