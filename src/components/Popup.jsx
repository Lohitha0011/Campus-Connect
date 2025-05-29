import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "../Styles/Popup.css"; // Ensure you have styles for the popup

const Popup = ({ job, onCancel, onConfirm }) => {
  const [confirmSecondQuestion, setConfirmSecondQuestion] = useState(false);

  const handleConfirm = () => {
    if (!confirmSecondQuestion) {
      // Show the second question
      setConfirmSecondQuestion(true);
    } else {
      // If already confirmed the second question, proceed with onConfirm
      onConfirm();
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        {!confirmSecondQuestion && (
          <>
            <h2>Confirm Application</h2>
            <p>Are you sure you want to apply for the job "{job.title}"?</p>
          </>
        )}
        {confirmSecondQuestion && (
          <>
            <h2>Confirm Details</h2>
            <p>Are you okay with the stipend of {job.stipend} and duration of {job.period}?</p>
            <p>Your profile details will be sent to the employer.</p>
          </>
        )}
        <div className="popup-buttons">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-btn" onClick={handleConfirm}>
            {confirmSecondQuestion ? 'Apply' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  job: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Popup;
