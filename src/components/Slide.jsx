import React from 'react';
import img2 from '../assets/img2.jpg';
import imgs2 from '../assets/imgs2.webp';
import imgs3 from '../assets/imgs3.webp';
import "../Styles/Slide.css";

function Slide() {
  return (
    <>
      
      <h3>A whole world of freelance talent at your fingertips</h3>
    <div className="carousel-container">
    
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img2} className="d-block w-100 carousel-image" alt="Slide 1" />
            <div className="carousel-caption">
              <h5>Explore Diverse Freelancing Opportunities</h5>
              <p>Discover a variety of freelance gigs that match your skills and passions.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={imgs2} className="d-block w-100 carousel-image" alt="Slide 2" />
            <div className="carousel-caption">
              <h5>Empower Your Freelance Journey</h5>
              <p>Connecting you with top freelance talent to achieve your project goals efficiently and effectively.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={imgs3} className="d-block w-100 carousel-image" alt="Slide 3" />
            <div className="carousel-caption">
              <h5>Streamline Your Hiring Process</h5>
              <p>Easily manage and hire top freelancers for your projects with our comprehensive platform.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    </>
  );
}

export default Slide;
