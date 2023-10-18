import React from 'react'
//import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfileCard = ({location}) => {

  const {user}=useSelector((state)=>state.AuthReducer.authData)
  const posts=useSelector((state=>state.postReducer.posts))
  console.log(posts)
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={user.CoverPicture?serverPublic+user.CoverPicture:serverPublic+"defaultCover.jpg"} alt="" />
        <img src={user.profilePicture?serverPublic+user.profilePicture:serverPublic+"defaultProfile.png"} alt="" />
      </div>

      <div className="ProfileName">
        <span>{user.firstname}  {user.lastname}</span>
        <span>{user.worksAt?user.worksAt:"Write about Yourself"} </span>
      </div>

      <div className="FollowStatus">
        <hr />
        <div>
            <div className="follow">
                <span>{user.following.length}</span>
                <span>Following</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
                <span>{user.followers.length}</span>
                <span>Followers</span>
            </div>
            {
              location==='profilePage'&&(
                <>
                <div className="vl"></div>
                <div className="follow">
                  <span>{posts.filter((post)=>post.userid===user._id).length}</span>
                  <span>Posts</span>
                </div>
                </>
              )
            }
        </div>
        <hr />
      </div>
      {location==='profilePage'?'':
      
        <span>
          <Link style={{textDecoration:'none' ,color:'inherit'}} to={`/profile/${user._id}`}>
          My Profile
          </Link>
            
        </span>
      }
    </div>
  )
}

export default ProfileCard
