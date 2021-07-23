import { createStore,combineReducers,compose,applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import pokeReducer from "./pokeDucks";
import usuarioReducer from "./usuarioDucks";

const rootReducer = combineReducers({
   pokemons:pokeReducer,

   usuario:usuarioReducer,
}) // este es el que va a consumir nuestro componente

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//configuracion de redux devtools

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhacers(applyMiddleware(thunk)))
    return store;
}//se crea la tienda
