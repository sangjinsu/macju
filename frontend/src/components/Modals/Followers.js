import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/Modal.css"
import {useStore} from 'react-redux'
import axiosInstance from "CustomAxios";
const Followers = (props) => {
  const { open, close, header, person } = props;
  const memberNum = useParams();
  const memberId = memberNum.userid
  const FOLLOWERS_URL = process.env.REACT_APP_SERVER + `:8888/v1/member/${memberId}/followers`
  const [followers, setFollowers] = useState();
  const fetchData = async () =>{
    const res = await axiosInstance.get(FOLLOWERS_URL)
    setFollowers(res.data.data)
  }
  useEffect(()=>{
    fetchData();
  }, [person, memberId])
  return (
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
          {followers.length === 0 ? <p>아직 팔로워가 없습니다.</p>: followers.map((person, idx)=>
          <div key={idx}>{parseInt(person.memberId)=== parseInt(memberId) ? <p>아직 팔로워가 없습니다.</p> : 
            <>
            {person.nickName}
            <Link to={`/profile/${person.memberId}/post`}><button onClick={close} style={{marginLeft:10}} role={'button'} id="profilebtn"> 이동</button></Link>
            </>
          
          }
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
export default Followers;
