import UserProfile from "../../components/User/UserProfile.js"
import ReactFullpage from '@fullpage/react-fullpage';
import UserPost from "../../components/User/UserPost.js";
import UserLike from "../../components/User/UserLike.js";
import UserReview from "../../components/User/UserReview.js";
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