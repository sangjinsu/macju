import React, { useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RecommendBeer.css"


const RecommendBeer = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    // className: "center",
    // centerMode: true,
    // centerPadding: "60px",
    fade:true, //center랑 중복 불가능
    autoplaySpeed: 1000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect( () => {
    A()
  }, [])

  return(
    <div className="SlickTest">
        <div id="bubbles">
          <h3>Best Beer</h3>
          <Slider {...settings}>
              <CustomSlide index={1}></CustomSlide>
              <CustomSlide index={2}></CustomSlide>
              <CustomSlide index={3}></CustomSlide>
              <CustomSlide index={4}></CustomSlide>
          </Slider>
        </div>
    </div>
  )
}

function CustomSlide(props) {
  const imgSrc = "img/abc.png"
  return(
    <div {...props}>
      <img src={imgSrc}/>
    </div>
  )
}

function A(){
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


export default RecommendBeer;