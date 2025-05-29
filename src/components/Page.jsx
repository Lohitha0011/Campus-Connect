import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Page.css";
import log from '../assets/log.png';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebases";
import { Link } from "react-router-dom";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate instead of useHistory for react-router-dom v6

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter all details");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail(""); // Clear email field
      setPassword(""); // Clear password field
      setError("");
      navigate("/"); // Redirect to home page
    } catch (error) {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="main-con">
      <div className="image-container">
        <img src={log} alt="Logo" />
      </div>
      <div className="login-form-container">
        <div className="login-form">
          <h2>Login</h2>
          {error && <p className="error" style={{color:"red"}}>{error}</p>}
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="inputs-field"
            required
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="inputs-field"
            required
          />
          <button type="button" className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <div className="signup-link" style={{marginTop:"20px"}}>
            <Link to="/Signup" >Create a new Account? SignUp</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
