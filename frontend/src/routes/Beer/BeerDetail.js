import { useEffect, useState } from "react";
import axios from "axios"
import { useParams, Link } from 'react-router-dom';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { Button } from 'react-bootstrap';
import './BeerDetail.css'

function BeerDetail() {
  const [postnow, setpostnow] = useState()
  const { num } = useParams();

  useEffect(async ()=>{
    try{
      //api : http://localhost:3000//v1/beer/{beerId}
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
    <div className="BeerDetail">
      {
        postnow &&
        <section class="about_section layout_padding">

          <div class="container">
            {/* 목록으로 가기 버튼 */}
            <div class='backBtn'>
              <Link class='btnText' to='/beer'><i class="fas fa-angle-double-left fa-lg"></i> 목록으로</Link>
            </div>

            <div class="row">
              <div class="col-md-6 ">
                <div class="img-box">
                  <img src="https://img.hankyung.com/photo/202107/01.26934467.1-1200x.jpg" width="50%"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="detail-box">
                  <div class="beerCategory" href="">Pale Ale</div>

                  {/* 맥주 이름 + 하트 */}
                  <div class="heading_title spaceBetween">
                    <h2>Terra</h2>
                    <div className="heartInline">
                      {
                        isLike === true
                        ? <BsHeart className="heartIcon" size="22" onClick={()=>{setisLike(!isLike)}}></BsHeart>
                        : <BsHeartFill className="heartIcon" size="22" onClick={()=>{setisLike(!isLike)}}></BsHeartFill>
                      }
                      <div>({ postnow.likes })</div>
                    </div>
                  </div>

                  {/* 맥주 별점 + 평가하기버튼 */}
                  <div class="spaceBetween">
                    <div class='starInline'>
                      <div class='star'>★★★★☆</div>
                      <div>(4)</div>
                    </div>
                    <button class="RateBtn">평가하기</button>
                  </div>

                  {/* 맥주 detail 내용 */}
                  <p>{ postnow.post }</p>

                  {/* 맥주 # 해시태그 */}
                  <div class="hashtag">
                    {
                      postnow.Tag.map((tag, i)=>{
                        return(<span className="hashtag" key={i}>#{tag}</span>)
                      })
                    }
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </div>
  )
  }
export default BeerDetail;
