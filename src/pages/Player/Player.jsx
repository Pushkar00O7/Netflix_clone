import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiDate,satApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    type:"",

  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjYyNDZkMWE1MTFjZjM2MjdhOGUxMWQxYzRmMDE4YSIsIm5iZiI6MTczMDI4MjE4MS43Nzk4MDAyLCJzdWIiOiI2NzIyMDEwY2MzZjY1YTkzYTQ0ZmVhNzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6SNhaV8lrHNuK-wHA1Yb2KX7F1aVzCsX6zbqvUD07Vk'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => satApiData(res.results[0]))
    .catch(err => console.error(err));

  },[id]);
  

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}} />
      <iframe width='90%' height='90%'src={`https://www.youtube.com/embed/${apiDate.key}`}
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiDate.published_at?.slice(0,10)}</p>
        <p>{apiDate.name}</p>
        <p>{apiDate.type}</p>
      </div>
    </div>
  )
}

export default Player
