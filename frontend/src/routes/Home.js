import React, { useEffect } from "react";
import BestBeer from "../components/Main/BestBeer"
import HotPost from "../components/Main/HotPost"
import RecommendBeer from "../components/Main/RecommendBeer"
import "../styles/Home.css"

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    fade:true,
    autoplaySpeed: 3000,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // className: "flex"
    centerMode: true,
    centerPadding: '10px',
  };

  useEffect( () => {
    CreateBubble()
  }, [])
  return(
    <div className="home">
      <div id="bubbles">
        <div className="main_container">
          <BestBeer settings={settings} /> <hr></hr>
          <RecommendBeer settings={settings} /><hr></hr>
          <HotPost settings={settings} />
        </div>
      </div>
    </div>
  )
}

function CreateBubble(){
  let bubbleEnd
  const bubbles = document.getElementById('bubbles'),
  
  randomN = function(start, end){
    return Math.random()*end+start;
  }
  let i = 0
  let generateBubble = function(){
    if(i < 25){
      const bubble = document.createElement('div'),
          size = randomN(5, 10);
          bubble.setAttribute('style','width: '+size+'px; height: '+size+'px; left:'+randomN(size, bubbles.offsetWidth-(size+5) )+'px;'); // 방울크기, 방울을 어느 위치에서 띄울것인지
          bubble.setAttribute("class", "bubble")
      bubbles.appendChild(bubble);
      i++;
    }else{
      clearInterval(bubbleEnd); // 충분한 방울 생성되면, setInterval 반환값을 인자로 받아 setInterval 종료
    }
  };

  bubbleEnd = setInterval(generateBubble, 500); // generateBubble를 시간을 두고 실행 
}

export default Home;