import "../../styles/UserProfile.css"
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Followers from "components/Modals/Followers.js"
import Followings from "components/Modals/Followings.js"
import axios from "axios";
import {IoIosBeer} from  "react-icons/io";

const UserProfile = () => {
  const USER_PROFILE_URL = process.env.REACT_APP_USER_PROFILE_URL
	
	const memberId = 1

	// user 데이터 불러오기
 	const [user, setUser] = useState('')	// 유저 데이터
	const [usercolor, setUsercolor] = useState("")		// 사진 색깔
	 
	useEffect(async () =>{
		const profiledata = await axios.get(`${USER_PROFILE_URL}/${memberId}`)
		// console.log(profiledata.data)
		setUser(profiledata.data)
		setUsercolor(profiledata.data.profileColor)		
	},[])


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
							<button href="/profile/edit" className="editBtn">수정</button>
						</div>
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
							<Followers open={followersModalOpen} close={followersCloseModal} header="Modal heading">
								followers
							</Followers>
							<Followings open={followingsModalOpen} close={followingsCloseModal} header="Modal heading">
								followings
							</Followings>
							<p className="user_intro">한줄 소개 #~~</p>
							
						</div>
					</div>
				</div>
			}
		</div>
  )
}


export default UserProfile;
