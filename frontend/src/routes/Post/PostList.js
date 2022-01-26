import { useEffect, useState } from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import { useDispatch, useSelector, useStore } from "react-redux";
import {Button, Card, Col, Container, Row} from "react-bootstrap"
import "../../styles/postIndex.css"
import FadeIn from 'react-fade-in';

function PostList() {
  const dispatch = useDispatch()
  //const text = useSelector((state:any) => state)
  const [opt, setOpt] = useState("최신 순으로")
  const [posts, setposts] = useState()
  const [stat, setStat] = useState('')
  const store = useStore()
  const onSelect = (event) => {
    dispatch({type:event.target.value})
    setOpt(event.target.value)
    setStat(store.getState().reducer[0].text)

    //stat 지우고 setposts로 post값 가져올것.
    //useSelector로 가져올경우 store 는 변경이 되지만 const 에서 정의한 변수값이 반영되는 시점이 좀 더 늦기 때문에 store에서 직접 꺼내옴. 
  }
  
  useEffect(async ()=>{
    //api : http://localhost:3000/v1/post
      const json = await axios.get("http://localhost:3000/data/postData.json")
      setposts(json.data)
    }, []
  )

  return (
    <>
    <div className="header">
    <h1>POST</h1>      
      <select onChange={onSelect} style={{"width":200, "height":35}}>
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
        {opt == "recent" ? <h1> 최신 순 게시글</h1> : <h2>인기순 게시글</h2>}
        {stat}
      </div>
    <div className="container">
    <Row xs={1} sm={2} md={4} className="g-4">
    {posts&&posts.map((post)=><Col key={post.id}>
    <FadeIn>
      <div
      className="box"
      >
      <div className="img-box">
      <Card.Img className="img" variant="top" src={post.img} width={300}/>
      </div>
      <Card.Body className="detail-box">
        <Card.Text>
        {post.post&&post.post.length > 15 ? post.post.substr(0, 15) + "....": post.post}
        </Card.Text>
        <p className="fontaws"><i className="fas fa-heart" style={{color:"red"}}></i>{post.likes}</p>
        <p className="post-meta">작성한 사람 :{null} 작성 시간{post.created_at}</p>
        <Link to={`/post/${post.id}`}><Button variant="secondary">Detail</Button></Link>
      </Card.Body>
    </div></FadeIn></Col>)}
    </Row>
    </div>
    </>
    
  )
  }
  


export default PostList;
