import { ListGroup } from "react-bootstrap";
import _ from "lodash"
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";




const SearchResult = (props) =>{
  
  const [beerNameForAroma, setBeerNameForAroma] = useState([])
  const [beerNameForFlavor, setBeerNameForFlavor] = useState([])
  
  const searchResult = props.data

  const BEER_URL = process.env.REACT_APP_SERVER + ':8080/v1/beer'
  const beernameA = async ()=>{
    setBeerNameForAroma([])
    if (searchResult.length !== 0){
      if (!_.isEmpty(searchResult[2].data)){
        searchResult[2].data[Object.keys(searchResult[2].data)[0]].beers.map(async (result) =>{
          const beer = await axios.get(`${BEER_URL}/${result}`)
          setBeerNameForAroma((prev)=>[...prev, beer.data.name])        
        })
      } 
    } 
  }
  const beernameF = async ()=>{
    setBeerNameForFlavor([])
    const beerName = []
    if (searchResult.length !== 0){
      if (!_.isEmpty(searchResult[3].data)){
        searchResult[3].data[Object.keys(searchResult[3].data)[0]].beers.map(async (result) =>{
          const beer = await axios.get(`${BEER_URL}/${result}`)
          setBeerNameForFlavor((prev)=>[...prev, beer.data.name])
          
        })
    }
    
  }
  
    
  }
  useEffect(()=>{
    beernameA();
    beernameF();
  }, [searchResult])
  return (  
    <ListGroup style={{marginTop:40 ,position:'fixed', zIndex:12000}}>   
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (searchResult[0].length !== 0) return searchResult[0].data.map((result, i) =>
        <Link to={{pathname: `/search/${result.beer_name}`,
                  state: searchResult[0].data
                  }}
        ><ListGroup.Item key={i}> {result.beer_name}</ListGroup.Item> </Link>
        )       
      })() 
    }
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (searchResult[1].length !== 0) return searchResult[1].data.map((result, i) =>
        <Link to={{pathname:`/search/${result.beer_name}`,
                  state: searchResult[1].data
                  }}
        >
        <ListGroup.Item key={i}> {result.beer_name}</ListGroup.Item></Link> 
        )       
      })()
    }
  
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (!_.isEmpty(searchResult[2].data)) return searchResult[2].data[Object.keys(searchResult[2].data)[0]].beers.map((result, i) =>
        <Link to= {{pathname: `/search/${beerNameForAroma[i]}`,
                  state: searchResult[2].data[Object.keys(searchResult[2].data)[0]].beers
                  }}           
        >
          <ListGroup.Item key={i}>{beerNameForAroma[i]}({Object.keys(searchResult[2].data)[0]})</ListGroup.Item> </Link>
        )       
      })()
    }
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (!_.isEmpty(searchResult[3].data)) return searchResult[3].data[Object.keys(searchResult[3].data)[0]].beers.map((result, i) =>
        <Link to= {{pathname: `/search/${beerNameForFlavor[i]}`,
                  state: searchResult[3].data[Object.keys(searchResult[3].data)[0]].beers
                  }}           
        >
          <ListGroup.Item key={i}>{beerNameForFlavor[i]}({Object.keys(searchResult[3].data)[0]})</ListGroup.Item> </Link>
        )       
      })()
    }
    {(()=>{
        if (searchResult.length === 0) return null
        searchResult[4].data.map((result, i)=> _.isEmpty(result) ? null : 
        <Link to={{ pathname: `/search/${result}`,
                    state: searchResult[4].data
        }}><ListGroup.Item>{result}</ListGroup.Item></Link>
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