import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function Last() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="container my-5">
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: 'black' }}
        >
          <div className="container p-4 pb-0">
            <section className="">
              <div className="row">
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    Company
                  </h6>
                  <p>
                  We aim to address student's financial challenges by offering a platform where faculty and students can post small technical tasks.
                  </p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Legal Information</h6>
                  <p>
                    <a href="#!" className="text-white">Privacy Policy</a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">Terms of Service</a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">Cookie Policy</a>
                  </p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    Useful links
                  </h6>
                  <p>
                    <a href="#!" className="text-white" onClick={scrollToTop}>Home</a>
                  </p>
                  <p>
                    <Link to="/Ab" className="text-white">About</Link>
                  </p>
                  <p>
                    <a href="#!" className="text-white">Reviews</a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">Help</a>
                  </p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                  <p><i className="fas fa-home mr-3"></i> Bhimavaram, AP</p>
                  <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                  <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                  <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                </div>
              </div>
            </section>

            <hr className="my-3" />

            <section className="p-3 pt-0">
              <div className="row d-flex align-items-center">
                <div className="col-md-7 col-lg-8 text-center text-md-start">
                  <div className="p-3"></div>
                </div>
                <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                  <a className="btn btn-outline-light btn-floating m-1 text-white" href="#!" role="button"><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-outline-light btn-floating m-1 text-white" href="#!" role="button"><i className="fab fa-twitter"></i></a>
                  <a className="btn btn-outline-light btn-floating m-1 text-white" href="#!" role="button"><i className="fab fa-google"></i></a>
                  <a className="btn btn-outline-light btn-floating m-1 text-white" href="#!" role="button"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </section>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Last;
