async function fetchFirstTenMovies() {
    let movies = []
    for (let i = 0; i < 10; i++) {
        const res = await fetch(`https://api.tvmaze.com/shows/${i+1}`)
        const data = await res.json()
        movies.push(data)
    }
    return movies
}

async function fetchTopRated() {
    const res = await fetch(`https://api.tvmaze.com/shows`)
    const data = await res.json()
    return data.filter((movie) => movie.rating.average > 8.5)
}

async function fetchByGenre (genre) {
    const res = await fetch(`https://api.tvmaze.com/shows`)
    const data = await res.json()
    return data.filter((movie) => movie.genres.includes(genre))
}


const movies = {
    fetchFirstTenMovies,
    fetchTopRated,
    fetchByGenre
}


export default movies;