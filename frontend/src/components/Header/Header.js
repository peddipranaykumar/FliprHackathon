import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store';
import { Container, Nav, Button, Navbar } from "react-bootstrap";
import "./Header.css"

const Header = () => {

  const dispatch = useDispatch()

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const [value, setValue] = useState();

  // Check for login state in local storage or cookies and dispatch the appropriate action to update the state in Redux
  useEffect(() => {
    const loginState = localStorage.getItem('loginState');
    if (loginState === 'true') {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  // Save login state to local storage or cookies when it changes in Redux
  useEffect(() => {
    localStorage.setItem('loginState', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div>
            <h1 className='bg'>PODIFY</h1>

      <Navbar bg="dark" variant="dark" expand="lg">
        <Container className=''>
          <Navbar.Brand href="/"><h2>Podify</h2></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home"><h5>Home</h5></Nav.Link>
            <Nav.Link href="/fav"><h5>Favorites</h5></Nav.Link>
            <div className='px-5'></div>

            <div className='px-2'></div>
            <div className='signup'>
              {!isLoggedIn &&
                <Link to="/auth">
                  <Button variant="secondary">
                    Signup/Login
                  </Button>
                </Link>
              }

              {isLoggedIn &&
                <Button onClick={() => dispatch(authActions.logout())} variant="secondary">
                  LogOut
                </Button>
              }
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>


  )
}

export default Header
