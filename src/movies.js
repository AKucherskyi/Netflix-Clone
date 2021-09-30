async function fetchFirstTenMovies() {
    let movies = []
    for (let i = 0; i < 10; i++) {
        const res = await fetch(`https://api.tvmaze.com/shows/${i+1}`)
        const data = await res.json()
        movies.push(data)
    }
    return movies
}


const fetchRandom = async () => {
    try {
    const id = Math.ceil(Math.random() * 100)
    let res = await fetch(`https://api.tvmaze.com/shows/${id}`)
    let data = await res.json()
    res = await fetch(`https://api.tvmaze.com/shows/${id}/images`)
    let dataBackground = await res.json()
    dataBackground = dataBackground.filter((item) => item.type === 'background')
    const background = dataBackground[0].resolutions.original.url
    data['background'] = background
    return data;
    } catch (e) {
        console.log(e)
        window.location.reload()
    }
}

async function fetchTopRated() {
    const res = await fetch(`https://api.tvmaze.com/shows`)
    const data = await res.json()
    return data.filter((movie) => movie.rating.average > 8.5).slice(0, 15)
}

async function fetchByGenre (genre) {
    const res = await fetch(`https://api.tvmaze.com/shows`)
    const data = await res.json()
    return data.filter((movie) => movie.genres.includes(genre)).slice(0, 15)
}

async function fetchSearched (searchValue) {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${searchValue}`)
    const data = await res.json()
    return data
}

async function fetchById (idArr) {
    let movies = []
    for (let id of idArr) {
        const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
        const data = await res.json()
        movies.push(data)
    }
    return movies
}



export {
    fetchFirstTenMovies,
    fetchTopRated,
    fetchByGenre,
    fetchSearched,
    fetchById,
    fetchRandom
}