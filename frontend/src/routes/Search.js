import { getDownloadURL, getStorage , ref } from "firebase/storage";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios"
import "../styles/Search.css"

function Search(props){

  // 검색한 결과 - 클릭했을때 state로 값 가져옴
  const location = useLocation();
  const searchresult = location.state
  // console.log(searchresult)



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
  useEffect(()=>{
    if (searchAll) {
      setBeerKodata(searchAll[0].data)
      setBeerEndata(searchAll[1].data)
      setAromadata(searchAll[2].data)
      setFlavordata(searchAll[3].data)
      setTypedata(searchAll[4].data)
      setUserdata(searchAll[5].data)
    }
  },[searchAll])
  

  // 전체 맥주 검색 결과 리스트
  const [beerIdArr_name, setBeerIdArr_name] = useState([])    // 맥주이름 결과
  const [beerIdArr_others, setBeerIdArr_others] = useState([])  // 나머지
  const [postdata] = useState([])

  // 검색 결과 
  const fetchSearchResult = async () =>{
    // 맥주이름 검색
    beerKodata&&beerKodata.map(beerKo => {
      setBeerIdArr_name((id)=> [...id, beerKo.beer_id])
    })
    beerEndata&&beerEndata.map(beerEn => {
      setBeerIdArr_name((id)=> [...id, beerEn.beer_id])
    })
    // 맥주 향 검색
    console.log(aromadata)
    if (Object.keys(aromadata).length !== 0) {
      const aromaName = Object.keys(aromadata)[0]  // 홉향
      const aromaIdArr = aromadata[aromaName].beers  // [2,18,...]
      aromaIdArr.map(aromaid=>{
        if (beerIdArr_others.indexOf(aromaid) === -1) {
          setBeerIdArr_others((beerid) => [...beerid, aromaid])
        }
      })
    }
    // 맥주 맛 검색
    if (Object.keys(flavordata).length !== 0) {
      const flavorName = Object.keys(flavordata)[0]  // 단맛
      const flavorIdArr = flavordata[flavorName].beers  // [2,18,...]
      flavorIdArr.map(flavorid=>{
        if (beerIdArr_others.indexOf(flavorid) === -1) {
          setBeerIdArr_others((beerid) => [...beerid, flavorid])
        }
      })
    }
    // 맥주 종류 검색
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
    // 유저해시태그 검색 - 데이터 생기면 테스트,보완 필요함
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

  // 검색값 바뀔 때마다 검색 GET 요청 보내기
  useEffect( () => {
    if (searchInput) {fetchSearchResult()}
  }, [searchAll])  
  

  const [beerArr, setBeerArr] = useState([])
  // 검색 결과 => 맥주 아이디로 맥주 정보 불러오기
  useEffect( () => {
    console.log('맥주이름 결과', beerIdArr_name)
    // const tmpArr = [...beerArr]
    // beerIdArr_name.map(async(beerid, i)=>{
    //   if (beerArr.indexOf(beerid) === -1) {
    //     const eachbeerdata = await axios.get(`${BEER_URL}/${beerid}`)
    //     tmpArr.push(eachbeerdata.data)
    //   }
    // })
    // setBeerArr(tmpArr)
    // console.log(tmpArr)
    // console.log(beerArr)
  },[searchInput, beerIdArr_name])

  useEffect( () => {
    // console.log('맛향종류유저 결과', beerIdArr_others)

    // const tmpArr = [...beerArr]
    // beerEndata.map((aroma,i)=>{
    //   const eachbeerdata = await axios.get(`${BEER_URL}/${aroma.beerid}`)
    //   tmpArr.push(eachbeerdata)
    // })
    // setBeerArr(tmpArr)
  },[searchInput, beerIdArr_others])

// console.log(beerArr)




  // 포스트 이미지 불러오기
  // const [newPostImage, setNewPostImage] = useState([])
  // const storage = getStorage()
  
  // useEffect(()=> {
  //   if (postdata.length === 0){
  //     return
  //   }
  //   const fetchData = async() =>{
  //     const imageList = []
  //     for (let i = 0; i < postdata.length; i++) {
  //       const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/${postdata[i].photo.data}`)
  //       await getDownloadURL(storageRef)
  //       .then((res)=>{
  //         if (!newPostImage.some((url)=>url===res)){
  //           imageList.push({id:postdata[i].postId, res})
  //         }
  //       })
        
  //   }
  //   setNewPostImage(imageList)
  // }
  //   fetchData();
  // //eslint-disable-next-line
  // }, [postdata])

  return(
    <div className="search_section layout_padding_search">
      <div className="container">
        {/* 맥주 리스트 제목 */}
        <div className="heading_container heading_center">
          <h2>Result</h2>

        </div>
        <h2 className="beer_title">Beer</h2>
        <div className="search_beer row">
          { beerArr && beerArr.map((beer, i)=>{
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
        {/* 더보기 버튼 - 링크수정필요 */}
        {beerArr &&
          <div className="moreBtn">
            <Link to={'/beer'}>More...</Link>
          </div>
        }

        {/* 포스트 검색결과 */}
        <h2 className="post_title">Post</h2>
        <div className="search_post row">
          { postdata && postdata.map((post, i)=>{
              // {console.log(beer)}
              return (
                <div className="col-md-6 col-lg-4 fadein" key={post.postId}>
                  <div className="box">
                    <div className="postlist_box">
                                    
                      
                  
                      {/* 포스트 카드 내용 */}
                      <div className="postdetail-box">
                        {/* 포스트 내용 + 자세히 버튼 */}
                        <div className="postdetail-title">
                          <h5>{post.content && post.content.length > 15 ? post.content.substr(0, 15) + "....": post.content}</h5>
                          <Link to={`/post/${post.postId}`} className='detailBtn'>자세히</Link>
                        </div>

                        {/* 포스트 좋아요 */}
                        <p className="fontaws"><i className="fas fa-heart" style={{color:"red"}}></i>{post.likes}</p>
                        
                        {/* 포스트 작성 정보 */}
                        <p className="post-meta">
                          작성자 :<Link to={`/profile/${post.member.memberId}/post`}>{post.member.nickName}</Link> <br/> 
                          작성시간 : {post.updatedAt[0]}/{post.updatedAt[1]}/{post.updatedAt[2]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )})
          }
        </div>
        {/* 더보기 버튼 - 링크수정필요 */}
        {postdata &&
          <div className="moreBtn">
            <Link to={'/post'}>More...</Link> 
          </div>
        }

      </div>
    </div>
  )
}

export default Search;

