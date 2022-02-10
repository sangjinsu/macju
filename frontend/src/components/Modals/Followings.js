import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/Modal.css"
import {useStore} from 'react-redux'

const Followings = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;


  const FOLLOWINGS_URL = process.env.REACT_APP_SERVER + `:8080/v1/member/${1}/followings`

  const store = useStore((state) => state)
  const [followings, setFollowings] = useState();
  const fetchData = async () =>{
    const res = await axios.get(FOLLOWINGS_URL)
    setFollowings(res.data.data)
  }

  useEffect(()=>{
    if (store.getState().followingsReducer.length === 0) {
      fetchData()
    } else {
      setFollowings(store.getState().followingsReducer)
    }
    
  }, [])
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>
          {followings.length === 0 ? <p>아직 팔로워가 없습니다.</p>: followings.map((person, idx)=>
          //{memberId, nickName, name, comment, age, grade}
          <div key={idx}>{person.nickName}
          <Link to={`/profile/${person.memberId}/post`}><Button> 프로필 페이지로 이동</Button></Link>
          
          </div>
          )}
          </main>
          <footer>
            <button className="close" onClick={close}>
              {' '}
              close{' '}
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Followings;
