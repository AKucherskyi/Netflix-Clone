import React, { useEffect } from 'react'
import { logout } from '../../firebase'
import movies from '../../movies'
import Header from '../Header'
import "./ProfileScreen.css"
import Row from '../Row'
import Footer from '../Footer'

function ProfileScreen() {
    
useEffect(() => {
    window.scrollTo(0, 0)
})

    return (
        <div className="profileScreen">
            <Header buttonName="Logout" handleButton={logout} />
            <div className="favorites">
                <Row title='My favorites' fetchMovies={movies.fetchTopRated} />
            </div>
            <Footer />
        </div>
    )
}

export default ProfileScreen
