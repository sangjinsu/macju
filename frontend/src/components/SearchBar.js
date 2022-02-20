import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import '../styles/SearchBar.css'
import axiosInstance from 'CustomAxios'
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import _ from "lodash"
import { EraseEffect }from "./searchBarFunc"



function SearchBar(){
  const SEARCH_URL = process.env.REACT_APP_SERVER + ':8080'
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');   
  const [searchAll , setSearchAll] = useState([]) 
  const [searchResult, setSearchresult] = useState([])
  
  const setInput = async (e) => {
    setSearchInput(e.target.value);
  }
  
  const eraseInput = (e) => {
    e.preventDefault()
    setSearchresult([])
    setSearchInput("");
  }

  const SearchSubmit = ((e)=> {
    e.preventDefault()
    setSearchInput("")
    console.log('지워짐')
    setSearchresult([])
    history.replace({pathname:`/search/${searchInput}`, searchInput:searchInput, searchAll:searchAll})
  })



  
  const fetchSearchResult = async () =>{
    if (searchInput === "") {
      setSearchAll([])
      return
    }
    setSearchAll([])
    const beerKosearch = axiosInstance.get(`${SEARCH_URL}/v1/search/name?query=${searchInput}&lang=ko`)
    const beerEnsearch = axiosInstance.get(`${SEARCH_URL}/v1/search/name?query=${searchInput}&lang=en`)
    const aromasearch = axiosInstance.get(`${SEARCH_URL}/v1/search/aroma?query=${searchInput}`)
    const flavorsearch = axiosInstance.get(`${SEARCH_URL}/v1/search/flavor?query=${searchInput}`)
    const typesearch = axiosInstance.get(`${SEARCH_URL}/v1/search/type?query=${searchInput}`)
    const usersearch = axiosInstance.get(`${SEARCH_URL}/v1/search/user?query=${searchInput}`)
    Promise.allSettled([beerKosearch, beerEnsearch, aromasearch, flavorsearch, typesearch,usersearch])
    .then((results)=>setSearchAll(results))   
  }
  
  useEffect(()=>{
    setSearchresult(searchAll)
  }, [searchAll])

  

  useEffect( () => {
    EraseEffect()
  }, [])


  useEffect(() => {
    fetchSearchResult()
  }, [searchInput])  
  const removeSearch = () =>{
    setSearchresult([])
  }


  return(
    <>
      <form className="input" onSubmit={SearchSubmit}>

        <button type="submit" className="searchicon"><i className="fa fa-search"></i></button>
        <div className="text" id="dropdown">
          <input id="input" type="text" placeholder="검색..." onChange={setInput} autoComplete={"off"} value={searchInput} style={{width:226}}/>
        </div>
        
        <button className="clear" onClick={ eraseInput } >
          <svg viewBox="0 0 24 24">
            <path className="line" d="M2 2L22 22" />
            <path className="long" d="M9 15L20 4" />
            <path className="arrow" d="M13 11V7" />
            <path className="arrow" d="M17 11H13" />
          </svg>
        </button>
        
      </form>

      <ListGroup style={{marginTop:40 ,position:'fixed', zIndex:12000}}>   
      {
      (()=>{
        if (searchResult.length === 0) return null
        if (searchResult[4].status !== "fulfilled") return null        
        searchResult[4].value.data.map((results, i)=> { 
          if (!_.isEmpty(results)) {
            Object.keys(results).map((type, j)=>{ return (
              <Link to={{ pathname: `/search/${type}`,
                      state: [results[type].beers, type] }} key={j}
                      className='searchbar_results'
                      style={{ textDecoration: 'none' }}
              > 
                <ListGroup.Item onClick={removeSearch}>{type}({results[type].beers.length}개)</ListGroup.Item>
              </Link>
            )})
          }
        })
      })()
    }    
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (searchResult[0].status !== "fulfilled") return null
        if (searchResult[0].value.data.length !== 0)
          return searchResult[0].value.data.map((result, i) =>
            <Link to={{pathname: `/beer/${result.beer_id}`}} key={i} style={{ textDecoration: 'none' }} className='searchbar_results'>
              <ListGroup.Item onClick={removeSearch}> {result.beer_name}</ListGroup.Item> 
            </Link>
        )       
      })()
    }
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (searchResult[1].status !== "fulfilled") return null        
        if (searchResult[1].value.data.length !== 0) return searchResult[1].value.data.map((result, i) =>

        <Link to={{pathname:`/search/${result.beer_name}`,
                  state: result
                  }}
              className='searchbar_results'
              style={{ textDecoration: 'none' }}
              key={i}
        >
        <ListGroup.Item onClick={removeSearch}> {result.beer_name}</ListGroup.Item></Link> 
        )       
      })()
    }
    {
      (()=>{
        if (searchResult.length === 0) return null
        if (searchResult[2].status !== "fulfilled") return null        
        if (!_.isEmpty(searchResult[2].value.data)) return (
          <Link to= {{pathname: `/search/${Object.keys(searchResult[2].value.data)[0]}`,
                  state: [searchResult[2].value.data[Object.keys(searchResult[2].value.data)[0]].beers, 
                  Object.keys(searchResult[2].value.data)[0]]
                }}           
                      className='searchbar_results'
                      style={{ textDecoration: 'none' }}
           >
          <ListGroup.Item onClick={removeSearch}>{Object.keys(searchResult[2].value.data)[0]}({searchResult[2].value.data[Object.keys(searchResult[2].value.data)[0]].beers.length}개)</ListGroup.Item>
          </Link>
        )
      })()
    }
    {
      (()=>{

        if (searchResult.length === 0) return null
        if (searchResult[3].status !== "fulfilled") return null        
        if (!_.isEmpty(searchResult[3].value.data)) return (
          <Link to= {{pathname: `/search/${Object.keys(searchResult[3].value.data)[0]}`,
                  state: [searchResult[3].value.data[Object.keys(searchResult[3].value.data)[0]].beers,
                          Object.keys(searchResult[3].value.data)[0]]
                  }}           
                      className='searchbar_results'
                      style={{ textDecoration: 'none' }}
           >
          <ListGroup.Item onClick={removeSearch}>{Object.keys(searchResult[3].value.data)[0]}({searchResult[3].value.data[Object.keys(searchResult[3].value.data)[0]].beers.length}개)</ListGroup.Item>
          </Link>
        )
      })()
    }
    {
      (()=>{

        if (searchResult.length === 0) return null
        if (searchResult[5].status !== "fulfilled") return null        
        if (!_.isEmpty(searchResult[5].value.data)) return (
          <Link to= {{pathname: `/search/${Object.keys(searchResult[5].value.data)}`,
                  Userstate: [searchResult[5].value.data[Object.keys(searchResult[5].value.data)[0]].posts, Object.keys(searchResult[5].value.data)[0]]
                  }}           
                      className='searchbar_results'
                      style={{ textDecoration: 'none' }}
           >
             
          <ListGroup.Item onClick={removeSearch}>{Object.keys(searchResult[5].value.data)[0]}({searchResult[5].value.data[Object.keys(searchResult[5].value.data)[0]].posts.length})</ListGroup.Item>
          </Link>
        )
      })()
    }
    
      </ListGroup>
    

    </>
  )
}




export default SearchBar;
