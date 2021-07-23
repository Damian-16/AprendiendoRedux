import { Provider } from 'react-redux';
import './App.css';
import Pokemons from './components/Pokemons';
import generateStore from './redux/store';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login';
import  Navbar  from './components/Navbar';


function App() {
  

  return (
   <Router>
      <div className="container mt-3">
   <Navbar/>     
    <Switch>
      <Route component={Pokemons} path="/" exact/>
      <Route component={Login} path="/login" exact/>
      </Switch>  
      
        </div>
 </Router>
  );
}

export default App;
