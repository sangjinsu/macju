import "../../firebase_config"
import PostListComponent from "../../components/Post/PostList"
import FadeIn from 'react-fade-in';
import "../../styles/PostList.css"


function PostList() {
  return (
    <>
    
    <section className="postlist_section layout_padding_postlist">
      <div className="container">
        <div className="postlist_header heading_center">
          <h2>Our Post</h2>  
        </div>  
        <FadeIn>
          <PostListComponent />
        </FadeIn>
      </div>
    </section>
    </>
  )
  }

export default PostList;
