import { useEffect, useState } from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {actionCreators} from "../../store";
function PostList() {
  const dispatch = useDispatch()
  const [opt, setOpt] = useState()
  const [posts, setposts] = useState()
  const onSelect = (event) => {
    const tmp = event.target.value
    setOpt(tmp);
    dispatch(actionCreators.selectOpt('aaaa'))
    

  }
  useEffect(async ()=>{
    //api : http://localhost:3000/v1/post
      const json = await axios.get("http://localhost:3000/data/postData.json")
      setposts(json.data)
    }, []
  )
  return (
    <>
      <h1>POST</h1>      
      <select onChange={onSelect}>
        <option>
          정렬 순서를 선택하세요
        </option>
        <option>
          최신 순으로
        </option>
        <option>
          인기 순으로
        </option>
        <option>
          test
          test22
        </option>
      </select>
      <div>
        {opt === "최신 순으로" ? <h1> 최신 순 게시글</h1> : <h2>인기순 게시글</h2>}
        {posts&&posts.map((post)=> <span key={post.postId}>
          <p>좋아요 : {post.likes}</p>
          <Link to={`/post/${post.postId}`}>{post.content&&post.content.length > 15 ? post.content.substr(0, 15) + "....": post.content}</Link>
          작성 시간 {post.created_at}
          </span>)}
      </div>
     

    </>
  )
  }
export default PostList;