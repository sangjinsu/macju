import React, { useEffect } from 'react';
import { useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import '../../styles/BeerList.css'
import { Link } from "react-router-dom"
import FadeIn from 'react-fade-in';
// import { default as Fade} from 'react-fade';


function BeerList(){

  
  const [isLike, setisLike] = useState(false)
  const [isActive, setIsActive] = useState('all')   // 현재 활성화된 카테고리 (기본값:all)

  useEffect(() => {
    setIsActive('all')
  },[])

  // 클릭한 카테고리버튼 배경색 바꾸기 : 카테고리 클릭시 해당 카테고리 class에 .active 추가 
  const toggleActive = ((e) => {
    setIsActive(e.target.attributes.beerfilter.value)   // isActive를 beerfilter값으로 바꿈
  })
  // 활성화된 카테고리의 맥주만 보이게 하기 : style에 'display: none' 추가
  const eachbeer = document.getElementsByClassName("all")   // 전체 맥주 가져옴
  for(var i=0, j=eachbeer.length; i<j; i++) {
    if (eachbeer[i].classList.contains(isActive)) {         // classList에 현재 활성화된 카테고리의 포함여부
      eachbeer[i].classList.remove('displaynone')           // 포함되어있으면 displaynone 제거 (보이게)
    } else { 
      eachbeer[i].classList.add('displaynone')              // 없으면 displaynone 추가 (안보이게)
    }
  }
  
  
  // 오류 : 카테고리 클릭할 때 리스트에 없던 맥주들만 fadein효과 적용되서 원래 리스트에 있던건 fadein이 안됌
  // 오류 : navbar의 area-expanded 되어있을때 카테고리누르면 닫히게해야함
  return(
    <div>
      <section className="beerlist_section layout_padding_beerlist">
        <div className="container">

          {/* 맥주 리스트 제목 */}
          <div className="heading_container heading_center">
            <h2>
              Our Beer
            </h2>
          </div>

          {/* 맥주 카테고리 */}
          <ul className="filters_menu">            
            {/* isActive값이 beerfilter와 같을 때 .active 클래스 추가 */}
            <li className={isActive==='all' ? 'active' : null} beerfilter="all" onClick={toggleActive}>All</li>
            <li className={isActive==='ale' ? 'active' : null} beerfilter="ale" onClick={toggleActive}>Ale</li>
            <li className={isActive==='lager' ? 'active' : null} beerfilter="lager" onClick={toggleActive}>Lager</li>
            <li className={isActive==='ladler' ? 'active' : null} beerfilter="ladler" onClick={toggleActive}>Ladler</li>
          </ul>
          
          <FadeIn>
          <div className="row grid">

            {/* 맥주 각각 */}
            <div className="col-sm-6 col-md-4 col-lg-3 fadein all ale">
              <div className="box">
                <div>
                  
                  {/* 맥주 이미지 */}
                  <div className="img-box">
                    <img src='\img\5.0_오리지날_라거_medium_-removebg-preview.png'></img>
                  </div>

                  {/* 맥주 설명란 */}
                  <div className="beerdetail-box">

                    {/* 맥주 이름 + 자세히 버튼 */}
                    <div className='beerdetail-title'>
                      <h5>테라</h5>
                      <Link to='/beer/1' className='detailBtn'>자세히</Link>
                    </div>

                    {/* 맥주 별점 */}
                    <div className='star'>★★★★☆</div>

                    {/* 맥주 설명 */}
                    <p>
                      Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque
                    </p>

                    {/* 맥주 해시태그 */}
                    <div>#과일향 #매운맛</div>

                    {/* 맥주 카테고리 */}
                    <div className="options">
                      <h6 className='beerCategory'>
                        Pale Ale
                      </h6>
                      {/* 좋아요 버튼 */}
                      <a>
                        { isLike === true
                          ? <BsHeart  size="18" onClick={()=>{setisLike(!isLike)}}></BsHeart>
                          : <BsHeartFill  size="18" onClick={()=>{setisLike(!isLike)}}></BsHeartFill>
                        }
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* 맥주 각각 */}
            <div className="col-sm-6 col-md-4 col-lg-3 fadein all lager">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src='\img\1866_블랑쉬__500ml_medium_-removebg-preview.png'></img>
                  </div>
                  <div className="beerdetail-box">
                    <div className='beerdetail-title'>
                      <h5>라거</h5>
                      <Link to='/beer/1' className='detailBtn'>자세히</Link>
                    </div>
                    <div className='star'>★★★★☆</div>
                    <p>
                      Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque
                    </p>
                    <div>#과일향 #매운맛</div>
                    <div className="options">
                      <h6 className='beerCategory'>
                        Lager
                      </h6>
                      <a>
                        {
                          isLike === true
                          ? <BsHeart  size="18" onClick={()=>{setisLike(!isLike)}}></BsHeart>
                          : <BsHeartFill  size="18" onClick={()=>{setisLike(!isLike)}}></BsHeartFill>
                        }
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 맥주 각각 */}
            <div className="col-sm-6 col-md-4 col-lg-3 fadein all ladler">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src='\img\1866_블랑쉬__500ml_medium_-removebg-preview.png'></img>
                  </div>
                  {/* 맥주카드 내용 */}
                  <div className="beerdetail-box">
                    <div className='beerdetail-title'>
                      <h5>블랑쉬</h5>
                      <Link to='/beer/1' className='detailBtn'>자세히</Link>
                    </div>
                    <div className='star'>★★★★☆</div>
                    <p>
                      Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque
                    </p>
                    <div>#과일향 #매운맛</div>
                    <div className="options">
                      <h6 className='beerCategory'>
                        Ladler
                      </h6>
                      <a>
                        {
                          isLike === true
                          ? <BsHeart  size="18" onClick={()=>{setisLike(!isLike)}}></BsHeart>
                          : <BsHeartFill  size="18" onClick={()=>{setisLike(!isLike)}}></BsHeartFill>
                        }
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 맥주 각각 */}
            <div className="col-sm-6 col-md-4 col-lg-3 fadein all ale">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src='\img\5.0_오리지날_라거_medium_-removebg-preview.png'></img>
                  </div>
                  <div className="beerdetail-box">
                    <div className='beerdetail-title'>
                      <h5>테라</h5>
                      <Link to='/beer/1' className='detailBtn'>자세히</Link>
                    </div>
                    <div className='star'>★★★★☆</div>
                    <p>
                      Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque
                    </p>
                    <div>#과일향 #매운맛</div>
                    <div className="options">
                      <h6 className='beerCategory'>
                        Ale
                      </h6>
                      <a>
                        {
                          isLike === true
                          ? <BsHeart  size="18" onClick={()=>{setisLike(!isLike)}}></BsHeart>
                          : <BsHeartFill  size="18" onClick={()=>{setisLike(!isLike)}}></BsHeartFill>
                        }
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          </FadeIn>

        </div>
      </section>
    </div>
  )
}

export default BeerList;