import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getLikes } from '../firebase';
import Likes from './Likes';
import './Row.css';

function Row({title, fetchMovies, biggerSize}) {
const [movies, setMovies] = useState([])
const history = useHistory()

useEffect(() => {
    fetchMovies()
    .then(data => setMovies(data))
},[])

    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {movies.map((movie) => (
            <div className="row__poster">
            <img
             key={movie.id}
             className="row__posterImg"
             style={biggerSize && {maxHeight : 350}}
             src={movie.image.original} 
             alt={movie.name}
             onClick = {() => {history.push(`/movie/${movie.id}`)}} 
            />
            {/* <Likes id ={movie.id} /> */}
            </div>
            
          ))}
        </div>
      </div>
    );
}

export default Row
