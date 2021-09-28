import React, {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router'
import { auth, fetchUser } from '../../firebase'
import Footer from '../Footer'
import Header from '../Header'
import Likes from '../Likes'
import Search from '../Search'
import './MovieScreen.css'

function MovieScreen({match : {params: {id}}}) {
    const history = useHistory()
    const [movie, setMovie] = useState({})
    const [user] = useAuthState(auth);
    const [liked, setLiked] = useState(false)
    const [favorite, setFavorite] = useState(false)

    const fetchMovie = async (id) => {
        const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
        const data = await res.json()
        setMovie(data)
        return data;
    }

    useEffect(() => {
       fetchMovie(id) 
       window.scrollTo(0, 0)
       fetchUser(user)
       .then(user => {
         console.log(user?.liked)
         })

    }, [])
 
    return (
      <div className="movieScreen">
        <Header
          buttonName="Profile"
          handleButton={() => history.push("/profile")}
        />
        <Search />
        <div className="movieScreen__container">
          <h1>{movie.name}</h1>
          <div className="movieScreen__description">
            <div>
              <img
                className="movieScreen__poster"
                src={movie.image?.original}
                alt={movie.name}
              />
              <Likes id = {id} />
            </div>

            <div className="movieScreen__summary">
              <p dangerouslySetInnerHTML={{ __html: movie.summary }} />
              <h4>{ movie.rating?.average && 'Rating:' } {movie.rating?.average}</h4>
              <button className="movieScreen__button">Like</button>
              <button className="movieScreen__button">Favorite</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default MovieScreen
