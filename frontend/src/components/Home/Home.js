import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Auth from '../Auth/Auth';

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null); // new state variable

  const userEmail = localStorage.getItem('email');

  const sendRequest = async (email) => { // modified sendRequest function
    try {
      const res = await axios.get(`http://localhost:5000/user/${email}`);
      const data = await res.data;
      if (data && data.user) {
        return data.user;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fav = async (podcast) => {
    try {
      const res = await axios.post(`http://localhost:5000/user/fav`, {
        name: podcast.name,
        email: localStorage.getItem('email')
      });
      console.log(res.data.message);
      if (user !== null) {
        const updatedUser = { ...user };
        updatedUser.favorites.push(podcast.name);
        setUser(updatedUser);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const removefav = async (podcast) => {
    try {
      const res = await axios.delete('http://localhost:5000/user/removefav', {
        data: {
          name: podcast.name,
          email: localStorage.getItem('email')
        }
      });
      console.log(res.data);
      if (user !== null) {
        const updatedUser = { ...user };
        updatedUser.favorites = updatedUser.favorites.filter((fav) => fav !== podcast.name);
        setUser(updatedUser);
      }
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    sendRequest(userEmail).then((data) => setUser(data)); // fetch user details on mount
  }, [userEmail]); // re-fetch user details if userEmail changes

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/podcast/');
        const data = await res.data;
        if (data && data.podcasts) {
          setPodcasts(data.podcasts);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPodcasts();
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const filteredList = podcasts.filter((podcast) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      podcast.name.toLowerCase().includes(searchTerm) ||
      podcast.description.toLowerCase().includes(searchTerm) ||
      podcast.category.toLowerCase().includes(searchTerm) ||
      podcast.type.toLowerCase().includes(searchTerm) ||
      podcast.speaker.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <>
      {isLoggedIn && (
        <>
          <Container>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="px-2"></div>
            <Button className="mt-2" variant="secondary">
              Search
            </Button>
          </Container>

          <Container className="head" style={{ paddingTop: '50px', paddingLeft: '50px' }}>
            <h1>Popular Podcasts:</h1>
          </Container>
        </>
      )}

      {isLoggedIn && (
        <Container style={{ paddingTop: '70px' }}>
          <Row className="w-100">
            {filteredList.map((podcast) => {
              const isFavorited = (user && user.favorites.includes(podcast.name));
              console.log("this is ", (podcast.name), isFavorited);
              return (
                <Col md={4} key={podcast.id}>
                  <div className="px-5 pod">
                    <Link to={`/${podcast.name}`} style={{ textDecoration: 'none' }}>
                      <Card>
                        <Card.Body>
                          <Card.Title>{podcast.name}</Card.Title>
                          <Card.Text>{podcast.speaker}</Card.Text>
                          <div className="d-flex justify-content-between">
                            <Button className='fav'
                              onClick={(event) => {
                                event.preventDefault();
                                if (isFavorited) {
                                  removefav(podcast);
                                } else {
                                  fav(podcast);
                                }
                              }}
                              variant="secondary"
                            >
                              {isFavorited ? (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                  </svg>
                                </>
                              )}
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                </Col>
              );
            })}

          </Row>
        </Container>
      )}
      {!isLoggedIn && <Auth />}
    </>
  );
};

export default Podcasts;
