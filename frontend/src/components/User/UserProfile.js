import "../../styles/UserProfile.css"
import { useEffect, useState } from "react";
import Followers from "components/Modals/Followers.js"
import Followings from "components/Modals/Followings.js"
import axios from "axios";
import {IoIosBeer} from  "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useStore } from "react-redux";
import { Button } from "react-bootstrap";

const UserProfile = () => {
	const {userid} = useParams();

  const USER_PROFILE_URL = process.env.REACT_APP_SERVER + ':8080/v1/member/profile'
	const FOLLOW_URL = process.env.REACT_APP_SERVER + `:8080/v1/member/${2}/follow/${userid}`
	const memberId = 1
	const store = useStore((state)=>state)
	// user 데이터 불러오기
 	const [user, setUser] = useState('')	// 유저 데이터
	const [usercolor, setUsercolor] = useState("")		// 사진 색깔
	const headers = {
		'Content-Type': 'application/json; charset=UTF-8',
		'Accept': "application/json; charset=UTF-8"
	}
	
	const data = {
		'followingMemberId':1,
		'memberId':2
	}

	const [followButton, setFollowButton] = useState('')

	const setFollow = async () =>{
		const res = await axios.post(FOLLOW_URL)
		setFollowButton(res.data)
	}


	useEffect(() =>{
		const fetchData = async () => {
			const profiledata = await axios.get(`${USER_PROFILE_URL}/${3}`)
			setUser(profiledata.data)
			setUsercolor(profiledata.data.profileColor)	
		}
		if (store.getState().userProfileReducer.length === 0){
			fetchData();
		} else {
			setUser(store.getState().userProfileReducer.data)
			setUsercolor(store.getState().userProfileReducer.data.profileColor)
		}
	},[USER_PROFILE_URL])


  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingsModalOpen, setFollowingsModalOpen] = useState(false);
  const followersOpenModal = () => {
    setFollowersModalOpen(true);
  };
  const followersCloseModal = () => {
    setFollowersModalOpen(false);
  };
  const followingsOpenModal = () => {
    setFollowingsModalOpen(true);
  };
  const followingsCloseModal = () => {
    setFollowingsModalOpen(false);
  };



  return (
		<div className="userprofile_container">
			{user && 
				<div className="user-profile ">
					<div className="img-box">
						{/* user.profileColor 색깔로 배경 지정 (기본흰색) */}
						<div className={usercolor}>	
							<IoIosBeer className="usericon"></IoIosBeer>
						</div>
					</div>
					<div id="profile-box">
						<div id="nickname">
							<h1>{user.nickName}</h1>
							<Link to={`/profile/${user.memberId}/edit`}>
							<button className="editBtn">수정</button>
							</Link>
						</div>
						<Button variant={followButton === 'follow'? "secondary":"primary"} as="input" value={followButton === 'follow' ? '언팔로우':'팔로우' } onClick={setFollow}/>
						<div>
							<div className="postnum">게시글 : {14} </div>
							<div className="follow_all">
								<div className="follower">
									<button className="followBtn" onClick={followersOpenModal} variant="success">팔로워</button>
									 : {84} 
								</div>
								<div className="following">
									<button className="followBtn" onClick={followingsOpenModal} variant="warning"> 팔로잉</button>
									 : {57}
								</div>
							</div>
							<Followers open={followersModalOpen} close={followersCloseModal} header="팔로워">
								followers
							</Followers>
							<Followings open={followingsModalOpen} close={followingsCloseModal} header="팔로잉">
								followings
							</Followings>
							<p className="user_intro">한줄 소개 : {user.intro}</p>
							
						</div>
					</div>
				</div>
			}
		</div>
  )
}


export default UserProfile;
