import React, { useState, useEffect } from 'react'
import './Banner.css'

function Banner() {

    const [show, setShow] = useState({})

    const fetchRandomShow = async () => {
        try {
        const id = Math.ceil(Math.random() * 100)
        let res = await fetch(`https://api.tvmaze.com/shows/${id}`)
        let data = await res.json()
        res = await fetch(`https://api.tvmaze.com/shows/${id}/images`)
        let dataBackground = await res.json()
        dataBackground = dataBackground.filter((item) => item.type == 'background')
        const background = dataBackground[0].resolutions.original.url
        data['background'] = background
        setShow(data)
        return res;
        } catch (e) {
            console.log(e)
            window.location.reload()
        }
        
    }

    useEffect(() => {
        fetchRandomShow()        
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
