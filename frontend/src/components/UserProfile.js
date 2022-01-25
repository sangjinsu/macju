import "components/UserProfile.css"
import { Button } from "react-bootstrap";
const UserProfile = () => {
  return (
    <>
      <div className="container">
        <span role={"button"} style={{"fontSize":"11em"}}>
        <i className="fas fa-user">
        </i></span>
      
      <h1>UserName</h1>
      <Button>프로필 편집</Button>
      </div>
    </>
  )
}


export default UserProfile;
