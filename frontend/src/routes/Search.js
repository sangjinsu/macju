// import { getDownloadURL, getStorage , ref } from "firebase/storage";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios"
import "../styles/Search.css"

function Search(props){
  const BEER_URL = process.env.REACT_APP_SERVER + ':8080/v1/beer'

  const [isMore, setIsMore] = useState(false)



  // 검색한 결과 - 클릭했을때 state로 값 가져옴
  const location = useLocation();
  const searchresult = location.state   // id 배열 형식
  // console.log(searchresult)

  const [beerArr, setBeerArr] = useState([])
  const [beerAllArr, setBeerAllArr] = useState([])
  useEffect(()=>{
      // console.log(searchAll)
    console.log('클릭 결과', beerIdArr_name)
    const fetchbeerdata = async () => {
    if (searchresult.length) {
      // 개수가 10개보다 많으면 10개로 자르고 isMore=true
      if (searchresult.length > 10) {
        setIsMore(true)
        const eachbeerdata = await axios.get(`${BEER_URL}?size=500`)
        eachbeerdata.data.map((eachbeer) => {
          searchresult.slice(0,10).map((id)=>{
            if (eachbeer.beerId === id) {
              setBeerArr((name)=>[...name, eachbeer])
            }
          })
          searchresult.slice(10).map((id)=>{
            if (eachbeer.beerId === id) {
              setBeerAllArr((name)=>[...name, eachbeer])
            }
          })
      })
      } else {
        const eachbeerdata = await axios.get(`${BEER_URL}?size=500`)
        eachbeerdata.data.map((eachbeer) => {
          searchresult.map((id)=>{
            if (eachbeer.beerId === id) {
              setBeerArr((name)=>[...name, eachbeer])
            }
          })  
        })
      }
      
    }
    fetchbeerdata();
    }
  },[searchresult])



  // 각 검색 결과
  const [beerEndata, setBeerEndata] = useState([])
  const [beerKodata, setBeerKodata] = useState([])
  const [aromadata, setAromadata] = useState()
  const [flavordata, setFlavordata] = useState()
  const [typedata_all, setTypedata] = useState()
  const [userdata, setUserdata] = useState()


  // 검색한 값 - 엔터했을때 props로 값 가져옴
  const searchInput = props.location.searchInput
  const searchAll = props.location.searchAll
  // console.log(searchInput, searchAll)
  useEffect(()=>{
    if (searchAll) {
      // console.log(searchAll)
      setBeerKodata(searchAll[0].data)
      setBeerEndata(searchAll[1].data)
      setAromadata(searchAll[2].data)
      setFlavordata(searchAll[3].data)
      setTypedata(searchAll[4].data)
      setUserdata(searchAll[5].data)
    }
  },[searchInput])
  

  // 전체 맥주 검색 결과 리스트
  const [beerIdArr_name, setBeerIdArr_name] = useState([])    // 맥주이름 결과
  const [beerIdArr_others, setBeerIdArr_others] = useState([])  // 나머지
  const [postdata] = useState([])

  // 검색 결과 
  const fetchSearchResult = async () =>{
    // 맥주이름 검색
    console.log(beerKodata)
    beerKodata&&beerKodata.map(beerKo => {
      setBeerIdArr_name((id)=> [...id, beerKo.beer_id])
    })
    beerEndata&&beerEndata.map(beerEn => {
      setBeerIdArr_name((id)=> [...id, beerEn.beer_id])
    })
    // 맥주 향 검색
    if (aromadata) {
      if (Object.keys(aromadata).length !== 0) {
        const aromaName = Object.keys(aromadata)[0]  // 홉향
        const aromaIdArr = aromadata[aromaName].beers  // [2,18,...]
        aromaIdArr.map(aromaid=>{
          if (beerIdArr_others.indexOf(aromaid) === -1) {
            setBeerIdArr_others((beerid) => [...beerid, aromaid])
          }
        })
      }
    }
    // 맥주 맛 검색
    if (flavordata) {
      if (Object.keys(flavordata).length !== 0) {
        const flavorName = Object.keys(flavordata)[0]  // 단맛
        const flavorIdArr = flavordata[flavorName].beers  // [2,18,...]
        flavorIdArr.map(flavorid=>{
          if (beerIdArr_others.indexOf(flavorid) === -1) {
            setBeerIdArr_others((beerid) => [...beerid, flavorid])
          }
        })
      }
    }
    // 맥주 종류 검색
    if (typedata_all) {
      typedata_all.map((typedata)=>{
        if (Object.keys(typedata).length !== 0) {
          const typeNameArr = Object.keys(typedata)  // 골든 에일
          typeNameArr.map(typename=>{
            const typeIdArr = typedata[typename].beers
            typeIdArr.map(typeid=>{
              if (beerIdArr_others.indexOf(typeid) === -1) {
                setBeerIdArr_others((beerid) => [...beerid, typeid])
              }
            })
          })
        }
      })
    }
    // 유저해시태그 검색 - 데이터 생기면 테스트,보완 필요함
    if (userdata) {
      if (Object.keys(userdata).length !== 0) {
        const userNameArr = Object.keys(userdata)       // #asdf
        userNameArr.map(userName=>{
          const userIdArr = userdata[userName].beers   // [2,18,...]
          userIdArr.map(userid=>{
            if (beerIdArr_others.indexOf(userid) === -1) {
              setBeerIdArr_others((beerid) => [...beerid, userid])
            }
          })
        })
      }
    }
  }

  // 검색값 바뀔 때마다 검색 GET 요청 보내기
  useEffect( () => {
    if (searchInput) {fetchSearchResult()}
  }, [beerEndata, beerKodata, aromadata, flavordata, typedata_all, userdata])  
  

  const [beerNameArr, setBeerNameArr] = useState([])
  const [beerNameAllArr, setBeerNameAllArr] = useState([])
  const [beerTagArr, setBeerTagArr] = useState([])
  const [beerTagAllArr, setBeerTagAllArr] = useState([])
  // 검색 결과 => 맥주 아이디로 맥주 정보 불러오기
  useEffect( () => {
    console.log('맥주이름 결과', beerIdArr_name)
    const fetchbeerdata1 = async () => {
      if (beerIdArr_name.length) {
        // 개수가 10개보다 많으면 10개로 자르고 isMore=true
        if (searchresult.length > 10) {
          setIsMore(true)
          const eachbeerdata = await axios.get(`${BEER_URL}?size=500`)
          eachbeerdata.data.map((eachbeer) => {
            // 10개까지만 
            beerIdArr_name.slice(0,10).map((id)=>{
              if (eachbeer.beerId === id) {
                setBeerNameArr((name)=>[...name, eachbeer])
              }
            })
            // 10개 이상인 부분
            beerIdArr_name.slice(10).map((id)=>{
              if (eachbeer.beerId === id) {
                setBeerNameAllArr((name)=>[...name, eachbeer])
              }
            })
        })
        } else {
          const eachbeerdata = await axios.get(`${BEER_URL}?size=500`)
          eachbeerdata.data.map((eachbeer) => {
            beerIdArr_name.map((id)=>{
              if (eachbeer.beerId === id) {
                setBeerNameArr((name)=>[...name, eachbeer])
              }
            })  
          })
        }
      }
    }
    fetchbeerdata1();
  },[beerIdArr_name, beerKodata, beerEndata])

  useEffect( () => {
    console.log('맛향종류유저 결과', beerIdArr_others)
    const fetchbeerdata2 = async () => {
      if (beerIdArr_others.length) {
        // 개수가 10개보다 많으면 10개로 자르고 isMore=true
        if (searchresult.length > 10) {
          setIsMore(true)
          const eachbeerdata = await axios.get(`${BEER_URL}?size=500`)
          eachbeerdata.data.map((eachbeer) => {
            // 10개까지만 
            beerIdArr_others.slice(0,10).map((id)=>{
              if (eachbeer.beerId === id) {
                setBeerTagArr((name)=>[...name, eachbeer])
              }
            })
            // 10개 이상인 부분
            beerIdArr_others.slice(10).map((id)=>{
              if (eachbeer.beerId === id) {
                setBeerTagAllArr((name)=>[...name, eachbeer])
              }
            })
        })
        } else {
          const eachbeerdata = await axios.get(`${BEER_URL}?size=500`)
          eachbeerdata.data.map((eachbeer) => {
            beerIdArr_others.map((id)=>{
              if (eachbeer.beerId === id) {
                setBeerTagArr((name)=>[...name, eachbeer])
              }
            })  
          })
        }
      }
    }
    fetchbeerdata2();
  },[beerIdArr_others, aromadata, flavordata, typedata_all, userdata])

// console.log(beerArr)

// 새로고침하면 배열 리셋
useEffect(()=>{
  setBeerIdArr_name([])
  setBeerIdArr_others([])
  setBeerNameArr([])
  setBeerTagArr([])
}, [location])

// 더보기 클릭하면 배열 모두 보여줌
const clickMore = () => {
  setBeerArr(beerAllArr)
  setBeerNameArr(beerNameAllArr)
  setBeerTagArr(beerTagAllArr)
}

  return(
    <div className="search_section layout_padding_search">
      <div className="container">
        {/* 맥주 리스트 제목 */}
        <div className="heading_container heading_center">
          <h2>Result</h2>
          <h4>' {searchInput} '  검색 결과</h4>
        </div>
        
        {/* 맥주이름으로 검색했을 때 */}
        <div className="search_beer">
          { beerNameArr && 
            <h4>' {searchInput} '  검색 결과</h4> ,
            <div className='row'>
              { beerNameArr.map((beer, i)=>{
                return (
                  <div className='col-sm-6 col-md-4 col-lg-3 fadein all' key={beer.beerId}>
                    {/* {console.log(beer)} */}
                    
                    <Link to={`/beer/${beer.beerId}`} style={{ textDecoration: 'none', color: 'white' }} className='detailBtn'>
                      <div className="beerlist_box">
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
                            {/* <Link to={`/beer/${beer.beerId}`} className='detailBtn'>자세히</Link> */}
                          </div>

                          {/* 맥주 별점 */}
                          <div className="star-ratings">
                            <div 
                              className="star-ratings-fill space-x-2 text-lg"
                              style={{width:`${beer.averageRate*20}%` }}
                            >
                              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                            <div className="star-ratings-base space-x-2 text-lg">
                              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                          </div>

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
                                {beer.beerType.en_main}
                              </h6>
                            </div>
                          </div>

                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )})
              }
            </div>
          }
        </div>


        {/* 태그로 검색했을 때 */}
        <div className="search_beer">
          {/* {console.log(beerTagArr)} */}
          { beerTagArr && 
            <h4>' #{searchInput} '  검색 결과</h4> ,
            <div className='row'>
              { beerTagArr.map((beer, i)=>{
                return (
                  <div className='col-sm-6 col-md-4 col-lg-3 fadein all' key={beer.beerId}>
                    {/* {console.log(beer)} */}
                    <Link to={`/beer/${beer.beerId}`} style={{ textDecoration: 'none', color: 'white' }} className='detailBtn'>
                      <div className="beerlist_box">
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
                            {/* <Link to={`/beer/${beer.beerId}`} className='detailBtn'>자세히</Link> */}
                          </div>

                          {/* 맥주 별점 */}
                          <div className="star-ratings">
                            <div 
                              className="star-ratings-fill space-x-2 text-lg"
                              style={{width:`${beer.averageRate*20}%` }}
                            >
                              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                            <div className="star-ratings-base space-x-2 text-lg">
                              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                          </div>

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
                                {beer.beerType.en_main}
                              </h6>
                            </div>
                          </div>

                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )})
              }
            </div>
          }
        </div>


        {/* 클릭해서 검색했을 때 */}
        <div className="search_beer">
          {/* {console.log(beerTagArr)} */}
          { beerArr && 
            <h4>' {} '  검색 결과</h4> ,
            <div className='row'>
              { beerArr.map((beer, i)=>{
                return (
                  <div className='col-sm-6 col-md-4 col-lg-3 fadein all' key={beer.beerId}>
                    {/* {console.log(beer)} */}
                    <Link to={`/beer/${beer.beerId}`} style={{ textDecoration: 'none', color: 'white' }} className='detailBtn'>
                      <div className="beerlist_box">
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
                            {/* <Link to={`/beer/${beer.beerId}`} className='detailBtn'>자세히</Link> */}
                          </div>

                          {/* 맥주 별점 */}
                          <div className="star-ratings">
                            <div 
                              className="star-ratings-fill space-x-2 text-lg"
                              style={{width:`${beer.averageRate*20}%` }}
                            >
                              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                            <div className="star-ratings-base space-x-2 text-lg">
                              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                          </div>

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
                                {beer.beerType.en_main}
                              </h6>
                            </div>
                          </div>

                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )})
              }
            </div>
          }
        </div>

        {/* 더보기 버튼 - 링크수정필요 */}
        {isMore &&
          <div>
            <div className="moreBtn" onClick={clickMore} >More...</div>
          </div>
        }
      </div>
    </div>
  )
}

export default Search;

