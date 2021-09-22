import React, { useState, useEffect } from 'react'
import './Banner.css'

function Banner() {

    const [show, setShow] = useState({})

    const fetchShow = async () => {
        const id = Math.ceil(Math.random() * 50)
        let res = await fetch(`https://api.tvmaze.com/shows/${id}`)
        let data = await res.json()
        res = await fetch(`https://api.tvmaze.com/shows/${id}/images`)
        let dataBackground = await res.json()
        dataBackground = dataBackground.filter((item) => item.type == 'background')
        const background = dataBackground[0].resolutions.original.url
        data['background'] = background
        console.log(data)
        setShow(data)
    }

    useEffect(() => {
        fetchShow()        
    }, [])

    return (
        <div className='banner' style={{backgroundImage : `url(${show.background})`}}>
            <div className="banner__contents">
                <h1 className='banner__title'>{show.name}</h1>
                <div className="banner__buttons">
                    <button className='banner__button'>Play</button>
                    <button className='banner__button'>My List</button>
                </div>
                <div className="banner__description" dangerouslySetInnerHTML={{__html: show.summary}} />
            </div>

            <div className="banner--fadeBottom" />

        </div>
    )
}

export default Banner
