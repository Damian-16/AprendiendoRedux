import { Provider } from 'react-redux';
import './App.css';
import Pokemons from './components/Pokemons';
import generateStore from './redux/store';

function App() {
  const store = generateStore()

  return (
    <Provider store={store}>
      <div className="container mt-3">
      <Pokemons/>   
      
 </div>
    </Provider>
  );
}

export default App;
