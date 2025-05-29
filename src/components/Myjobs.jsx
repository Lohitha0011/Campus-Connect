import React, { useEffect, useState } from 'react';
import { dataRef, auth } from './Firebases';
import "../Styles/MyJobs.css"; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function MyJobs() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (userEmail) {
      const sanitizedEmail = userEmail.replace(/\./g, ',');
      dataRef.ref().child(`all/${sanitizedEmail}`).on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const getUserPosts = Object.values(data).reverse(); // Reverse to get recent jobs first
          setUserPosts(getUserPosts);
        } else {
          setUserPosts([]);
        }
        setLoading(false);
      });
    }
  }, [userEmail]);

  const handleViewApplicants = (postId) => {
    console.log(`View applicants for post ID: ${postId}`);
    // Implement the logic to view applicants
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-jobs-container">
      <h2 className="my-jobs-title">My Jobs</h2>
      <div className="my-jobs-data">
        {userPosts.length > 0 ? (
          userPosts.map((item, index) => (
            <div key={index} className="my-jobs-item">
              <h4>{item.title}</h4>
              <p><strong>Skills:</strong> {item.skills}</p>
              <p><strong>Period:</strong> {item.period}</p>
              <p><strong>Stipend:</strong> {item.stipend}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <button 
                type="button" 
                className="my-jobs-btn" 
                onClick={() => handleViewApplicants(item.postId)} // Pass the postId to handleViewApplicants
              >
                View Applicants
              </button>
            </div>
          ))
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyJobs;
