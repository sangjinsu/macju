import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RecommendBeer.css"
import axios from "axios";


const BestPost = () => {
  const [rankingPostList, setRanking] = useState()

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    // className: "center",
    // centerMode: true,
    // centerPadding: "60px",
    fade:true, //center랑 중복 불가능
    autoplaySpeed: 5000,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect( () => {
    const hotPost = async () => {
      try{
        const RANKING_HOTPOST = process.env.REACT_APP_SERVER + ':8081/post/hotpost'
        const headers = {
          'Accept': "application/json; charset=UTF-8"
        }
        const { data : rankingPost } = await axios.get(RANKING_HOTPOST, headers)
        const rankingPostId = rankingPost.map( (post) => post.postId )
        setRanking(rankingPostId)
      }catch{
        console.log("불러오기 실패")
      }
    }
    hotPost()
  }, [])
  

  useEffect( () => {
    CreateBubble()
  }, [])

  return(
    <div className="SlickTest">
        <div id="bubbles">
          <h3 className="bestbeer" align="center">Hot Post</h3>
          <Slider {...settings}>
            {
              rankingPostList&&rankingPostList.map((postid, i) => 
                <CustomSlide postid={postid} key={i} />
              )
            }
          </Slider>
        </div>
    </div>
  )
}


function CustomSlide(props) {
  const BEER_DETAIL_URL = process.env.REACT_APP_SERVER + `:8080/v1/post/${props.postid}`
  const [imgSrc, setImgSrc] = useState()
  const storage = getStorage()
  const aa = props.postid
  const [bb, setbb] = useState()
  useEffect( () => {
    const fetchData = async ()=>{
      const { data : postDetail } = await axios.get(`${BEER_DETAIL_URL}`)
      setImgSrc(postDetail)
      const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/${postDetail.photos[0].data}`)
      const test = await getDownloadURL(storageRef)
      setbb(test)
    }
    fetchData();
  }, [])
  return(
    <div {...props}>
      <img className="slideImg" src={bb} alt=""/>
    </div>
  )
}

function CreateBubble(){
  let bubbleEnd
  const bubbles = document.getElementById("bubbles"),
  
  randomN = function(start, end){
    return Math.random()*end+start;
  }
  let i = 0
  let generateBubble = function(){
    if(i < 25){
      const bubble = document.createElement("div"),
          size = randomN(5, 10);
          bubble.setAttribute("style","width: "+size+"px; height: "+size+"px; left:"+randomN(size, bubbles.offsetWidth-(size+5) )+"px;"); // 방울크기, 방울을 어느 위치에서 띄울것인지
          bubble.setAttribute("class", "bubble")
      bubbles.appendChild(bubble);
      i++;
    }else{
      clearInterval(bubbleEnd); // 충분한 방울 생성되면, setInterval 반환값을 인자로 받아 setInterval 종료
    }
  };

  bubbleEnd = setInterval(generateBubble, 500); // generateBubble를 시간을 두고 실행 
}


export default BestPost;
