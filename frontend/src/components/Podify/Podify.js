import React from 'react'
import "./Podify.css"
import { Container } from 'react-bootstrap'

const Podify = () => {
  return (
    <Container>
      <div className='podi' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='podify'>PODIFY</div>
        <div className='podif'>Podify: the coolest web app for podcast lovers! Sign up easily, find your favorite podcasts quickly, and enjoy our funky interface. Add new podcasts via the admin panel and mark favorites for easy access. Resuming where you left off is a snap, and our app is deployed on a cutting-edge cloud platform. Join the Podify party today!</div>
      </div>
    </Container>
  )
}

export default Podify