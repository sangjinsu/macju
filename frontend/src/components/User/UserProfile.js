import "../../styles/UserProfile.css"
import { useEffect, useState } from "react";
import Followers from "components/Modals/Followers.js"
import Followings from "components/Modals/Followings.js"
import { Link } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import UserIcon from "./UserIcon";
import axiosInstance from "CustomAxios";
const UserProfile = (props) => {

	const store = useStore((state)=>state)
	const dispatch = useDispatch();
	const userid = props.state


	const USER_PROFILE_URL = process.env.REACT_APP_SERVER + `:8888/v1/member/profile/${userid}`
	const FOLLOW_POST_URL = process.env.REACT_APP_SERVER + `:8888/v1/member/${store.getState().userReducer.memberId}/follow/${userid}`
	const FOLLOW_GET_URL = process.env.REACT_APP_SERVER + `:8888/v1/member/${userid}/followings`
	const FOLLOWING_GET_URL = process.env.REACT_APP_SERVER + `:8888/v1/member/${userid}/followers`

 	const [user, setUser] = useState('')
	const [followButton, setFollowButton] = useState(true)
	
	
	const setFollow = async () =>{
		const btn = document.getElementById('followbtn')
		btn.disabled = true
		await axiosInstance.post(FOLLOW_POST_URL)
		.then((res)=>{
			btn.disabled =false
			if (res.data === 'follow'){
				setFollowButton(false)
			} else {
				setFollowButton(true)
			}
		})
		const profiledata = await axiosInstance.get(`${USER_PROFILE_URL}`)
		setUser(profiledata.data)		
	}


	useEffect(()=>{
		const fetchData = async () =>{
			const res = await axiosInstance.get(FOLLOWING_GET_URL)
			res.data.data.map((person, i) =>{
				if (parseInt(store.getState().userReducer.memberId) === parseInt(person.memberId)){
					setFollowButton(false)
				} 
			})
			
			dispatch({type:'followers', followers:res.data.data})
		}
		fetchData()
	}, [])

	useEffect(()=>{
		const fetchData = async () =>{
			const res = await axiosInstance.get(FOLLOW_GET_URL)			
			dispatch({type:'followings', followings:res.data.data})
		}
		fetchData();
	}, [])


	useEffect(() =>{
		const fetchData = async () => {
			const profiledata = await axiosInstance.get(`${USER_PROFILE_URL}`)
			setUser(profiledata.data)
		}
		fetchData();
	},[store, userid])


  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingsModalOpen, setFollowingsModalOpen] = useState(false);
  const followersOpenModal = () => {
    setFollowersModalOpen(true);
  };
  const followersCloseModal = () => {
    setFollowersModalOpen(false);
  };
  const followingsOpenModal = () => {
    setFollowingsModalOpen(true);
  };
  const followingsCloseModal = () => {
    setFollowingsModalOpen(false);
  };
	

  return (
		<div className="userprofile_container">
			{user && 
				<div className="user-profile ">
					<div className="img-box">

						<div className="profile-image-box">
							<UserIcon className="usericon" role={'button'} grade={user.grade} />					
						</div>
					</div>
					<div id="profile-box">
						<div id="nickname">
							<h1>{user.nickName}</h1>
							<Link to={{
								pathname : `/profile/edit`,
								state : userid
								}} >
								<div className="editBtn"><i className="fas fa-user-edit fa-lg"></i></div>
							</Link>
						</div>	
						<div>
							<div className="follow_all">
								<div className="follower">
									<button className="followerBtn" onClick={followersOpenModal} variant="success">팔로워</button>
									<span className="followCtn">{user.followers.length}</span>
								</div>
								<div className="following">
									<button className="followerBtn" onClick={followingsOpenModal} variant="warning"> 팔로잉</button>
									<span className="followCtn">{user.followings.length}</span>
								</div>
							</div>
							<Followers open={followersModalOpen} close={followersCloseModal} header="팔로워">
								followers
							</Followers>
							<Followings open={followingsModalOpen} close={followingsCloseModal} header="팔로잉">
								followings
							</Followings>
							
							<p className="user_intro">{user.intro ? user.intro : null }</p>		
						</div>
						{Number(userid) === Number(store.getState().userReducer.memberId) ? null 
						: <button id="followbtn" variant={followButton ? "primary":"secondary"}  onClick={setFollow}>
								{followButton ? '팔로우':'언팔로우'}
							</button>
						}
					</div>
				</div>
			}
		</div>

  )
}


export default UserProfile;
