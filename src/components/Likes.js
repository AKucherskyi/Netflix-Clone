import React, {useEffect, useState} from 'react'
import { getLikes } from '../firebase'
import "./Likes.css"

function Likes({id}) {
    const [likes, setLikes] = useState([])

    useEffect(() => {
        getLikes(id)
        .then(likes => setLikes(likes))
    },[])

    return (
        <div className="likes">{likes} &#10084;</div>
    )
}

export default Likes
