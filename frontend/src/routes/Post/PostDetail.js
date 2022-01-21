import { useEffect, useState } from "react";
import axios from "axios"
import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { Button } from 'react-bootstrap';

function PostDetail() {

//   const dispatch = useDispatch()
  const [postnow, setpostnow] = useState()
  const { num } = useParams();

  useEffect(async ()=>{
    try{
      //api : http://localhost:3000//v1/post/{postId}
      const json = await axios.get("http://localhost:3000/data/postData.json")

      const postnum = json.data.find(function(post){
          return post.postId == num
      });
      setpostnow(postnum)
    }catch{
      console.log('오류')
    }
  }, [])

  const [isLike, setisLike] = useState(false)

  return (
    <div>
      <h1>POST detail</h1>
      {
        postnow && 
        <div>
          <img src="https://img.hankyung.com/photo/202107/01.26934467.1-1200x.jpg" width="30%"></img>
          {/* <img src={postnow.img } alt="detail 이미지"></img> */}
          <div>{ postnow.content }</div>
          
          <div>
            {
              isLike === true
              ? <BsHeart onClick={()=>{setisLike(!isLike)}}></BsHeart>
              : <BsHeartFill onClick={()=>{setisLike(!isLike)}}></BsHeartFill>
            }
            <div>({ postnow.likes })</div>
          </div>

          <div>
            {
              postnow.Tag.map((tag)=>{
                return(<div>#{tag}</div>)
              })
            }
            <div>{ postnow.created_at } 작성</div>
          </div>
          
        </div>
      }  
      {/* 본인 일때만 수정, 삭제 가능하게 해야함 */}
      <Button variant="light" size="sm">수정하기</Button>
      <Button variant="danger" size="sm">삭제하기</Button>
      <hr></hr>
    </div>
  )
  }
export default PostDetail;