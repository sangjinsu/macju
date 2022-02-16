import { useState } from "react";
import { useDispatch } from "react-redux";
import "../../firebase_config"
import PostListComponent from "../../components/Post/PostList"
import FadeIn from 'react-fade-in';
import "../../styles/PostList.css"


function PostList() {
  const dispatch = useDispatch()
  const [opt, setOpt] = useState("recent")
  
  // const store = useStore()
  // const onSelect = (event) => {
  //   dispatch({type:event.target.value})
  //   setOpt(event.target.value)
  // }

  return (
    <>
    
    <section className="postlist_section layout_padding_postlist">
      <div className="container">

        {/* 제목, 정렬dropdown */}
        <div className="postlist_header heading_center">
          <h2>Our Post</h2>  
        </div>  

        {/* 포스트 카드들 */}
        <FadeIn>
          <PostListComponent />
        </FadeIn>
      </div>
    </section>
    </>
  )
  }

export default PostList;
