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
  const onSelect = (event) => {
    dispatch({type:event.target.value})
    setOpt(event.target.value)
  }

  return (
    <>
    
    <section className="postlist_section layout_padding_postlist">
      <div className="container">

        {/* 제목, 정렬dropdown */}
        <div className="postlist_header heading_center">
          <h2>Our Post</h2>  
        </div>  
        <div>
          <select onChange={onSelect} style={{"width":200, "height":35}}>
            <option className='disable'>
              정렬 순서를 선택하세요
            </option>
            <option>
              recent
            </option>
            <option>
              popular
            </option>
          </select>
        </div>
        <div className='postlist_order'>
          {opt === "popular" ? <div>인기순 게시글</div> : <div> 최신순 게시글</div>}
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
