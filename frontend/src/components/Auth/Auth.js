import React, { useState } from 'react'
import { Button } from "react-bootstrap";
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css';
import { authActions } from '../../store';

const Auth = () => {

  const navigate = useNavigate();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // access the isLoggedIn state from the auth slice

  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    name: "", email: "", password: ""
  });

  const sendRequest = async (type = "login") => {
    const res = axios.post(`http://localhost:5000/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err => console.log(err))

    if(type==="login")
    alert("Login succefully");
    else
    alert("New account created succefully");

    localStorage.setItem('email', inputs.email);
    const data = await res.data
    return data;
  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const [isSignup, setIsSignup] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/home"))
        .then(data => console.log(data))
    }
    else {
      sendRequest()
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/home"))
        .then(data => console.log(data))
    }
  }

  return (
    <div className="container">
      <div className="box">
        {!isLoggedIn && <form onSubmit={handleSubmit} >
          <div className='box-login'>

            <div className="top-header">
              <h3>{isSignup ? "Signup" : "Login"}</h3>
              <small>We are happy to have you back.</small>
            </div>

            {isSignup &&
              <div className="input-field">
                <input name="name" onChange={handleChange} value={inputs.name} type="text" className="input-box" required />
                <label htmlFor="logEmail">Name</label>
              </div>
            }

            <div className="input-field">
              <input name="email" onChange={handleChange} value={inputs.email} type="text" className="input-box" id="logEmail" required />
              <label htmlFor="logEmail">Email address</label>
            </div>
            <div className="input-field">
              <input name="password" onChange={handleChange} value={inputs.password} type="password" className="input-box" id="logPassword" required />
              <label htmlFor="logPassword">Password</label>
            </div>

            <Button variant="secondary" className='submit' type='submit'  >Submit</Button>
            <div className="forgot" onClick={() => setIsSignup(!isSignup)} variant="contained" color="warning" >
              <Link>
                Change to {isSignup ? "Login" : "SignUp"}
              </Link>
            </div>

            <div className="forgot">
              <Link to="/admin" target="_blank">Login for Admin</Link>
            </div>



          </div>
        </form>
        }
        {isLoggedIn &&
          <div>
            You are succefully logged in
          </div>
        }
      </div>
    </div>
  )
}

export default Auth