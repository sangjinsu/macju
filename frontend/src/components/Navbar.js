import React from 'react';
import '../styles/Navbar.css'
import '../styles/responsive.css'
import { Link } from "react-router-dom"

function NavBar(){

  const toggleClick = () => {
    document.getElementById("tglButton").click();
  }

  return(
    <div className='zindex'>
      <div className='navbar_page'>
        <div className="navbar_area">
          <div className="bg-box">
            {/* <img src="img/hero-bg.jpg" alt=""></img> */}
          </div>
          <header className="navbar_section">
            <div className="container">
              <nav className="navbar navbar-expand-sm custom_nav-container ">
                <a className="navbar-brand" href="/home">
                  <span>
                    MacJU
                  </span>
                </a>

                <button id='tglButton' className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className=""> </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" onClick={toggleClick}>
                  <ul className="navbar-nav mx-auto" >
                    <li className="nav-item">
                      <Link className='nav-link' to='/home'>Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link' to='/beer'>Beer</Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link' to='/post'>Posts</Link>
                    </li>
                  </ul>
                  <div className="user_option">
                    <Link to='/profile' className="user_link">
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </Link>
                    <form className="form-inline">
                      <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </form>
                    
                    <div className="order_online">
                      <Link className='nav-link nav_login' to='/login'>login</Link>
                    </div>
                  </div>
                  
                </div>
              </nav>
            </div>
          </header>
        </div>
      </div>
    </div>)
}
export default NavBar;
