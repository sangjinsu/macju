import {Link} from "react-router-dom"
import "../styles/PostList.css"

function PostListComponent(props){

  const postdata = props.postdata
  // console.log(postdata)

  return(
    <div className="row grid">

    {/* 포스트 카드 각각 */}
      { postdata&&postdata.map((post) =>
        <div className="col-md-6 col-lg-4 fadein" key={post.postId}>
          <div className="box">
            <div className="postlist_box">

            {/* {console.log(post)} */}
              {/* 포스트 이미지 */}
              <div className="img-box">
                {/* <img src={post.photo.data}></img> */}
                <img src="\img\5.0_오리지날_라거_medium_-removebg-preview.png"></img>
              </div>
              
              {/* 포스트 카드 내용 */}
              <div className="postdetail-box">
                {/* 포스트 내용 + 자세히 버튼 */}
                <div className="postdetail-title">
                  {/* <h5>{post.content}</h5> */}
                  <h5>{post.content && post.content.length > 15 ? post.content.substr(0, 15) + "....": post.content}</h5>
                  <Link to={`/post/${post.postId}`} className='detailBtn'>자세히</Link>
                </div>

                {/* 포스트 좋아요 */}
                <p className="fontaws"><i className="fas fa-heart" style={{color:"red"}}></i>{post.likes}</p>
                
                {/* 포스트 작성 정보 */}
                <p className="post-meta">
                  작성자 :{post.member.nickName} <br/> 
                  작성시간 : {post.updatedAt[0]}/{post.updatedAt[1]}/{post.updatedAt[2]}
                </p>
              </div>
            </div>
          </div>
        </div> 
      )}

    </div>
  )
}
export default PostListComponent;