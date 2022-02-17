import React from 'react';
import '../styles/PageNotFound.css'
import '../styles/Responsive.css'
import { ReactComponent as PageNot } from '../styles/NotFound.svg';
 
function PageNotFound(){
  return(
    <div className="page404">
      <div className="svgContainer">
        <PageNot ></PageNot>
      </div>
    </div>
  )
}

export default PageNotFound;
