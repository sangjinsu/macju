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
            <h2 className="footer-logo">
              Our Service
            </h2>
            <p>Community</p>
            <p>Recommend Beer</p>
            <p>Beer Info</p>
          </div>
        </div>


        <div className="col-md-4 footer-col">
          <div className="footer_contact">
            <h4 className="footer-logo">
              Contact Us
            </h4>
            <div className="contact_link_box">
              <a href="mailto:macju.service@gmail.com">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <span>
                  MacJu.service@gmail.com
                </span>
              </a>
              <span>
                오전9시 ~ 오후 6시 (주말 및 공휴일 휴무)
              </span>
            </div>
          </div>
        </div>


        <div className="col-md-4 footer-col">
          <h2 className="footer-logo">
            MacJU
          </h2>
          <p>
            SSAFY 1st Project
          </p>
          <p>상진수, 장정훈, 최수한 </p>
          <p>김현송, 김동일, 김소희 </p>
        </div>
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
