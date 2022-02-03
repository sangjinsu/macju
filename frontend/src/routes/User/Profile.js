import UserProfile from "../../components/User/UserProfile.js"
import UserPost from "../../components/User/UserPost.js";
import UserLike from "../../components/User/UserLike.js";
import UserReview from "../../components/User/UserReview.js";
import { Route } from 'react-router';
import { Link } from "react-router-dom"
// import NavBar from "components/Navbar.js";

const Profile = () => {
  return (
    <div>
      <UserProfile />
      <Link to="/profile/post">post</Link> <br />
      <Link to="/profile/like">like</Link> <br />
      <Link to="/profile/review">review</Link> <br />
      <Route path="/profile/post">
        <UserPost />
      </Route>
      <Route path="/profile/like">
        <UserLike />
      </Route>
      <Route path="/profile/review">
        <UserReview />
      </Route>
    </div>
  );
}
export default Profile;