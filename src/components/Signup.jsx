import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import log from '../assets/singn.png';
import "../Styles/Signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebases";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onEmailChange = (event) => setEmail(event.target.value);
  const onNameChange = (event) => setName(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);
  const onConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const register = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      navigate("/"); // Redirect to home page after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="main-contain">
      <div className="image-form-container">
        <div className="image-form">
          <img src={log} alt="Logo" />
        </div>
      </div>
      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Signup</h2>
          {error && <div className="error" style={{color:"red"}}>{error}</div>}
          <input
            type="text"
            value={name}
            onChange={onNameChange}
            placeholder="Name"
            className="input-field"
            required
          />
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
            className="input-field"
            required
          />
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
            className="input-field"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            placeholder="Confirm Password"
            className="input-field"
            required
          />
          <button type="button" className="login-btn" onClick={register}>
            Signup
          </button>
          <div className="login-link" style={{marginTop:"20px"}}>
            <Link to="/Page">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
