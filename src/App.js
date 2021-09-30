import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/screens/LoginSrceen';
import Register from './components/screens/RegisterScreen'
import HomeScreen from './components/screens/HomeScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import MovieScreen from './components/screens/MovieScreen';
import SearchScreen from './components/screens/SearchScreen';


function App() {
  return (
    <div className="App">
    <Router>
     <Switch>
      <Route exact path="/" component={HomeScreen} />
      <Route  path="/login" component={Login} />
      <Route  path="/register" component={Register} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/search" component={SearchScreen} />
      <Route path="/movie/:id" component={MovieScreen} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
