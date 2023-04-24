import React, { useState, useEffect } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Podcasts from '../Podcasts/Podcasts'
import { adminActions } from '../../store'
import { Button, Modal } from "react-bootstrap";

import './Admin.css';


const Admin = () => {


  const navigate = useNavigate();

  const isAdminLoggedIn = useSelector(state => state.admin.isAdminLoggedIn); // add selector for isAdminLoggedIn

  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    podcastName: "",
    podcastDescription: "",
    category: "",
    type: "",
    speaker: "",
    file: ""
  });


  const [loading, setLoading] = useState(false);


  const addPodcast = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/podcast/add`, {
        name: inputs.podcastName,
        description: inputs.podcastDescription,
        category: inputs.category,
        type: inputs.type,
        speaker: inputs.speaker,
        file: inputs.file
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // set loading state to false when function finishes running
    }
  };





  const sendRequest = async (type = "login") => {
    const res = await axios.post(`http://localhost:5000/admin/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err => console.log(err))

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

  const [video, setVideo] = useState("")


  const handleAdd = async () => {
    handleModalClose();
    setLoading(true); // set loading state to true
    try {
      const data = new FormData()
      data.append("file", video)
      data.append("upload_preset", "fliprweb")
      data.append("cloud_name", "dabvvbjsm")

      const res = await axios.post("https://api.cloudinary.com/v1_1/dabvvbjsm/video/upload", data)
      console.log(res)
      console.log(res.data.secure_url)
      inputs.file = res.data.secure_url
      await addPodcast()
      window.location.reload();
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then(() => dispatch(adminActions.login()))
        .then(() => navigate("/admin"))
        .then(data => console.log(data))
    }
    else {
      sendRequest()
        .then(() => dispatch(adminActions.login()))
        .then(() => navigate("/admin"))
        .then(data => console.log(data))
    }
  }

  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    // check if admin is logged in on page load
    const adminLoginState = localStorage.getItem('adminLoginState');
    if (adminLoginState === 'true') {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  useEffect(() => {
    // update localStorage when admin logs in or out
    localStorage.setItem('adminLoginState', isAdminLoggedIn);
  }, [isAdminLoggedIn]);





  return (
    <div className='container con'>
      <form onSubmit={handleSubmit} >
        {!isAdminLoggedIn &&
          <div className="box">
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
            </div>
          </div>
        }
      </form>
      {
        isAdminLoggedIn &&
        <>

          <Dialog
            onClose={handleModalClose}
            open={openModal}
          >
            <DialogTitle>Add New Podcast</DialogTitle>
            <DialogContent>
              <div className="input-field" >
                <input type="text" className="input-box"
                  name="podcastName"
                  onChange={handleChange}
                  value={inputs.podcastName}
                  required
                />
                <label htmlFor="logEmail">Name</label>
              </div>


              <div className="input-field" >
                <input type="text" className="input-box"
                  name="podcastDescription"
                  onChange={handleChange}
                  value={inputs.podcastDescription}
                  required
                />
                <label htmlFor="logEmail">Description</label>
              </div>


              <div className="input-field" >
                <input type="text" className="input-box"
                  name="category"
                  onChange={handleChange}
                  value={inputs.category}
                  required
                />
                <label htmlFor="logEmail">Category</label>
              </div>


              <div className="input-field" >
                <input type="text" className="input-box"
                  name="type"
                  onChange={handleChange}
                  value={inputs.type}
                  required
                />
                <label htmlFor="logEmail">Type (Video Only)</label>
              </div>


              <div className="input-field" >
                <input type="text" className="input-box"
                  name="speaker"
                  onChange={handleChange}
                  value={inputs.speaker}
                  required
                />
                <label htmlFor="logEmail">Speaker</label>
              </div>
              <input
                type="file"
                name="video"
                onChange={(e) => { setVideo(e.target.files[0]) }}
                required
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>
          <div className='w-100 d-block'>
            <Podcasts />
          </div>
          <div className='d-block mt-5 pt-5 head'>
            <Button onClick={handleModalOpen} variant='secondary'>
              Add Podcast
            </Button>
            {loading && (
              <Modal show={loading} backdrop="static" keyboard={false}>
                <Modal.Body>
                  <div className="text-center">
                    <h4>Adding podcast...</h4>
                  </div>
                </Modal.Body>
              </Modal>
            )}

            <Button
              onClick={() => dispatch(adminActions.logout())}
              LinkComponent={Link} to="/admin"
              variant='secondary'
            >
              LogOut
            </Button>
          </div>
        </>
      }
    </div>
  )
}

export default Admin;
