import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { FiUser, FiMessageCircle } from "react-icons/fi";
import "../Styles/NavBar.css";

function NavBar() {
  const [user, setUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowUserDetails(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Campus connect</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/work" className="nav-link">Find Work</Link>
            </li>
            <li className="nav-item">
              <Link to="/talent" className="nav-link">Find Talent</Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className="nav-link">Events</Link>
            </li>
            <li className="nav-item">
              <Link to="/livechat" className="nav-link">
                <FiMessageCircle style={{ fontSize: "23px" }} />
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {user ? (
              <div className="dropdown" ref={dropdownRef}>
                <div className="profile-icon" onClick={toggleUserDetails}>
                  <FiUser style={{ fontSize: "23px" }} />
                </div>
                {showUserDetails && (
                  <div className="dropdown-menu dropdown-menu-end show" style={{ right: "0", left: "auto" }}>
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <Link to={`/livechat/${user.email}`} className="dropdown-item">Messages</Link> {/* Added Messages Link */}
                    <Link to="/myjobs" className="dropdown-item">My Jobs</Link>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" type="button" className="btn btn-success custom-btn">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
