import React, { useState } from 'react';
import '../styles/Navbar.css'
import '../styles/Responsive.css'
import { Link } from "react-router-dom"
import SearchBar from './SearchBar.js'


function NavBar(){
  const memberId = 1    // test용 멤버 아이디


  const [isExpanded, setIsExpanded] = useState(false)
  const toggleBtn = document.getElementById("tglButton")
  const toggleClick = (() => {
    setIsExpanded(!isExpanded)
    // console.log('click')
  })
  
  
  const navClick = ((e) => {
    if (isExpanded) {
     toggleBtn.click()
    }
  })
  
  // const [isClose, setIsClose] = useState()

  // useEffect(()=>{
  //   const toggleBtn = document.getElementById("tglButton")

  //   const closeNav = store.getState().navbarReducer
  //   console.log(closeNav)
  //   console.log(store.getState().navbarReducer)    
  //   if (closeNav && isExpanded) {
  //     toggleBtn.click()
  //   }
  // },[])
  
  
  

  
  return(
    <div className='zindex'>
      <div className='navbar_page'>
        <div className="navbar_area">
          <div className="bg-box">
            {/* <img src="img/hero-bg.jpg" alt=""></img> */}
          </div>
          <header className="navbar_section">
            <div className="container">
              <nav className="navbar navbar-expand-xs custom_nav-container ">
                <a className="navbar-brand" href="/home">
                  <span>
                    MacJU
                  </span>
                </a>

                
                <div className='searchbar'>
                  <Link to='/search' className="searchicon " onClick={navClick}><i className="fa fa-search"></i></Link>
                  <SearchBar/>
                </div>

                {/* 드롭다운(토글) */}
                {/* <div className="dropdown">
                  <button className="btn btn-dark dropdown-toggle" id="dropdownMenuButton1" data-toggle="dropdown" aria-expanded="false">
                  </button>
                  
                  <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton1">
                    <li>
                      <Link className='dropdown-item' to='/home' onClick={navClick}>Home</Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/beer' onClick={navClick}>Beer</Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/post' onClick={navClick}>Posts</Link>
                    </li>
                    <div className="dropdown-divider"></div>
                    <li>
                      <Link to={`/profile/${memberId}/post`} className="dropdown-item user_link" onClick={navClick}>
                        <i className="fa fa-user" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li className="order_online">
                      <Link className='dropdown-item nav_login' to='/user/login' onClick={navClick}>login</Link>
                    </li>
                  </ul>
                  
                </div> */}






                
                {/* 토글 버튼 */}
                <button onClick={toggleClick} id='tglButton' className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className=""> </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                  <ul className="navbar-nav mx-auto" >
                    <li className="nav-item">
                      <Link className='nav-link' to='/home' onClick={navClick}>Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link' to='/beer' onClick={navClick}>Beer</Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link' to='/post' onClick={navClick}>Posts</Link>
                    </li>
                  </ul>
                  <div className="user_option">
                    <Link to={`/profile/${memberId}/post`} className="user_link" onClick={navClick}>
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </Link>
                    <div className="order_online">
                      <Link className='nav-link nav_login' to='/user/login' onClick={navClick}>login</Link>
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
