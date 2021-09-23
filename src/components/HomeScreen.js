import Banner from "./Banner";
import Header from "./Header";
import Row from "./Row";
import movies from "../movies"
import Footer from "./Footer";

function HomeScreen() {
  
  return (
    <div>
      <Header />
      <Banner />
      <Row title='NETFLIX ORIGINALS' fetchMovies={movies.fetchFirstTenMovies} biggerSize/>
      <Row title='Top rated' fetchMovies={movies.fetchTopRated} />
      <Row title='Action movies' fetchMovies={movies.fetchByGenre.bind(null, 'Action')} />
      <Row title='Drama movies' fetchMovies={movies.fetchByGenre.bind(null, 'Drama')} />
      <Row title='Romance movies' fetchMovies={movies.fetchByGenre.bind(null, 'Romance')} />
      <Row title='Horror movies' fetchMovies={movies.fetchByGenre.bind(null, 'Horror')} />
      <Row title='Crime movies' fetchMovies={movies.fetchByGenre.bind(null, 'Crime')} />
      <Row title='Thriller movies' fetchMovies={movies.fetchByGenre.bind(null, 'Thriller')} />
      <Footer />
    </div>
  );
}
export default HomeScreen;
