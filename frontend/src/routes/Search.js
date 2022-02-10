import { getDownloadURL, getStorage , ref } from "firebase/storage";
import { useEffect, useState } from "react";
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
  const [newPostImage, setNewPostImage] = useState([])
  const storage = getStorage()
  
  useEffect(()=> {
    if (postdata.length === 0){
      return
    }
    const fetchData = async() =>{
      const imageList = []
      for (let i = 0; i < postdata.length; i++) {
        const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/imgs/${postdata[i].postId}/${postdata[i].photo.data}`)
        await getDownloadURL(storageRef)
        .then((res)=>{
          if (!newPostImage.some((url)=>url===res)){
            imageList.push({id:postdata[i].postId, res})
          }
        })
        
    }
    setNewPostImage(imageList)
  }
    fetchData();
  //eslint-disable-next-line
  }, [postdata])

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
            return (
              <div className='col-sm-6 col-md-4 col-lg-3 fadein all' key={beer.beerId}>
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
        {/* 더보기 버튼 - 링크수정필요 */}
        {beerdata &&
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
                                    
                      {/* 포스트 이미지 */}
                      {newPostImage&&newPostImage.map((data, i)=> data.id === post.postId ? 
                        <div key={i} className="img-box">
                          {/* 기본이미지 하나 구해야겠네요 */}
                          <img src={data.res} alt=""></img>
                          {/* <img src={post.photo.data}></img> */  }
                        </div> : null
                        )
                        }
                  
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

