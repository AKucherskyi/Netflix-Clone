import Banner from "../Banner";
import Header from "../Header";
import Row from "../Row";
import { fetchByGenre, fetchFirstTenMovies, fetchTopRated } from "../../movies"
import Footer from "../Footer";
import { useHistory } from "react-router";
import Search from "../Search";

function HomeScreen() {
  const history = useHistory()
  
  return (
    <div>
      <Header buttonName="Profile" handleButton={() => history.push('/profile')}/>
      <Search />
      <Banner />
      <Row title='NETFLIX ORIGINALS' fetchMovies={fetchFirstTenMovies} biggerSize/>
      <Row title='Top rated' fetchMovies={fetchTopRated} />
      <Row title='Action movies' fetchMovies={fetchByGenre.bind(null, 'Action')} />
      <Row title='Drama movies' fetchMovies={fetchByGenre.bind(null, 'Drama')} />
      <Row title='Romance movies' fetchMovies={fetchByGenre.bind(null, 'Romance')} />
      <Row title='Horror movies' fetchMovies={fetchByGenre.bind(null, 'Horror')} />
      <Row title='Crime movies' fetchMovies={fetchByGenre.bind(null, 'Crime')} />
      <Row title='Thriller movies' fetchMovies={fetchByGenre.bind(null, 'Thriller')} />
      <Footer />
    </div>
  );
}
export default HomeScreen;
