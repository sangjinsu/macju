import { useEffect, useState } from "react";
import axios from "axios"
import { useParams, Link } from 'react-router-dom';
import { BsHeartFill, BsHeart } from "react-icons/bs";
// import { Button } from 'react-bootstrap';
import '../../styles/PostDetail.css'
import CommentList from "./CommentList";

function PostDetail() {
  const [postnow, setpostnow] = useState()
  const postId = useParams().postId;

  const memberId = "test"

  // api
  // useEffect(async ()=>{
  //   try{
  //     const detailPost = "http://i6c107.p.ssafy.io:8080/v1/post/member/" + memberId
  //     const json = await axios.get(detailPost)
  //     const postnum = json.data.find(function(post){
  //         return post.postId == postId
  //     });
  //     setpostnow(postnum)
  //   }catch{
  //     console.log('오류')
  //   }
  // }, [])

  useEffect(async ()=>{
    try{
      //api : http://i6c107.p.ssafy.io:8080/v1/post/member/{memberId}
      const json = await axios.get("http://localhost:3000/data/postData.json")

      const postnum = json.data.find(function(post){
          return post.id == postId
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

            {/* 목록으로 가기 버튼 */}
            <div className='backBtn'>
              <Link className='btnText' to='/post'><i className="fas fa-angle-double-left fa-lg"></i> 목록으로</Link>
            </div>

            <div className="row">

              {/* 이미지 */}
              <div className="col-md-6 ">
                <div className="img-box">
                  <img src='\img\5.0_오리지날_라거_medium_-removebg-preview.png'></img>
                  {/* <img src="https://img.hankyung.com/photo/202107/01.26934467.1-1200x.jpg" alt="" /> */}
                </div>
              </div>

              {/* 포스트 디테일 */}
              <div className="col-md-6">
                <div className="detail-box">

                  <div className="postdetail_heading">

                    <div className="postdetail_likecomment">
                      {/* 좋아요 하트 */}
                      <div className="heartInline">
                        {
                          isLike === true
                          ? <BsHeart className="heartIcon" size="23" onClick={()=>{setisLike(!isLike)}}></BsHeart>
                          : <BsHeartFill className="heartIcon" size="23" onClick={()=>{setisLike(!isLike)}}></BsHeartFill>
                        }
                        <div className="count">{ postnow.likes }</div>
                      </div>
                      {/* 댓글 */}
                      <div className="commentInline">
                        <i class="fas fa-comment fs-4"></i>
                        <div className="count">20</div>
                      </div>
                    </div>

                    {/* 맥주이름 버튼 */}
                    <div className="beerName" href="">테라</div>

                  </div>

                  {/* 해시태그 */}
                  <div className="postdetail_hashtag">
                    { postnow.Tag.map((tag, i)=>{
                        return(<span className="postTag" key={i}>#{tag}</span>)
                      }) }
                  </div>

                  {/* 포스트 내용 */}
                  <p>{ postnow.post }</p>


                  {/* 작성날짜 */}
                  <div className="userdetail">
                    <div>작성자 : user1 </div>
                    <div>작성날짜 : { postnow.created_at }</div>
                  </div>


                  {/* 본인 일때만 수정, 삭제 가능하게 해야함 */}
                  <div className="updateBtn">수정하기</div>
                  <div className="deleteBtn">삭제하기</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
      <CommentList postId={postId} />
    </div>
  )
  }
export default PostDetail;
