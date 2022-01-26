import React from 'react';
import './PageNotFound.css'
import './responsive.css'
import { ReactComponent as PageNot } from './notFound.svg';
 
function PageNotFound(){
  return(
    <div className="page404">
      <div class="svgContainer">
        <PageNot ></PageNot>
      </div>
    </div>
  )
}

export default PageNotFound;
