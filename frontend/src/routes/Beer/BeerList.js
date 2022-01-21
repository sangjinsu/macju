import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import './BeerList.css'

function BeerList(){

  return(
    <div>
      <h1>맥주 종류</h1>
      <div>
        <Link to='/beer'>전체</Link> | 
        <Link to='/beer/ale'> 에일</Link> | 
        <Link to='/beer/lager'> 라거</Link> | 
        <Link to='/beer/ladler'> 라들러</Link>
      </div>
      <hr></hr>
      <div className='beerOne'>
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
      </div>

    </div>
  )
}

export default BeerList;