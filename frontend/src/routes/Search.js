import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "../styles/Search.css"
import SearchPagination from './SearchPagination.js';
import axiosInstance from 'CustomAxios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useCallback } from 'react';

function Search(props){
  const BEER_URL = process.env.REACT_APP_SERVER + ':8888/v1/beer'
  const POST_DETAIL_URL = process.env.REACT_APP_SERVER + ':8888/v1/post'

  const location = useLocation();
  const [searchClickInput, setSearchClickInput] = useState('')
  const [searchresult, setSearchresult] = useState([])
  const [userPost, setUserPost] = useState([])
  const [hash, setHash] = useState('')
  useEffect(()=>{
    if (location.state) {
      setSearchClickInput(location.state[1]) 
      setSearchresult(location.state[0]) 
    } else if (location.Userstate){
      setUserPost(location.Userstate[0])
      setHash(location.Userstate[1])
    }
  },[location.Userstate])
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    const fetchData = async () =>{ 
      const posts = []
      for (let i = 0 ; i < userPost.length; i++){
        await axiosInstance.get(`${POST_DETAIL_URL}/${userPost[i]}`)
        .then((res)=>{
          posts.push(res.data)
        })
      }
      setPosts(posts)
    }
    if (userPost.length > 0){
      fetchData()
    }
  }, [userPost])

  const [beerArr, setBeerArr] = useState([])
  useEffect(()=>{
    const fetchbeerdata = async () => {
      if (searchresult) {
        const eachbeerdata = await axiosInstance.get(`${BEER_URL}?size=500`)
        eachbeerdata.data.map((eachbeer) =>  {
           searchresult.map((id)=>{
            if (eachbeer.beerId === id) {
              return setBeerArr((name)=>[...name, eachbeer])
            }
          })  
        })
      }
    }
    fetchbeerdata();
  },[searchresult, BEER_URL])
  const [beerEndata, setBeerEndata] = useState([])
  const [beerKodata, setBeerKodata] = useState([])
  const [aromadata, setAromadata] = useState()
  const [flavordata, setFlavordata] = useState()
  const [typedata_all, setTypedata] = useState()
  const [userdata, setUserdata] = useState()
  const searchInput = props.location.searchInput
  const searchAll = props.location.searchAll
  useEffect(()=>{
    if (searchAll) {
      setBeerKodata(searchAll[0].value.data)
      setBeerEndata(searchAll[1].value.data)
      setAromadata(searchAll[2].value.data)
      setFlavordata(searchAll[3].value.data)
      setTypedata(searchAll[4].value.data)
      setUserdata(searchAll[5].value.data)
    }
  },[searchInput, searchAll])
  const [beerIdArr_name, setBeerIdArr_name] = useState([])
  const [beerIdArr_others, setBeerIdArr_others] = useState([])

  const fetchSearchResult = useCallback( async () =>{
    beerKodata&&beerKodata.map(beerKo => {
      return setBeerIdArr_name((id)=> [...id, beerKo.beer_id])
    })
    beerEndata&&beerEndata.map(beerEn => {
      return setBeerIdArr_name((id)=> [...id, beerEn.beer_id])
    })
    if (aromadata) {
      if (Object.keys(aromadata).length !== 0) {
        const aromaName = Object.keys(aromadata)[0] 
        const aromaIdArr = aromadata[aromaName].beers 
        aromaIdArr.map(aromaid=>{
          if (beerIdArr_others.indexOf(aromaid) === -1) {
            setBeerIdArr_others((beerid) => [...beerid, aromaid])
          }
        })
      }
    }
    if (flavordata) {
      if (Object.keys(flavordata).length !== 0) {
        const flavorName = Object.keys(flavordata)[0]  
        const flavorIdArr = flavordata[flavorName].beers  
        flavorIdArr.map(flavorid=>{
          if (beerIdArr_others.indexOf(flavorid) === -1) {
            setBeerIdArr_others((beerid) => [...beerid, flavorid])
          }
        })
      }
    }
    // 맥주 종류 검색
    if (typedata_all) {
      typedata_all.map((typedata)=>{
        if (Object.keys(typedata).length !== 0) {
          const typeNameArr = Object.keys(typedata)  
          typeNameArr.map(typename=>{
            const typeIdArr = typedata[typename].beers
            typeIdArr.map(typeid=>{
              if (beerIdArr_others.indexOf(typeid) === -1) {
                setBeerIdArr_others((beerid) => [...beerid, typeid])
              }
            })
          })
        }
      })
    }
    if (userdata) {
      if (Object.keys(userdata).length !== 0) {
        const userNameArr = Object.keys(userdata)       
        userNameArr.map(userName=>{
          const userIdArr = userdata[userName].beers   
          userIdArr.map(userid=>{
            if (beerIdArr_others.indexOf(userid) === -1) {
              setBeerIdArr_others((beerid) => [...beerid, userid])
            }
          })
        })
      }
    }
  }, [aromadata, beerEndata, beerIdArr_others, beerKodata, flavordata, typedata_all, userdata])

  useEffect( () => {
    if (searchInput) {fetchSearchResult()}
  }, [beerEndata, beerKodata, aromadata, flavordata, typedata_all, userdata, fetchSearchResult, searchInput])  
  const [beerNameArr, setBeerNameArr] = useState([])
  const [beerTagArr, setBeerTagArr] = useState([])
  useEffect( () => {
    const fetchbeerdata1 = async () => {
      const eachbeerdata = await axiosInstance.get(`${BEER_URL}?size=500`)
      for (let i =0 ; i < eachbeerdata.length; i++){
        for (let j = 0; j <beerIdArr_name.length; j++){
          if (eachbeerdata[i] === beerIdArr_name[j]) {
            setBeerNameArr((name)=>[...name, eachbeerdata[i]])
          }
        }
      }
    }
    fetchbeerdata1();
  },[beerIdArr_name, beerKodata, beerEndata, BEER_URL])
  useEffect( () => {
    const fetchbeerdata2 = async () => {
      if (beerIdArr_others.length) {
        const setbeerIdArr_others = new Set(beerIdArr_others)
        const newArr = Array.from(setbeerIdArr_others)
        const eachbeerdata = await axiosInstance.get(`${BEER_URL}?size=500`)
        eachbeerdata.data.map((eachbeer) => {
          newArr.map((id)=>{
            if (eachbeer.beerId === id) {
              setBeerTagArr((name)=>[...name, eachbeer])
            }
          })  
        })
      }
    }
    fetchbeerdata2();
  },[beerIdArr_others, aromadata, flavordata, typedata_all, userdata, BEER_URL])
  useEffect(()=>{
    setBeerIdArr_name([])
    setBeerIdArr_others([])
    setBeerNameArr([])
    setBeerTagArr([])
  }, [location])
  const [currentPageName, setCurrentPageName] = useState(1); 
  const [currentPageTag, setCurrentPageTag] = useState(1); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [postPerPage] = useState(8); 
  const indexOfLastArr1 = currentPageName * postPerPage;
  const indexOfFirstArr1 = indexOfLastArr1 - postPerPage; 
  const indexOfLastArr2 = currentPageTag * postPerPage;
  const indexOfFirstArr2 = indexOfLastArr2 - postPerPage; 
  const indexOfLastArr3 = currentPage * postPerPage;
  const indexOfFirstArr3 = indexOfLastArr3 - postPerPage; 
  const currentbeerNameArr = beerNameArr.slice(indexOfFirstArr1, indexOfLastArr1);  
  const currentbeerTagArr = beerTagArr.slice(indexOfFirstArr2, indexOfLastArr2);   
  const currentbeerArr = beerArr.slice(indexOfFirstArr3, indexOfLastArr3);         
  const paginate1 = pageNum => setCurrentPageName(pageNum);
  const paginate2 = pageNum => setCurrentPageTag(pageNum);
  const paginate3 = pageNum => setCurrentPage(pageNum);
  

  return(
    <div className="search_section layout_padding_search">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Search Result</h2>
        </div>
        { currentbeerNameArr.length===0 && currentbeerTagArr.length===0 && currentbeerArr.length===0 && userPost.length === 0
          ? <Box sx={{ display: 'flex' }} style={{justifyContent:'center', margin:'auto'}}><CircularProgress size={200} style={{color:'#F9CF68'}}/></Box> 
          : null
        }
          <div className="search_beer">
            { !!currentbeerNameArr.length && <h4>' {searchInput} '  검색 결과</h4> }
            { currentbeerNameArr && 
              <div className='row'>
                { currentbeerNameArr.map((beer, i)=>{
                  return (
                    <div className='col-sm-6 col-md-4 col-lg-3 fadein all' key={beer.beerId}>
                     
                      <Link to={`/beer/${beer.beerId}`} style={{ textDecoration: 'none', color: 'white' }} className='detailBtn'>
                        <div className="beerlist_box">
                          <div>
                            <div className="img-box"> 
                              <img src={beer.photoPath} alt=''></img>
                            </div>
                            <div className="beerdetail-box">
                            <div className='beerdetail-title'>
                              <h5>{beer.name}</h5>
                              <div>{beer.englishName}</div>
                            </div>
                            <div className="options">
                              <div className='options_space_between'>
                                <h6 className='beerCategory'>
                                  {beer.beerType.en_main}
                                </h6>
                                { beer.beerType.en_detail !== null
                                  ? <h6 className='beerCategory'>
                                      {beer.beerType.en_detail}
                                    </h6>
                                  : null }
                              </div>
                            </div>

                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )})
                }
              </div>
            }
          </div>
          <SearchPagination 
            postPerPage={postPerPage} 
            totalPosts={beerNameArr.length} 
            paginate={paginate1}  />
          <div className="search_beer">
            { !!currentbeerTagArr.length && <h4>' #{searchInput} '  검색 결과</h4> }
            { currentbeerTagArr && 
              <div className='row'>
                { currentbeerTagArr.map((beer, i)=>{
                  return (
                    <div className='col-sm-6 col-md-4 col-lg-3 fadein all' key={beer.beerId}>
                      <Link to={`/beer/${beer.beerId}`} style={{ textDecoration: 'none', color: 'white' }} className='detailBtn'>
                        <div className="beerlist_box">
                          <div>
                            <div className="img-box"> 
                              <img src={beer.photoPath} alt=''></img>
                            </div>
                            <div className="beerdetail-box">
                            <div className='beerdetail-title'>
                              <h5>{beer.name}</h5>
                            </div>
                            <div className='beer_hashtag_all'>
                              {beer.aromaHashTags.map((aroma,a) => {
                                return <div key={a} className='beer_hashtag'>#{aroma}</div>
                              })}
                            </div>
                            <div className='beer_hashtag_all'>
                              {beer.flavorHashTags.map((flavor,f) => {
                                return <div key={f} className='beer_hashtag'>#{flavor}</div>
                              })}
                            </div>
                            <div className="options">
                              <div className='options_space_between'>
                              <h6 className='beerCategory'>
                                  {beer.beerType.en_main}
                                </h6>
                                { beer.beerType.en_detail !== null
                                  ? <h6 className='beerCategory'>
                                      {beer.beerType.en_detail}
                                    </h6>
                                  : null }
                              </div>
                            </div>

                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )})
                }
              </div>
            }
          </div>
          <SearchPagination 
            postPerPage={postPerPage} 
            totalPosts={beerTagArr.length} 
            paginate={paginate2}  />
          <div className="search_beer">
            { !!currentbeerArr.length && <h4>' {searchClickInput} '  검색 결과</h4> }
            { currentbeerArr && 
              <div className='row'>
                { currentbeerArr.map((beer, i)=>{
                  return (
                    <div className='col-sm-6 col-md-4 col-lg-3 fadein all' key={beer.beerId}>
                      <Link to={`/beer/${beer.beerId}`} style={{ textDecoration: 'none', color: 'white' }} className='detailBtn'>
                        <div className="beerlist_box">
                          <div>
                            <div className="img-box"> 
                              <img src={beer.photoPath} alt=''></img>
                            </div>
                            <div className="beerdetail-box">
                            <div className='beerdetail-title'>
                              <h5>{beer.name}</h5>
                            </div>
                            <div className="star-ratings">
                              <div 
                                className="star-ratings-fill space-x-2 text-lg"
                                style={{width:`${beer.averageRate*20}%` }}
                              >
                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                              </div>
                              <div className="star-ratings-base space-x-2 text-lg">
                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                              </div>
                            </div>
                            <div className='beer_volume'>
                              ALC : {beer.volume}%
                            </div>
                            <div className='beer_hashtag_all'>
                              {beer.aromaHashTags.map((aroma,a) => {
                                return <div key={a} className='beer_hashtag'>#{aroma}</div>
                              })}
                            </div>
                            <div className='beer_hashtag_all'>
                              {beer.flavorHashTags.map((flavor,f) => {
                                return <div key={f} className='beer_hashtag'>#{flavor}</div>
                              })}
                            </div>
                            <div className="options">
                              <div className='options_space_between'>
                                <h6 className='beerCategory'>
                                  {beer.beerType.en_main}
                                </h6>
                                { beer.beerType.en_detail !== null
                                  ? <h6 className='beerCategory'>
                                      {beer.beerType.en_detail}
                                    </h6>
                                  : null }
                              </div>
                            </div>

                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )})
                }
              </div>
            }
          </div>
          <SearchPagination 
            postPerPage={postPerPage} 
            totalPosts={beerArr.length} 
            paginate={paginate3}  />
      </div>
            <div className='container'>
              
              {posts.length === 0 ? null : 
              posts.map((post , i)=>
                <>
                <h3>#{hash}</h3>
                <Link key={i} to={`/post/${post.postId}`} className='detailBtn' style={{ textDecoration: 'none', color: 'black' }}><p style={{color:'#F9CF68'}}>"{post.content}"</p></Link>

                </>
              )
            }
            </div>
    </div>
  )
}

export default Search;

