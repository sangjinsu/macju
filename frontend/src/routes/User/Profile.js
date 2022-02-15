import UserProfile from "../../components/User/UserProfile.js"
import UserPost from "../../components/User/UserPost.js";
import UserLike from "../../components/User/UserLike.js";
import UserReview from "../../components/User/UserReview.js";
import { Route } from 'react-router';
import { Link,useParams } from "react-router-dom"
import '../../styles/Profile.css'
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import axios from "axios";
const Profile = () => {
  const USER_PROFILE_URL = process.env.REACT_APP_SERVER + ':8080/v1/member/profile'
  const USER_POST_URL = process.env.REACT_APP_SERVER + ':8080/v1/post/member'
  const USER_LIKE_URL = process.env.REACT_APP_SERVER + ':8080/v1/member'
  const USER_REVIEW_URL = process.env.REACT_APP_SERVER + ':8080/v1/member'

  const dispatch = useDispatch();
  const store = useStore((state)=>state)
  // const memberId = store.getState().userReducer.memberId
  const userNum = useParams()
  
  const memberId = userNum.userid
  
  





  useEffect(()=>{
    const fetchData = async () =>{
      const userData = await axios.get(`${USER_PROFILE_URL}/${memberId}`)
      const userPost = await axios.get(`${USER_POST_URL}/${memberId}`)
      const userLike = await axios.get(`${USER_LIKE_URL}/${memberId}/like/beer`)
      const userReview = await axios.get(`${USER_REVIEW_URL}/${memberId}/rates`)
      dispatch({type:'user', userdata:userData})
      dispatch({type:'post', userpost:userPost})
      dispatch({type:'like', userlike:userLike})
      dispatch({type:'review', userreview:userReview})
    }

    fetchData();
  }, [])

  return (
    <div className="bg_color">

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
      
    </div>
  );
}
export default Profile;