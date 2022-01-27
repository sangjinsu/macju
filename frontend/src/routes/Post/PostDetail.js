import { useEffect, useState } from "react";
import axios from "axios"
import { useParams } from 'react-router-dom';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { Button } from 'react-bootstrap';
import '../../styles/PostDetail.css'

function PostDetail() {
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
    <div className="PostDetail">
      {
        postnow &&
        <section className="postdetail_section layout_padding_postdetail">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ">
                <div className="img-box">
                  <img src="https://img.hankyung.com/photo/202107/01.26934467.1-1200x.jpg" alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-box">
                  <div className="heading_container">
                    <h2>
                      {
                        postnow.Tag.map((tag, i)=>{
                          return(<span className="postTag" key={i}>#{tag}</span>)
                        })
                      }
                    </h2>
                  </div>
                  <p>{ postnow.post }</p>
                  <div className="heartInline">
                    {
                      isLike === true
                      ? <BsHeart className="heartIcon" onClick={()=>{setisLike(!isLike)}}>{ postnow.likes }</BsHeart>
                      : <BsHeartFill className="heartIcon" onClick={()=>{setisLike(!isLike)}}>{ postnow.likes }</BsHeartFill>
                    }
                    <div>({ postnow.likes })</div>
                  </div>
                  <div>작성날자 : { postnow.created_at }</div>
                  <a className="typebtn" href="">페일</a> <br />
                  {/* 본인 일때만 수정, 삭제 가능하게 해야함 */}
                  <a href="">수정하기</a>
                  <a href="">삭제하기</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </div>
  )
  }
export default PostDetail;
