import React from 'react';
import '../styles/Navbar.css'
import '../styles/Responsive.css'
import { Link, useHistory } from "react-router-dom"
import SearchBar from './SearchBar.js'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useCookies } from "react-cookie"
import AccessToken from "../AccessToken.js"

function NavBar(){
  const removeCookie = useCookies(["AccessToken"])[2]
  const userToken = AccessToken

  const store = useStore((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()
  const loginUser = useSelector(state => state.userReducer).memberId
  const logOut = () => {
    removeCookie("AccessToken")
    dispatch({type:"logout"})
    alert("로그아웃 되었습니다!!")
    history.push("/user/login")
  }

  return(
      <div className='navbar_page'>
        
        <div className="navbar_area">
          <div className="bg-box">
          </div>
          <header className="navbar_section">
            <div className="container">
              <nav className="navbar custom_nav-container ">
                <div >
                  <a className="navbar-macju" href="/" style={{ textDecoration: 'none' }}>
                    <span>
                      MacJU
                    </span>
                  </a>
                </div>
                
                {
                  loginUser&&userToken
                  ?
                  <div className='searchbar' style={{flexDirection: 'column'}}>
                    <SearchBar/>
                  </div>
                  :null
                }

                <div className="dropdown">
                  <button className="btn dropdown-toggle dropdownBtn" id="dropdownMenuButton1" data-toggle="dropdown" aria-expanded="false">
                  </button>
                  
                  <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton1">
                    <li>
                      <Link className='dropdown-item' to='/'>Home</Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/beer'>Beer</Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/post'>Posts</Link>
                    </li>
                    <div className="dropdown-divider"></div>
                    <li>
                      <Link to={`/profile/${store.getState().userReducer.memberId}/post`} className="dropdown-item user_link">
                        <i className="fa fa-user" aria-hidden="true"></i>
                      </Link>
                    </li>
                    { loginUser === null || !userToken?
                    <li className="order_online">
                      <Link className='dropdown-item nav_login' to='/user/login'>login</Link>
                    </li>
                    :
                    <li className="order_online">
                      <div className='dropdown-item nav_login' onClick={logOut}>Logout</div>
                    </li>
                    }
                  </ul>
                  
                </div>

              </nav>
            </div>
          </header>
        </div>
      </div>
    )
}
export default NavBar;
