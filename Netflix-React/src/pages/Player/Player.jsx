import React from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'

const Player = ()=> {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData,setApiData] =useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTdhNDBhOWVlNWU2OWE0ODg3OGI3OWI1M2JhNjBhNCIsIm5iZiI6MTc0MzQyNzgzNS4wODQsInN1YiI6IjY3ZWE5OGZiNzAwYTZhOTRjNmU1OWJmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9xGG_JAtfxw0MXDCnhjIh_EKq4M0ubHPGgmJSSFpLAg'
    }
  };
  

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));

  },[])
 


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  )
}

export default Player