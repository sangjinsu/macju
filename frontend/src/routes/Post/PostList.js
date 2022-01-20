import { useEffect, useState } from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

function PostList() {
  const dispatch = useDispatch()
  const text = useSelector((state:any) => state)
  const [opt, setOpt] = useState("최신 순으로")
  const [posts, setposts] = useState()
  const [stat, setStat] = useState('')
  const onSelect = (event) => {
    dispatch({type:event.target.value})
    setOpt(event.target.value)
    setStat(text[0].text)
    //stat 지우고 setposts로 post값 가져올것.
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
          recent
        </option>
        <option>
          popular
        </option>
      </select>
      <div>
        {opt == "recent" ? <h1> 최신 순 게시글</h1> : <h2>인기순 게시글</h2>}
        <br></br>
        {stat}
        {posts&&posts.map((post)=> <span key={post.postId}>
          <p>좋아요 : {post.likes}</p>
          <Link to={`/v1/post/${post.postId}`}>{post.content&&post.content.length > 15 ? post.content.substr(0, 15) + "....": post.content}</Link>
          작성 시간 {post.created_at}
          </span>)}
      </div>
     

    </>
  )
  }

export default PostList;