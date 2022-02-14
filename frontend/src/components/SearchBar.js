import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { gsap } from "gsap/dist/gsap";
import './SearchBar.css'
import axios from "axios"
import { useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";


function SearchBar(){
  const SEARCH_URL = process.env.REACT_APP_SERVER + ':8082'

  const history = useHistory();
  const [searchInput, setSearchInput] = useState();
  const [searchResult, setSearchResult] = useState([]);


  const setInput = async (e) => {
    setSearchInput(e.target.value);
    const beerKosearch = await axios.get(`${SEARCH_URL}/v1/search/name?query=${e.target.value}`)
    setSearchResult(beerKosearch.data)
  }
  
  const eraseInput = (e) => {
    e.preventDefault()
    setSearchInput("");
  }

  const SearchSubmit = ((e)=> {
    e.preventDefault()
    console.log(searchInput)
    history.replace({pathname:"/search", searchInput:searchInput})
    // history.push(`/search?${searchInput}`)
  })
  // const fetchSearchResult = async () =>{
  //   const beerKosearch = await axios.get(`${SEARCH_URL}/v1/search/name?query=${searchInput}&lang=ko`)
  //   // const beerEnsearch = await axios.get(`${SEARCH_URL}/v1/search/name?query=${searchInput}&lang=en`)
  //   // const aromasearch = await axios.get(`${SEARCH_URL}/v1/search/aroma?query=${searchInput}`)
  //   // const flavorsearch = await axios.get(`${SEARCH_URL}/v1/search/flavor?query=${searchInput}`)
  //   // const typesearch = await axios.get(`${SEARCH_URL}/v1/search/type?query=${searchInput}`)
  //   // const usersearch = await axios.get(`${SEARCH_URL}/v1/search/user?query=${searchInput}`)
  //   console.log(beerKosearch)
  // }

  // useEffect( () => {
  //   if (searchInput) {fetchSearchResult()}
  // }, [searchInput])  





  useEffect( () => {
    EraseEffect()
  }, [])


  return(
    <>
    <form className="input" onSubmit={SearchSubmit}>
      <button type="submit" className="searchicon"><i className="fa fa-search"></i></button>
      <div className="text" id="dropdown">
        <input id="input" type="text" placeholder="검색..." onChange={setInput} autoComplete={"off"}/>
        
      </div>
      <div>
     
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
    <ListGroup style={{position:'relative'}}>
      {searchResult.length === 0 ? null : searchResult.map((result, i) =>
      <ListGroup.Item key={i}> {result.beer_name}</ListGroup.Item> 
      ) }
      
    </ListGroup>
    </>
  )
}

/* input 효과 */
/* npm i gsap@3.4.0 react-gsap*/
const { to, set } = gsap

function Delay(fn, ms) {
  let timer = 0
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(this, ...args), ms || 0)
  }
}

function EraseEffect() {
  document.querySelectorAll('.input').forEach( elem => {
    let clear = elem.querySelector('.clear'),
                input = elem.querySelector('input'),
                { classList } = elem,
                svgLine = clear.querySelector('.line'),
                svgLineProxy = new Proxy(
                  { x: null },
                  {
                    set(target, key, value) {
                      target[key] = value
                      if(target.x !== null) {
                        svgLine.setAttribute('d', GetPath(target.x, .1925))
                      }
                      return true
                    },
                    get(target, key) {
                      return target[key]
                    }
                  }
                )

    svgLineProxy.x = 0

    input.addEventListener('input', Delay(e => {
      let bool = input.value.length
      to(elem, {
        '--clear-scale': bool ? 1 : 0,
        duration: bool ? .5 : .15,
        ease: bool ? 'elastic.out(1, .7)' : 'none'
      })
      to(elem, {
        '--clear-opacity': bool ? 1 : 0,
        duration: .15
      })
    }, 250))

    clear.addEventListener('click', e => {
      classList.add('clearing')
      set(elem, {
        '--clear-swipe-left': (input.offsetWidth - 16) * -1 + 'px'
      })

      to(elem, {
        keyframes: [{
          '--clear-rotate': '45deg',
          duration: .25
        }, {
          '--clear-arrow-x': '2px',
          '--clear-arrow-y': '-2px',
          duration: .15
        }, {
          '--clear-arrow-x': '-3px',
          '--clear-arrow-y': '3px',
          '--clear-swipe': '-3px',
          duration: .15,
          onStart() {
            to(svgLineProxy, {
              x: 3,
              duration: .1,
              delay: .05
            })
          }
        }, {
          '--clear-swipe-x': 1,
          '--clear-x': (input.offsetWidth) * -1 + 'px',
          duration: .45,
          onComplete() {
            input.value = ''
            input.focus()
            to(elem, {
              '--clear-arrow-offset': '4px',
              '--clear-arrow-offset-second': '4px',
              '--clear-line-array': '8.5px',
              '--clear-line-offset': '27px',
              '--clear-long-offset': '24px',
              '--clear-rotate': '0deg',
              '--clear-arrow-o': 1,
              duration: 0,
              delay: .7,
              onStart() {
                classList.remove('clearing')
              }
            })
            to(elem, {
              '--clear-opacity': 0,
              duration: .2,
              delay: .55
            })
            to(elem, {
              '--clear-arrow-o': 0,
              '--clear-arrow-x': '0px',
              '--clear-arrow-y': '0px',
              '--clear-swipe': '0px',
              duration: .15
            })
            to(svgLineProxy, {
              x: 0,
              duration: .45,
              ease: 'elastic.out(1, .75)'
            })
          }
        }, {
          '--clear-swipe-x': 0,
          '--clear-x': '0px',
          duration: .4,
          delay: .35
        }]
      })

      to(elem, {
        '--clear-arrow-offset': '0px',
        '--clear-arrow-offset-second': '8px',
        '--clear-line-array': '28.5px',
        '--clear-line-offset': '57px',
        '--clear-long-offset': '17px',
        duration: .2
      })
    })

  })
}

function GetPoint(point, i, a, smoothing) {
  let cp = (current, previous, next, reverse) => {
    let p = previous || current,
        n = next || current,
        o = {
          length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
          angle: Math.atan2(n[1] - p[1], n[0] - p[0])
        },
        angle = o.angle + (reverse ? Math.PI : 0),
        length = o.length * smoothing;
    return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
  },
  cps = cp(a[i - 1], a[i - 2], point, false),
  cpe = cp(point, a[i - 1], a[i + 1], true);

  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function GetPath(x, smoothing) {
  return [
    [2, 2],
    [12 - x, 12 + x],
    [22, 22]
  ].reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${GetPoint(point, i, a, smoothing)}`, '')
}


export default SearchBar;