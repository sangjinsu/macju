import "components/UserProfile.css"
import { Button } from "react-bootstrap";



const UserProfile = () => {
  return (
		<div className="container">
    <div className="user-profile">
			<div className="img-box"><img src={"img/user.png"} width={300} alt="아무사진 없습니다." /></div>
			<div>
			<h1>홍길동</h1>
			<Button>프로필 수정</Button>
			<h4>팔로워 : {} 팔로잉 : {}</h4>
			<p>한줄 소개 #~~</p>
			</div>
		</div>
		</div>
  )
}


export default UserProfile;
