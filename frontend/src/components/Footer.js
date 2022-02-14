import React from 'react';
import '../styles/Footer.css'
import '../styles/Responsive.css'


function Footer(){
  return(
    <>
    <hr className="hr_bg" />
  <footer className="footer_section">
    <div className="container">
      <div className="row">
        
        <div className="col-md-4 footer-col">
          <div className="footer_detail">
            <h2 className="footer-logo">
              Our Service
            </h2>
            <span>Community</span> <br />
            <span>Recommend Beer</span> <br />
            <span>Beer Info</span> <br />
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
                9 A.M. ~ 6 P.M.
              </span>
              <span>
                (Closed on weekends and holidays)
              </span>
            </div>
          </div>
        </div>


        <div className="col-md-4 footer-col">
          <h2 className="footer-logo">
            MacJU
          </h2>
          <p>SSAFY 1st Project</p>
          <span>Jinsu Sang, Jeonghoon Jang</span> <br />
          <span>Soohan Choi, Dongil Kim</span> <br />
          <span>Hyunsong Kim, Sohee Kim </span> <br />
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
  </>

  )
}

export default Footer;
