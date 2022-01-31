import { useEffect, useState } from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import { useDispatch, useSelector, useStore } from "react-redux";
import {Button, Card, Col, Container, Row} from "react-bootstrap"
import "../../styles/PostList.css"
import FadeIn from 'react-fade-in';

function PostList() {
  const dispatch = useDispatch()
  //const text = useSelector((state:any) => state)
  const [opt, setOpt] = useState("최신순으로")
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
    <div>
    <section className="postlist_section layout_padding_postlist">
      <div className="container">

        <div className="postlist_header heading_center">
          <h2>Our Post</h2>  
        </div>  
        <div>
          <select onChange={onSelect} style={{"width":200, "height":35}}>
            <option class='disable'>
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
        <div class='postlist_order'>
          {opt == "recent" ? <div> 최신순 게시글</div> : <div>인기순 게시글</div>}
          {/* {stat} */} 
        </div>

        <Row xs={1} sm={2} lg={4} className="g-4 fadein">
        { posts&&posts.map((post) =>
          <Col key={post.id}>
          <FadeIn>
            <div className="postlist_box">
              <div className="img-box">
                <Card.Img className="img" variant="top" src={post.img} width={300}/>
              </div>
              <div className="postdetail-box">
                <div className="postdetail-title">
                  <h5>{post.post&&post.post.length > 15 ? post.post.substr(0, 15) + "....": post.post}</h5>
                  <Link to={`/post/${post.id}`} class='detailBtn'>자세히</Link>
                </div>
                <p className="fontaws"><i className="fas fa-heart" style={{color:"red"}}></i>{post.likes}</p>
                <p className="post-meta">작성한 사람 :{null} <br/> 작성 시간 : {post.created_at}</p>
                
              </div>
            </div>
          </FadeIn></Col>) }
        </Row>

      </div>
    </section>
    </div>
    
  )
  }
  


export default PostList;
