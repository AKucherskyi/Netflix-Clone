import React, { useEffect, useState } from 'react';
import './Row.css';

function Row({title, fetchMovies, biggerSize}) {
const [movies, setMovies] = useState([])

useEffect(() => {
    fetchMovies()
    .then(data => setMovies(data))
},[])
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {movies.map((movie) => (
            <img
             key={movie.id}
             className="row__poster"
             style={biggerSize && {maxHeight : 350}}
             src={movie.image.original} 
             alt={movie.name}
             onClick = {() => window.location.assign(movie.url)} 
            />
          ))}
        </div>
      </div>
    );
}

export default Row
