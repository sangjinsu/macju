import { Button } from "react-bootstrap";
import PostList from "routes/Post/PostList";
import "../../styles/UserPost.css"

const UserPost = () => {
  
  return (
    <>
    <PostList />
    <div className="post-btn"><Button>see more</Button></div>
    </>
  )
}
export default UserPost;