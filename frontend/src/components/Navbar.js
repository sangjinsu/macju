import React from 'react';
import './Navbar.css'
import './responsive.css'
import { Link } from "react-router-dom"

function NavBar(){

  const toggleClick = () => {
    document.getElementById("tglButton").click();
  }

  return(
    <div className='sub_page'>
    <div class="hero_area">
      <div class="bg-box">
        {/* <img src="img/hero-bg.jpg" alt=""></img> */}
      </div>
      <header class="header_section">
        <div class="container">
          <nav class="navbar navbar-expand-sm custom_nav-container ">
            <a class="navbar-brand" href="/home">
              <span>
                MacJU
              </span>
            </a>

            <button id='tglButton' class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class=""> </span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent" onClick={toggleClick}>
              <ul class="navbar-nav mx-auto" >
                <li class="nav-item">
                  <Link class='nav-link' to='/home'>Home</Link>
                </li>
                <li class="nav-item">
                  <Link class='nav-link' to='/beer'>Beer</Link>
                </li>
                <li class="nav-item">
                  <Link class='nav-link' to='/post'>Posts</Link>
                </li>
              </ul>
              <div class="user_option">
                <Link to='/signup' class="user_link">
                  <i class="fa fa-user" aria-hidden="true"></i>
                </Link>
                <form class="form-inline">
                  <button class="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </form>
                <div class="order_online">
                  <Link class='nav-link login' to='/signup'>login</Link>
                </div>
              </div>
              
            </div>
          </nav>
        </div>
      </header>
    </div>
    </div>
  )
}
export default NavBar;
