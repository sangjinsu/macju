import { ListGroup } from "react-bootstrap";
import _ from "lodash"
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";




const SearchResult = (props) =>{  
  const searchResult = props.data
  return (  
    <ListGroup style={{marginTop:40 ,position:'fixed', zIndex:12000}}>   
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (searchResult[0].length !== 0) return searchResult[0].data.map((result, i) =>
        <Link to={{pathname: `/search/${result.beer_name}`,
                  state: result
                  }}
        ><ListGroup.Item key={i}> {result.beer_name}</ListGroup.Item> </Link>
        )         
      })() 
    }
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (!searchResult[1]) return null
        if (searchResult[1].length !== 0) return searchResult[1].data.map((result, i) =>
        <Link to={{pathname:`/search/${result.beer_name}`,
                  state: result
                  }}
        >
        <ListGroup.Item key={i}> {result.beer_name}</ListGroup.Item></Link> 
        )       
      })()
    }
    {
      (()=>{

        if (searchResult.length === 0) return null
        if (!searchResult[2]) return null
        if (!_.isEmpty(searchResult[2].data)) return (
          <Link to= {{pathname: `/search/${Object.keys(searchResult[2].data)[0]}`,
                  state: searchResult[2].data[Object.keys(searchResult[2].data)[0]].beers
                  }}           
           >
             
          <ListGroup.Item >{Object.keys(searchResult[2].data)[0]}({searchResult[2].data[Object.keys(searchResult[2].data)[0]].beers.length}개)</ListGroup.Item>
          </Link>
        )
      })()
    }
    {
      (()=>{

        if (searchResult.length === 0) return null
        if (!searchResult[3]) return null
        if (!_.isEmpty(searchResult[3].data)) return (
          <Link to= {{pathname: `/search/${Object.keys(searchResult[3].data)[0]}`,
                  state: searchResult[3].data[Object.keys(searchResult[3].data)[0]].beers
                  }}           
           >
          <ListGroup.Item >{Object.keys(searchResult[3].data)[0]}({searchResult[3].data[Object.keys(searchResult[3].data)[0]].beers.length}개)</ListGroup.Item>
          </Link>
        )
      })()
    }
    {(()=>{
        if (searchResult.length === 0) return null
        if (!searchResult[4]) return null
        searchResult[4].data.map((result, i)=> _.isEmpty(result) ? null : 
        <Link to={{ pathname: `/search/${result}`,
                    state: searchResult[4].data
        }}><ListGroup.Item>{console.log(result[Object.keys(result)])}</ListGroup.Item></Link>
        ) 
      })()
    }
    {/* userdata */}
    {/* {
      (()=>{
        if (searchResult.length === 0) return null
        if (!_.isEmpty(searchResult[5].data)) return searchResult[5].data[Object.keys(searchResult[5].data)[0]].beers.map((result, i) =>
        <ListGroup.Item key={i}> {result}({Object.keys(searchResult[5].data)[0]})</ListGroup.Item> 
        )       
      })()
    } */}

     
      </ListGroup>
    
  )
}
export default SearchResult;
