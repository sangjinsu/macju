import UserProfile from "../../components/User/UserProfile.js"
import UserPost from "../../components/User/UserPost.js";
import UserLike from "../../components/User/UserLike.js";
import UserReview from "../../components/User/UserReview.js";
import { Route } from 'react-router';
import { useParams, Link } from "react-router-dom"
// import NavBar from "components/Navbar.js";
import { Switch } from "react-router-dom"

import '../../styles/Profile.css'

const Profile = () => {
  const memberId = 1 // test용 멤버 아이디
  // const { memberId } = useParams()

  return (
    <div>
      <UserProfile />
      
      <div className="link_btn_all">
        <div className="link_btn">
          <Link className="profile_link" to={{
            pathname: `/profile/${memberId}/post`,
            state: {memberId: memberId},
          }}>post</Link> 
        </div> |
        <div className="link_btn">
          <Link className="profile_link" to={{
            pathname: `/profile/${memberId}/like`,
            state: {memberId: memberId},
          }}>like</Link> 
        </div> |
        <div className="link_btn">
          <Link className="profile_link" to={{
            pathname: `/profile/${memberId}/review`,
            state: {memberId: memberId},
          }}>review</Link>
        </div>
      </div>
      <Route path={`/profile/${memberId}/post`}>
        <UserPost />
      </Route>
      <Route path={`/profile/${memberId}/like`}>
        <UserLike />
      </Route>
      <Route path={`/profile/${memberId}/review`}>
        <UserReview />
      </Route>
      {/* <Route path={`/profile/${memberId}`}>
        <Switch>
          <Route path="/post" component={UserPost} />
          <Route path="/like" component={UserLike} />
          <Route path="/review" component={UserReview} />
        </Switch>
      </Route> */}
      
    </div>
  );
}
export default Profile;