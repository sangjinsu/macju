import "../../styles/UserProfile.css"
import { useState } from "react";
import { Button } from "react-bootstrap";
import Followers from "components/Modals/Followers.js"
import Followings from "components/Modals/Followings.js"
import axios from "axios";
import { useEffect } from "react";
const UserProfile = () => {
 	const [user, setUser] = useState('')
	// useEffect(async () =>{
	// 	const json = await axios.get('http://i6c107.p.ssafy.io:8080/v1/member/profile/1')
	// 	console.log(json.data)
		
	// })








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
			<div className="user-profile ">
				<div className="img-box">
					<img src="/img/user.png" width={200} alt="아무사진 없습니다." />
				</div>
				<div id="profile-box">
					<div id="name">
						<div><h1>홍길동</h1></div>
						<Button href="/profile/edit">프로필 수정</Button>
					</div>
					<div>
						<div>게시글 : {14} <Button onClick={followersOpenModal} variant="success">팔로워</Button> : {84} <Button onClick={followingsOpenModal} variant="warning"> 팔로잉</Button> : {57}</div>
						<Followers open={followersModalOpen} close={followersCloseModal} header="Modal heading">
							followers
						</Followers>
						<Followings open={followingsModalOpen} close={followingsCloseModal} header="Modal heading">
							followings
						</Followings>
						<p>한줄 소개 #~~</p>
						
					</div>
				</div>
			</div>
		</div>
  )
}


export default UserProfile;
