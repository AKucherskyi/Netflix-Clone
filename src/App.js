import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register'
import Dashboard from './components/Dashboard';


function App() {
  return (
    <div className="App">
     <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  </Router>
    </div>
  );
}

export default App;
