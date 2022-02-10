import { useEffect, useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom"
import axios from "axios"
import "../styles/Search.css"

function Search(){
  const BEER_LIST_URL = process.env.REACT_APP_SERVER + ':8080/v1/beer'
  const POST_LIST_URL = process.env.REACT_APP_SERVER + ':8080/v1/post/new'
  const [beerdata, setBeerdata] = useState([])
  const [postdata, setPostdata] = useState([])
  useEffect(()=> {
    const fetchData = async() =>{
      const beer = await axios.get(BEER_LIST_URL)
      if (beer.data.length > 4) {
        setBeerdata(beer.data.splice(0,4))
      } else {
        setBeerdata(beer.data)
      }
      const post = await axios.get(POST_LIST_URL)
      setPostdata(post.data)
    }
    fetchData();
  }, [BEER_LIST_URL, POST_LIST_URL])

  return(
    <div className="search_section layout_padding_search">
      <div className="container">
        {/* 맥주 리스트 제목 */}
        <div className="heading_container heading_center">
          <h2>Result</h2>
        </div>
        <h2 className="beer_title">Beer</h2>
        <div className="search_beer row">
          { beerdata && beerdata.map((beer, i)=>{
            {console.log(beer)}
            return (
              <div className={`col-sm-6 col-md-4 col-lg-3 fadein all ${beer.beerType.main}`} key={beer.beerId}>
                  {/* <div className={}> */}
                  <div className="box">
                  {/* {console.log(beer)} */}
                    <div>
                      {/* 맥주 이미지 */}
                      <div className="img-box"> 
                      {/* 여기도 기본 이미지가 필요하네용 */}
                        <img src={beer.photoPath} alt=''></img>
                      </div>

                      {/* 맥주 설명란 */}
                      <div className="beerdetail-box">

                        {/* 맥주 이름 + 자세히 버튼 */}
                        <div className='beerdetail-title'>
                          <h5>{beer.name}</h5>
                          <Link to={`/beer/${beer.beerId}`} className='detailBtn'>자세히</Link>
                        </div>

                        {/* 맥주 별점 */}
                        <div className='star'>★★★★☆</div>

                        {/* 맥주 설명 */}
                        <div className='beer_volume'>
                          ALC : {beer.volume}%
                        </div>

                        {/* 맥주 해시태그 */}
                        <div className='beer_hashtag_all'>
                          {beer.aromaHashTags.map((aroma,a) => {
                            return <div key={a} className='beer_hashtag'>#{aroma}</div>
                          })}
                        </div>
                        <div className='beer_hashtag_all'>
                          {beer.flavorHashTags.map((flavor,f) => {
                            return <div key={f} className='beer_hashtag'>#{flavor}</div>
                          })}
                        </div>

                        {/* 맥주 카테고리 */}
                        <div className="options">
                          <div className='options_space_between'>
                            <h6 className='beerCategory'>
                              {beer.beerType.main}
                            </h6>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
            )})
          }
        </div>

        <div className="search_post">

        </div>
      </div>
    </div>
  )
}

export default Search;

