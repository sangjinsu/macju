import React from 'react';
import { useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import './BeerList.css'
import { Link } from "react-router-dom"


function BeerList(){
  const [isLike, setisLike] = useState(false)

  return(
    <div>
      <section class="food_section layout_padding">
        <div class="container">
          <div class="heading_container heading_center">
            <h2>
              Our Beer
            </h2>
          </div>
          <ul class="filters_menu">
            <li class="active" data-filter="*">All</li>
            <li data-filter=".ale">Ale</li>
            <li data-filter=".lager">Lager</li>
            <li data-filter=".ladler">Ladler</li>
          </ul>
          {/* <div>
            <Link to='/beer'>전체</Link> | 
            <Link to='/beer/ale'> 에일</Link> | 
            <Link to='/beer/lager'> 라거</Link> | 
            <Link to='/beer/ladler'> 라들러</Link>
          </div> */}
      
          {/* <div className='beerOne'>
            <img src="https://img.hankyung.com/photo/202107/01.26934467.1-1200x.jpg" width="15%"></img>
            <div className='beerContent'>
              <div>맥주 이름</div>
              <div>설명 : 맛있다 맛있다 맛있다</div>
              <div className='beerContentIn'>
                <div>Pale lager</div>
                <div>#과일향 #매운맛</div>
              </div>
              <div>★★★★☆ 4<div>(10)</div></div>
            </div>
          </div> */}

          <div class="filters-content">
            <div class="row grid">
              <div class="col-sm-6 col-lg-4 all ale">
                <div class="box">
                  <div>
                    <div class="img-box">
                      <img src="img/terra.png"></img>
                    </div>
                    <div class="detail-box">
                      <div class='detail-title'>
                        <h5>테라</h5>
                        <Link to='/beer/1' class='detailBtn'>자세히</Link>
                      </div>
                      <div class='star'>★★★★☆</div>
                      <p>
                        Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque
                      </p>
                      <div>#과일향 #매운맛</div>
                      <div class="options">
                        <h6 className='beerCategory'>
                          Pale Ale
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

              <div class="col-sm-6 col-lg-4 all ale">
                <div class="box">
                  <div>
                    <div class="img-box">
                      <img src="img/terra.png"></img>
                    </div>
                    <div class="detail-box">
                      <div class='detail-title'>
                        <h5>테라</h5>
                        <Link to='/beer/1' class='detailBtn'>자세히</Link>
                      </div>
                      <div class='star'>★★★★☆</div>
                      <p>
                        Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque
                      </p>
                      <div>#과일향 #매운맛</div>
                      <div class="options">
                        <h6 className='beerCategory'>
                          Pale Ale
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
          </div>
        </div>
      </section>
    </div>
  )
}

export default BeerList;