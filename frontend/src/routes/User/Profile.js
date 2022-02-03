import UserProfile from "../../components/User/UserProfile.js"
import ReactFullpage from '@fullpage/react-fullpage';
import UserPost from "../../components/User/UserPost.js";
import UserLike from "../../components/User/UserLike.js";
import UserReview from "../../components/User/UserReview.js";
import { Route } from 'react-router';
import { Link } from "react-router-dom"
// import NavBar from "components/Navbar.js";

const Profile = () => {
  return (
    <div>

    <ReactFullpage
    scrollingSpeed = {1000} /* Options here */
    licenseKey = {null}
    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section">
            <UserProfile />
            <p>Section 1 (welcome to fullpage.js)</p>
            <button onClick={() => fullpageApi.moveSectionDown()}>
              Click me to move down
            </button>
            {/* <a href="/profile/like">sdfsd</a> */}
            <Link to="/profile/review">review</Link>
            {/* <Link to="/profile/like">like</Link>
            <Link to="/profile/review">review</Link> */}
          </div>
          <Route path="/profile/post">
            <div className="section">
              <UserPost />
              <p>Section 2</p>
            </div>
          </Route>
          <Route path="/profile/like">
            <div className="section">
              <UserLike />
              <p>Section 3</p>
            </div>
          </Route>
          {/* <Route path="/profile/review">
            <div className="section">
              <UserReview />
              <h1>평점</h1>
            </div>
          </Route> */}
        </ReactFullpage.Wrapper>
      );
    }}
  />
  </div>
  )
}
export default Profile;