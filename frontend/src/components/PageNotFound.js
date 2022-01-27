import React from 'react';
import '../styles/PageNotFound.css'
import '../styles/responsive.css'
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
