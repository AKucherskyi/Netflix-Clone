import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { fetchRandom } from '../movies'
import './Banner.css'

function Banner() {
    const history = useHistory()
    const [movie, setMovie] = useState({})


    useEffect(() => {
        fetchRandom()
        .then(data => setMovie(data))        
    }, [])

    return (
        <div className='banner' style={{backgroundImage : `url(${movie.background})`}}>
            <div className="banner__contents">
                <h1 className='banner__title'>{movie.name}</h1>
                <div className="banner__buttons">
                    <button className='banner__button' onClick = {() => {history.push(`/movie/${movie.id}`)}}>Play</button>
                    <button className='banner__button' onClick = {() => {history.push(`/profile`)}}>My List</button>
                </div>
                <div className="banner__description" dangerouslySetInnerHTML={{__html: movie.summary}} />
            </div>

            <div className="banner--fadeBottom" />

        </div>
    )
}

export default Banner
