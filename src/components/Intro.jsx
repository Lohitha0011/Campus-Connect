import React from 'react';
import img1 from '../assets/img1.png'; // Replace with your image path
import '../Styles/Intro.css';

function Intro() {
  const scrollToBottom = () => {
    window.scrollTo({ top: 1000, behavior: 'smooth' });
  };

  return (
    <div className="intro-container">
      <div className="intro-content">
        <h1 className="intro-title">Find the right freelance service</h1>
        <p className="intro-text">Connect with skilled professionals. Get your projects done efficiently.</p>
        <button type="button" className="intro-button" onClick={scrollToBottom}>
          Get Started Today
        </button>
      </div>
      <img src={img1} className="intro-image" alt="Freelance Services" />
    </div>
  );
}

export default Intro;
