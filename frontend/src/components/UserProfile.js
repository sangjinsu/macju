import "components/UserProfile.css"
import { Button } from "react-bootstrap";



const UserProfile = () => {
  return (
		<div className="container">
    <div className="user-profile">
			<div className="img-box"><img src={"img/user.png"} width={300} alt="아무사진 없습니다." /></div>
			<div id="profile-box">
			<div id="name"><div><h1>홍길동</h1></div> <Button>프로필 수정</Button></div>
			<div>
			<h4>팔로워 : {84} 팔로잉 : {57}</h4>
			<p>한줄 소개 #~~</p>
			</div>
			</div>
		</div>
		</div>
  )
}


export default UserProfile;
