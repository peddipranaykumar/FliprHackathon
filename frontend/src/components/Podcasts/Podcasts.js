import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Podcasts.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);

  const sendRequest = async () => {
    try {
      const res = await axios.get('http://localhost:5000/podcast/');
      const data = await res.data;
      if (data && data.podcasts) {
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (podcast) => {
    try {
      const res = await axios.delete("http://localhost:5000/podcast/remove", {
        data: podcast,
      });
      console.log(res);
      window.location.reload();

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    sendRequest().then((data) => setPodcasts(data.podcasts));
  }, []);


  return (
    <Container style={{ paddingTop: '150px' }}>
      <Row>
        {podcasts.map((podcast) => (
          < Col >
            <div className='px-5 pod'>
              <Link to={`/${podcast.name}`} style={{ textDecoration: 'none' }} className='pod'>
                <Card>
                  <Card.Body>
                    <Card.Title>{podcast.name}</Card.Title>
                    <Card.Text>{podcast.description}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button onClick={(event) => {event.preventDefault(); remove(podcast)}} variant="secondary">Remove</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </Container >
  );
};

export default Podcasts;
