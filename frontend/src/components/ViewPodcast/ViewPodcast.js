import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import "./ViewPodcast.css"



const ViewPodcast = () => {


  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let pod = (window.location.pathname.split('/')[1])
      let result = await axios.get(`http://localhost:5000/podcast/${pod}`)
      console.log("this",result);
      if (result.data.message === "No podcasts found") {
        setPodcasts(null)
      }
      else {
        setPodcasts(result.data.podcasts)
      }
    }
    fetchData();
  }, [])


  const [isPlaying, setIsPlaying] = useState(false);
  const [showSoundBar, setShowSoundBar] = useState(false);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);


  const handlePlayPause = () => {
    if (videoRef.current && typeof videoRef.current.play === 'function') {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
    }
  };

  const handleShowSoundBar = () => {
    setShowSoundBar(!showSoundBar);
  };


  return (
    <>
      <div className='vid'>
        <video ref={videoRef} src={podcasts.file} type="" />
        <h1 className='title'>{podcasts.name}</h1>
        
        <button onClick={handlePlayPause}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="white" className="bi bi-pause" viewBox="0 0 16 16">
              <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="white" className="bi bi-play" viewBox="0 0 16 16">
              <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
            </svg>
          )}
        </button>
        
        <button onClick={handleShowSoundBar}>
          {volume == 0 ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="white" class="bi bi-volume-mute" viewBox="0 0 16 16">
              <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="white" class="bi bi-volume-up" viewBox="0 0 16 16">
              <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
              <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
              <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z" />
            </svg>
          )
          }
        </button>
        {showSoundBar && (
          <div className="sound-bar-container">
            <input
              className="form-range"
              type="range"
              id='customRange1'
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        )}
        <br />
        <br />
        <h6 className='title des'>Speaker: {podcasts.speaker}</h6>
        <h6 className='title des'>Description: {podcasts.description}</h6>
      </div>
    </>

  )
}

export default ViewPodcast
