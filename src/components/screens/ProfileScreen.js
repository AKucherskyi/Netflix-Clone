import React, { useEffect, useState } from 'react'
import { auth, fetchUser, getLikes, logout } from '../../firebase'
import { fetchById } from '../../movies'
import Header from '../Header'
import "./ProfileScreen.css"
import Footer from '../Footer'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router'
import Likes from '../Likes'

function ProfileScreen() {
    const [user, loading, error] = useAuthState(auth)
    const [movies, setMovies] = useState([])
    const history = useHistory()
    const [sortBy, setSortBy] = useState('name')

    const fetchFavorites = async () => {
        const userDb = await fetchUser(user)
        const data = await fetchById(userDb.favorites)
        data.forEach(async (movie) => {
            movie.likes =await getLikes(movie.id)
        })
        console.log(data)
        setMovies(data)
    }

    const sortMovies = () => {
        let sortedMovies = []
        switch (sortBy) {
          case "name":
            sortedMovies = [...movies]
            sortedMovies.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase())
                return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
              return 0;
            });
            setMovies(sortedMovies);
            break;
          case "likes":
            sortedMovies = [...movies]
            sortedMovies.sort((a, b) => b.likes - a.likes);
            setMovies(sortedMovies);
            break;
          case "rating":
            sortedMovies = [...movies]
            sortedMovies.sort((a, b) => b.rating.average - a.rating.average)
            setMovies(sortedMovies);
              break;
              case "premiere_date":
            sortedMovies = [...movies]
            sortedMovies.sort((a, b) => {
                if (a.premiered > b.premiered) 
                  return 1;
                if (a.premiered < b.premiered)
                  return -1;
                return 0;
              })
            setMovies(sortedMovies);
              break;
        }
    }

useEffect(() => {
    if (loading) return;
    fetchFavorites()
    sortMovies()
}, [user])

useEffect(() => {
    sortMovies()
}, [sortBy])

    return (
      <div className="profileScreen">
        <Header buttonName="Logout" handleButton={logout} />
        <div className="favorites">
          <h2>Favorites</h2>
          <span>Sort by: </span>
          <select
            value={sortBy}
            onChange={({ target }) => setSortBy(target.value)}
          >
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="likes">Likes</option>
            <option value="premiere_date">Premiere date</option>
          </select>
          <div className="row__posters">
            {movies.map((movie) => (
              <div className="row__poster" key={movie.id + 1000}>
                <img
                  key={movie.id}
                  className="row__posterImg"
                  src={movie.image.original}
                  alt={movie.name}
                  onClick={() => {
                    history.push(`/movie/${movie.id}`);
                  }}
                />
                <Likes id={movie.id} />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default ProfileScreen
