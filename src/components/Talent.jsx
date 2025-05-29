import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dataRef } from './Firebases';
import "../Styles/Talent.css"; // Import CSS for styling
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Talent() {
  const [formData, setFormData] = useState({
    title: "",
    skills: "",
    period: "",
    stipend: "",
    description: ""
  });
  const [userEmail, setUserEmail] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const { title, skills, period, stipend, description } = formData;

    if (title && skills && period && stipend && description && userEmail) {
      // Replace '.' with ',' in email to use it as a key
      const sanitizedEmail = userEmail.replace(/\./g, ',');
      dataRef.ref(`all/${sanitizedEmail}`).push(formData).then(() => {
        setFormData({
          title: "",
          skills: "",
          period: "",
          stipend: "",
          description: ""
        });
        navigate('/work'); // Navigate to the Work component after successful submission
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <div className="form-container">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Job Title"
            className="input-field"
            required
          />
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={onChange}
            placeholder="Skills required"
            className="input-field"
            required
          />
          <input
            type="text"
            name="period"
            value={formData.period}
            onChange={onChange}
            placeholder="Time Period"
            className="input-field"
            required
          />
          <input
            type="text"
            name="stipend"
            value={formData.stipend}
            onChange={onChange}
            placeholder="Stipend"
            className="input-field"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Description"
            className="textarea-field"
            required
          />
          <center>
            <button type="submit" className="apply">
              Post
            </button>
          </center>
        </div>
      </form>
    </div>
  );
}

export default Talent;
