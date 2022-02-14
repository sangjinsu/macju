import { ListGroup } from "react-bootstrap";
import _ from "lodash"
import { Link } from "react-router-dom";




const SearchResult = (props) =>{
  const searchResult = props.data

  return (

  

    
    <ListGroup style={{marginTop:40 ,position:'fixed', zIndex:12000}}>
      
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (searchResult[0].length !== 0) return searchResult[0].data.map((result, i) =>
        <Link to={`/search/${result.beer_name}`}><ListGroup.Item key={i}> {result.beer_name}</ListGroup.Item> </Link>
        )       
      })() 
    }
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (searchResult[1].length !== 0) return searchResult[1].data.map((result, i) =>
        <Link to={`/search/${result.beer_name}`}>
        <ListGroup.Item key={i}> {result.beer_name}</ListGroup.Item></Link> 
        )       
      })()
      
    }
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (!_.isEmpty(searchResult[2].data)) return searchResult[2].data[Object.keys(searchResult[2].data)[0]].beers.map((result, i) =>
        <Link to={`/search/${result}`}><ListGroup.Item key={i}> {result}({Object.keys(searchResult[2].data)[0]})</ListGroup.Item> </Link>
        )       
      })()
    }
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (!_.isEmpty(searchResult[3].data)) return searchResult[3].data[Object.keys(searchResult[3].data)[0]].beers.map((result, i) =>
        <Link to={`/search/${result}`}><ListGroup.Item key={i}> {result}({Object.keys(searchResult[3].data)[0]})</ListGroup.Item> </Link>
        )       
      })()
    }
    {(()=>{
        if (searchResult.length === 0) return null
        searchResult[4].data.map((result, i)=> _.isEmpty(result) ? null : 
        <Link to={`/search/${result}`}><ListGroup.Item>{result}</ListGroup.Item></Link>
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