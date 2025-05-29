import React, { useState, useEffect } from "react";
import { dataRef } from './Firebases';
import '../Styles/Pr.css'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Pr() {
  const [user, setUser] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState(""); 
  const [aname, setAname] = useState(""); 
  const [email, setEmail] = useState("");  
  const [college, setCollege] = useState("");
  const [location, setLocation] = useState("");
  const [exp, setExp] = useState("");
  const [ach, setAch] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [availableSkills, setAvailableSkills] = useState([]);
  const [skills, setSkills] = useState([]);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email); // Set email based on logged-in user
      } else {
        setUser(null);
        setEmail(""); // Clear email if no user is logged in
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSkillChange = (e) => {
    const { name, checked } = e.target;
    setSkills((prevSkills) => 
      checked ? [...prevSkills, name] : prevSkills.filter(skill => skill !== name)
    );
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills((prevSkills) => [...prevSkills, skillInput]);
      setAvailableSkills((prevSkills) => [...prevSkills, skillInput]);
    }
    setSkillInput("");
  };

  const onFnameChange = (event) => {
    setFname(event.target.value);
  };
  const onLnameChange = (event) => {
    setLname(event.target.value);
  };
  const onAnameChange = (event) => {
    setAname(event.target.value);
  };
  const onClgChange = (event) => {
    setCollege(event.target.value);
  };
  const onLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const onExpChange = (event) => {
    setExp(event.target.value);
  };
  const onAchChange = (event) => {
    setAch(event.target.value);
  };

  const AddtoFire = () => {
    const userData = {
      fname,
      lname,
      aname,
      email,
      college,
      location,
      exp,
      ach,
      skills
    };

    if (user) {
      dataRef.ref(`users/${user.uid}`).set(userData) // Corrected template string usage
        .then(() => {
          console.log("Data added successfully");
          // Clear all fields after successful save
          setFname("");
          setLname("");
          setAname("");
          setCollege("");
          setLocation("");
          setExp("");
          setAch("");
          setSkills([]);
          setAvailableSkills([]);
          setSkillInput("");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      console.error("User not authenticated.");
      // Handle case where user is not logged in
    }
  };

  return (
    <div className="main-contain-pr">
      <div className="ps-form-container-pr">
        <div className="ps-form-pr">
          <h2>Profile</h2>
          <input
            type="text"
            value={fname}
            onChange={onFnameChange}
            placeholder="First Name"
            className="input-field-pr"
          />
          <input
            type="text"
            value={lname}
            onChange={onLnameChange}
            placeholder="Last Name"
            className="input-field-pr"
          />
          <input
            type="text"
            value={aname}
            onChange={onAnameChange}
            placeholder="Additional Name"
            className="input-field-pr"
          />
          <input
            type="text"
            value={email}
            disabled
            placeholder="Email"
            className="input-field-pr"
          />
          <input
            type="text"
            value={college}
            onChange={onClgChange}
            placeholder="College"
            className="input-field-pr"
          />
          <input
            type="text"
            value={location}
            onChange={onLocationChange}
            placeholder="Location"
            className="input-field-pr"
          />
          
          <textarea
            value={exp}
            onChange={onExpChange}
            placeholder="Experience"
            className="input-field-pr textarea-field-pr"
          />
          <textarea
            value={ach}
            onChange={onAchChange}
            placeholder="Achievements"
            className="input-field-pr textarea-field-pr"
          />
          
          <div className="skills-container-pr">
            <h5>Select Your Skills</h5>
            <input
              type="text"
              value={skillInput}
              onChange={handleSkillInputChange}
              placeholder="Enter a skill"
              className="search-bar-pr"
            />
            <button type="button" onClick={handleAddSkill} className="l-btn-pr">
              Add Skill
            </button>
            <ul className="skills-list-pr">
              {availableSkills.map(skill => (
                <li key={skill}>
                  <input
                    type="checkbox"
                    name={skill}
                    className="skill-checkbox-pr"
                    onChange={handleSkillChange}
                    checked={skills.includes(skill)}
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="button-container-pr">
            
            <button type="button" className="l-btn-pr" onClick={AddtoFire}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pr;
