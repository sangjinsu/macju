import "../../styles/UserProfile.css"
import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "components/Modals/Modals"

const UserProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
		<div className="userprofile_container">
			<div className="user-profile">
				<div className="img-box">
					<img src={"img/user.png"} width={200} alt="아무사진 없습니다." />
				</div>
				<div id="profile-box">
					<div id="name">
						<div><h1>홍길동</h1></div>
						<Button href="/profile/edit">프로필 수정</Button>
					</div>
					<div>
						<div>게시글 : {14} <Button onClick={openModal} variant="success">팔로워</Button> : {84} <Button onClick={openModal} variant="warning"> 팔로잉</Button> : {57}</div>
						<Modal open={modalOpen} close={closeModal} header="Modal heading">
							sacsac
						</Modal>
						<p>한줄 소개 #~~</p>
						
					</div>
				</div>
			</div>
		</div>
  )
}


export default UserProfile;
