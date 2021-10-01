import React, {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router'
import { auth, decLikes, fetchUser, getLikes, incLikes, updateUser } from '../../firebase'
import Footer from '../Footer'
import Header from '../Header'
import Search from '../Search'
import './MovieScreen.css'

function MovieScreen({match : {params: {id}}}) {
    const history = useHistory()
    const [movie, setMovie] = useState({})
    const [user, loading] = useAuthState(auth);
    const [like, setLike] = useState(false)
    const [likes, setLikes] = useState('')
    const [favorite, setFavorite] = useState(false)

    const handleFavorite = async () => {
      setFavorite(!favorite)
      let userDb = await fetchUser(user)
      if (!userDb.favorites.includes(+id)) {
        userDb.favorites.push(+id)
      } else {
        const index = userDb.favorites.indexOf(+id)
        userDb.favorites.splice(index, 1)
      }
      await updateUser(user?.uid, {favorites : userDb.favorites})
    }

    const handleLiked = async () => {
      setLike(!like)
      let userDb = await fetchUser(user)
      if (!userDb.liked.includes(+id)) {
        userDb.liked.push(+id)
        incLikes(+id)
        setLikes(likes + 1)
      } else {
        const index = userDb.liked.indexOf(+id)
        userDb.liked.splice(index, 1)
        decLikes(+id)
        setLikes(likes - 1)
      }
      await updateUser(user?.uid, {liked : userDb.liked})
    }

    const fetchMovie = async (id) => {
        const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
        const data = await res.json()
        setMovie(data)
        return data;
    }

    useEffect(() => {
      if (loading) return;
      fetchMovie(id);
      window.scrollTo(0, 0);
      fetchUser(user).then((user) => {
        if (user.liked.includes(+id)) {
          setLike(true);
        }
        if (user.favorites.includes(+id)) {
          setFavorite(true);
        }
      });
      getLikes(id)
      .then((likes) => setLikes(likes));
    }, [user]);
 
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
              <div className="movieScreen__likes">{likes} &#10084;</div>
            </div>
            <div className="movieScreen__summary">
              <p dangerouslySetInnerHTML={{ __html: movie.summary }} />
              <h4>
                {movie.rating?.average && "Rating:"} {movie.rating?.average}
              </h4>
              <div className="movieScreen__genres">
                <h4>Genres:</h4>
                <div>
                  {movie.genres?.map((genre) => (
                    <span key={genre}>
                      {" "}
                      {genre} <br />{" "}
                    </span>
                  ))}
                </div>
                <h4>&nbsp; &nbsp; Premiered: </h4>
                <div>{movie.premiered}</div>
              </div>
              <button
                className={`movieScreen__button ${like && "movieScreen__button-active"}`}
                onClick={handleLiked}
              >Like</button>
              <button
                className={`movieScreen__button ${favorite && "movieScreen__button-active"}`}
                onClick={handleFavorite}
              >Favorite</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default MovieScreen
