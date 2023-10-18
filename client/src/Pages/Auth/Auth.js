import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import {useDispatch, useSelector} from 'react-redux'
import { logIn ,SignUp} from "../../actions/AuthAction";

const Auth = () => {
  const [isSign, setIsSign] = useState(true);
  const loading=useSelector((state)=>state.AuthReducer.loading)
  const[data,setData]=useState({firstname:"",lastname:'',username:"",password:'',confirmpass:''})
  const[confirm,setConfirm]=useState(true)
  const dispatch=useDispatch()

  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(isSign)
    {
        if(data.password===data.confirmpass)
        {
            dispatch(SignUp(data))
        }
        else{
          setConfirm(false)
        }
    }else{
      dispatch(logIn(data))
    }
  }

  const resetForm=()=>{
    setData({firstname:"",lastname:'',username:"",password:'',confirmpass:''})
    setConfirm(true)
  }
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="webName">
          <h1>ARK Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* Right Side Section  */}
      <div className="a-right">
        <form className="infoForm authForm " onSubmit={handleSubmit}>
          <h1>{isSign?"Sign Up":"Log In"}</h1>
          {isSign && (
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                className="infoInput"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                className="infoInput"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              name="username"
              placeholder="Usernames"
              className="infoInput"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="infoInput"
              onChange={handleChange}
              value={data.password}
            />
            {isSign &&(
              <input
                type="text"
                name="confirmpass"
                placeholder="Confirm Password"
                className="infoInput"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
        <span style={{color:"red",display:confirm?"none":"block",fontSize:"12px",marginRight:"5px",alignSelf:"flex-end"}}> * Confirm password is not matched</span>
          <div>
            <span onClick={() => {setIsSign((isSign) => !isSign);resetForm()}} style={{fontSize:"12px",cursor:"pointer"}}>
              {isSign
                ? "Already have account? Login!"
                : "Don't have an account? Register"}
            </span>
          </div>
    
            <button className="button info-button" type="submit" disabled={loading}>
              {loading?"loading":isSign?"Signup":"Log In"}
            </button>

        </form>
      </div>
    </div>
  );
};

export default Auth;
