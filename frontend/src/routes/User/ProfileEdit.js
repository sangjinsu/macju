import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "routes/User/ProfileEdit.css"
const ProfileEdit = () => {
  return (
    <div className="edit-box">
      <h1>프로필 수정</h1>
      <form>
      <h3>Username</h3>
      <Link>프로필 사진 바꾸기</Link>
      {/* 링크 대신 색깔 변경  */}
      <div className="name-box">
        <h5>닉네임</h5><input />
      </div>
      <div className="intro-box">
        <div style={{display: "flex"}}><h5>소개</h5>
        <textarea placeholder="자신을 소개하세요!"></textarea></div>
            <div style={{display: "flex"}}>

            취향:
            단맛<input type={"checkbox"} />
            쓴맛<input type={"checkbox"} />
            짠맛<input type={"checkbox"} />
            매운맛<input type={"checkbox"} />
            맛<input type={"checkbox"} />
            맛<input type={"checkbox"} />
            맛<input type={"checkbox"} />
            맛<input type={"checkbox"} />
            맛<input type={"checkbox"} />

        </div>
      </div>
      <Button>제출</Button>
      </form>
    </div>
  )
}
export default ProfileEdit;