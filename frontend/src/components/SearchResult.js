import { ListGroup } from "react-bootstrap";
const SearchResult = (props) =>{
  const searchResult = props.data

  return (
    <ListGroup style={{marginTop:40 ,position:'fixed', zIndex:12000}}>
      {searchResult.length === 0 ? null : searchResult.map((result, i) =>
      <ListGroup.Item key={i}> {result.beer_name}</ListGroup.Item> 
      ) }
      
    </ListGroup>
  )
}
export default SearchResult;