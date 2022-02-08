import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector, useStore } from "react-redux";
import "../../styles/PostList.css"
import FadeIn from 'react-fade-in';
import axios from "axios"
import { getDownloadURL, getStorage , ref } from "firebase/storage";
import "../../firebase_config"
import PostListComponent from "../../components/Post/PostList"


function PostList() {
  const POST_LIST_URL = process.env.REACT_APP_POST_LIST_URL
  const dispatch = useDispatch()
  //const text = useSelector((state:any) => state)
  const [opt, setOpt] = useState("최신순으로")
  // const [posts, setposts] = useState()
  const [stat, setStat] = useState('')
  const store = useStore()
  const onSelect = (event) => {
    dispatch({type:event.target.value})
    setOpt(event.target.value)
    setStat(store.getState().reducer[0].text)
    //stat 지우고 setposts로 post값 가져올것.
    //useSelector로 가져올경우 store 는 변경이 되지만 const 에서 정의한 변수값이 반영되는 시점이 좀 더 늦기 때문에 store에서 직접 꺼내옴. 
  }


  // 포스트 데이터
  const [postdata, setpostdata] = useState([])
  // 포스트 사진 URL
  const [postImgList, setPostImgList] = useState([])
  // 각 포스트 좋아요
  const [isLike, setisLike] = useState([])
  // 정렬된 사진 URL
  // const [imgurls, setimgurls] = useState([])

  useEffect(async ()=>{
    // http://i6c107.p.ssafy.io:8080/v1/post/new
    // http://13.125.157.39:8080/v1/post
    const data = await axios.get(POST_LIST_URL)
    console.log(data)
    // const data = await axios.get("http://13.125.157.39:8080/v1/post/new")
    setpostdata([data][0].data)
    const datalist = [data][0].data
    
    const storage = getStorage()
    for(var i=0, j=datalist.length; i<j; i++) {
      console.log(datalist[i])
      const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/imgs/${datalist[i].postId}/${datalist[i].photo.data}`)
      getDownloadURL(storageRef)
      .then((url)=>{
        setPostImgList((prev)=>[...prev,url])
        // console.log(postImgList)
      })
    }
  }, [])
  

  return (
    <>
    <section className="postlist_section layout_padding_postlist">
      <div className="container">

        {/* 제목, 정렬dropdown */}
        <div className="postlist_header heading_center">
          <h2>Our Post</h2>  
        </div>  
        <div>
          <select onChange={onSelect} style={{"width":200, "height":35}}>
            <option className='disable'>
              정렬 순서를 선택하세요
            </option>
            <option>
              recent
            </option>
            <option>
              popular
            </option>
          </select>
        </div>
        <div className='postlist_order'>
          {opt == "recent" ? <div> 최신순 게시글</div> : <div>인기순 게시글</div>}
          {/* {stat} */} 
        </div>

        {/* 포스트 카드들 */}
        <FadeIn>
          <PostListComponent postdata={postdata}/>
        </FadeIn>
      </div>
    </section>
    </>
    
  )
  }
  


export default PostList;
