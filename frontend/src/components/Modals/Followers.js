import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/Modal.css"

const Followers = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const FOLLOWERS_URL = process.env.REACT_APP_SERVER + `:8080/v1/member/${1}/followers`
  const { open, close, header } = props;

  const [followers, setFollowers] = useState();


  useEffect(()=>{
    const fetchData = async () =>{
      const res = await axios.get(FOLLOWERS_URL)
      console.log(res.data)
      setFollowers(res.data)
    }
    fetchData()
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
export default Followers;
