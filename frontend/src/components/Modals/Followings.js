import { useState } from "react";
import { useEffect } from "react";
import { Link,useLocation,useParams } from "react-router-dom";
import "../../styles/Modal.css"
import {useStore} from 'react-redux'
import axiosInstance from "CustomAxios";


const Followings = (props) => {
  const { open, close, header, person } = props;
  const memberNum = useParams();
  const memberId = memberNum.userid
  const FOLLOWINGS_URL = process.env.REACT_APP_SERVER + `:8888/v1/member/${memberId}/followings`
  const [followings, setFollowings] = useState();
  useEffect(()=>{
    fetchData();
  }, [person])
  const fetchData = async () =>{
    const res = await axiosInstance.get(FOLLOWINGS_URL)
    setFollowings(res.data.data)
  }

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
          {followings.length === 0 ? <p>아직 팔로잉 하는 사람이 없습니다.</p> : followings.map((person, idx)=>
          <div key={idx}>{person.nickName}
          <Link to={`/profile/${person.memberId}/post`}><button onClick={close} style={{marginLeft:10}} role={'button'} id="profilebtn"> 이동</button></Link>
          
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
