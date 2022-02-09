import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/PostList.css"
import FadeIn from 'react-fade-in';
import axios from "axios"
import "../../firebase_config"
import PostListComponent from "../../components/Post/PostList"


function PostList() {
  const POST_LIST_URL = process.env.REACT_APP_SERVER + ':8080/v1/post/new'
  const dispatch = useDispatch()
  //const text = useSelector((state:any) => state)
  const [opt, setOpt] = useState("recent")
  // const [posts, setposts] = useState()
  
  // const store = useStore()
  const onSelect = (event) => {
    dispatch({type:event.target.value})
    setOpt(event.target.value)
    
    //stat 지우고 setposts로 post값 가져올것.
    //useSelector로 가져올경우 store 는 변경이 되지만 const 에서 정의한 변수값이 반영되는 시점이 좀 더 늦기 때문에 store에서 직접 꺼내옴. 
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
