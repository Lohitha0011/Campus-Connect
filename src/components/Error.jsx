import React from 'react';
import '../Styles/Error.css'; // Ensure you have the correct path to the CSS file
import { Link } from 'react-router-dom';

function Error({ error, onClose }) {
  return (
    <div className="error-popup-overlay">
      <div className="error-popup">
        <center><h2 className='danger'>Error</h2></center>
        <p>You need to log in to view the events. Please log in to continue.</p>
        <Link to="/login" onClick={onClose}>Login</Link>
      </div>
    </div>
  );
}

export default Error;
