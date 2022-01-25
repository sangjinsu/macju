import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import IsoTopeGrid from "react-isotope";
import {Button, Card, Col, Container, Row} from "react-bootstrap"
import "../../styles/postIndex.css"
import "../../styles/test.css"
import filtersDefault from "./filters.json";
import axios from "axios"

// isotope 쓸 때는 id 값이 a~z 값이어야함
function test() {
  const [posts, setposts] = useState()
  const [filters, updateFilters] = useState(filtersDefault);
  useEffect(async ()=>{
    //api : http://localhost:3000/v1/post
      const json = await axios.get("http://localhost:3000/data/postData.json")
      setposts(json.data)
    }, []
  )


  // Filter change handler
  const onFilter = event => {
    const {
      target: { value, checked }
    } = event;

    updateFilters(state =>
      state.map(f => {
        if (f.label === value) {
          return {
            ...f,
            isChecked: checked
          };
        }

        return f;
      })
    );
  };

  return (
    <>
      {filters.map(f => (
        <button className={f.isChecked ? "active":"inactive"} key={`${f.label}_key`}>          <input
            id={f.label}
            type="checkbox"
            value={f.label}
            onChange={onFilter}
            checked={f.isChecked}
          />
          <label htmlFor={f.label}>{f.label}</label>
        </button>
      ))}


      <div className="container">
        {posts&&
        <IsoTopeGrid
          gridLayout={posts} // gridlayout of cards
          noOfCols={4} // number of columns show in one row
          unitWidth={300} // card width of 1 unit
          unitHeight={500} // card height of 1 unit
          filters={filters} // list of selected filters
        >
          {posts.map(post => (
        
            <Card key={post.id} className={post.filter[0]}>
              <Card.Img variant="top" src={post.img} width={300}/>
              <Card.Body>
                <Card.Text>
                {post.post&&post.post.length > 15 ? post.post.substr(0, 15) + "....": post.post}
                </Card.Text>
                <p className="fontaws"><i className="fas fa-heart" style={{color:"red"}}></i>{post.likes}</p>
                <p className="post-meta">작성한 사람 :{null} 작성 시간{post.created_at}</p>
                <Link to={`/post/${post.postId}`}><Button variant="secondary">Detail</Button></Link>
              </Card.Body>
            </Card>
          ))}
        </IsoTopeGrid>
        }

      </div>
    </>
  );
}
export default test;