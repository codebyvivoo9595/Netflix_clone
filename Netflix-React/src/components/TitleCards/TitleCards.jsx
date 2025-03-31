import React, { useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'
import { useEffect } from 'react';
import { useState } from 'react';



const TitleCards = ({title,category}) => {

  const [apiData,setApiData]= useState([]);

  const cardsRef = useRef(); 

  // TMDB API Added
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTdhNDBhOWVlNWU2OWE0ODg3OGI3OWI1M2JhNjBhNCIsIm5iZiI6MTc0MzQyNzgzNS4wODQsInN1YiI6IjY3ZWE5OGZiNzAwYTZhOTRjNmU1OWJmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9xGG_JAtfxw0MXDCnhjIh_EKq4M0ubHPGgmJSSFpLAg'
    }
  };
  
  


  const handleWheel = (event)=> {
  event.preventDefault;
  cardsRef.current.scrollLeft += event.deltaY;
  }
  
  useEffect(()=>{

      //Every page refresh data will fetch from TMDB API
      fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));


      cardsRef.current.addEventListener('wheel',handleWheel);
    },[])


  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map(
          (card,index)=>{
           return <div className="card" key={index}>
            <img src={'https://image.tmdb.org/t/p/w500/'+ card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
           </div>
          }
        )}
        </div>
    </div>
    
  )
}

export default TitleCards