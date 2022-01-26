import UserProfile from "../../components/UserProfile.js"
import ReactFullpage from '@fullpage/react-fullpage';
import UserPost from "components/UserPost.js";
import UserLike from "components/UserLike.js";
import NavBar from "components/Navbar.js";
import UserReview from "components/UserReview.js";

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
          </div>
          <div className="section">
            <UserPost />
            <p>Section 2</p>
          </div>
          <div className="section">
            <UserLike />
            <p>Section 3</p>

          </div>
          <div className="section">
            <UserReview />
            <h1>평점</h1>

          </div>
        </ReactFullpage.Wrapper>
        
      );
    }}
  />
  </div>
  )
}
export default Profile;