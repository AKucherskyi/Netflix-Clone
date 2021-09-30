import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Header from '../Header'
import Search from '../Search'
import "./SearchScreen.css"
import { fetchSearched } from "../../movies"
import Footer from '../Footer'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function SearchScreen() {
    const [movies, setMovies] = useState([])
    const query = useQuery()
    const history = useHistory()

    useEffect(() => {
        const searchValue = query.get("value")
        fetchSearched(searchValue)
        .then(data => setMovies(data))

    }, [query])


    return (
      <div className="searchScreen">
        <Header buttonName="Profile" handleButton={() => history.push("/profile")}/>
        <Search />
        <div className="searchScreen__results">
          <h1>Search results</h1>
          {movies.map((movie) => (
            <div
              className="searchScreen__result"
              onClick={() => {
                history.push(`/movie/${movie.show.id}`);
              }}
            >
              <img
                className="searchScreen__img"
                key={movie.show.id}
                src={movie.show.image?.original}
                onClick={() => {
                  history.push(`/movie/${movie.id}`);
                }}
              />
              <div className="searchScreen__summary">
                <h3>{movie.show.name}</h3>
                <p dangerouslySetInnerHTML={{ __html: movie.show.summary }} />
                <h4>
                  {movie.show.rating?.average && "Rating:"}{" "}
                  {movie.show.rating.average}
                </h4>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
}

export default SearchScreen
