import React from 'react';
import '../styles/Footer.css'
import '../styles/Responsive.css'


function Footer(){
  return(
  <footer className="footer_section">
    <div className="container">
      <div className="row">
        
        <div className="col-md-4 footer-col">
          <div className="footer_detail">
            <a href="https://edu.ssafy.com/comm/login/SecurityLoginForm.do" className="footer-logo">
              MacJU
            </a>
            <p>
              SSAFY 1st Project
            </p>
            <p>상진수, 장정훈, 최수한 </p>
            <p>김현송, 김동일, 김소희 </p>
            {/* <div className="footer_social">
              <a href="https://edu.ssafy.com/comm/login/SecurityLoginForm.do">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="https://edu.ssafy.com/comm/login/SecurityLoginForm.do">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="https://edu.ssafy.com/comm/login/SecurityLoginForm.do">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
              <a href="https://edu.ssafy.com/comm/login/SecurityLoginForm.do">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="https://edu.ssafy.com/comm/login/SecurityLoginForm.do">
                <i className="fa fa-pinterest" aria-hidden="true"></i>
              </a>
            </div> */}
          </div>
        </div>

        <div className="col-md-4 footer-col">
          <div className="footer_contact">
            <h4>
              Contact Us
            </h4>
            <div className="contact_link_box">
              <a href="https://edu.ssafy.com/comm/login/SecurityLoginForm.do">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <span>
                  Location
                </span>
              </a>
              <a href="https://edu.ssafy.com/comm/login/SecurityLoginForm.do">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <span>
                  Call +01 1234567890
                </span>
              </a>
              <a href="https://edu.ssafy.com/comm/login/SecurityLoginForm.do">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <span>
                  sopee9814@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>


        {/* <div className="col-md-4 footer-col">
          <h4>
            Opening Hours
          </h4>
          <p>
            Everyday
          </p>
          <p>
            00.00 Am -12.00 Pm
          </p>
        </div> */}
      </div>
      <div className="footer-info">
        <p>
          &copy; <span id="displayYear"></span> Distributed By MacJU
          {/* <a href="https://themewagon.com/" target="_blank"> MacJU</a> */}
        </p>
      </div>
    </div>
  </footer>

  )
}

export default Footer;
