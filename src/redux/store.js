import { createStore,combineReducers,compose,applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import pokeReducer from "./pokeDucks";
import usuarioReducer,{leerUsuarioActivoAccion} from "./usuarioDucks";

const rootReducer = combineReducers({
   pokemons:pokeReducer,

   usuario:usuarioReducer,
}) // este es el que va a consumir nuestro componente

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//configuracion de redux devtools

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhacers(applyMiddleware(thunk)))
    leerUsuarioActivoAccion()(store.dispatch)//de esta manera la tienda siempre leera si se refresca la pag. asi no se perdera el usuario,los dobles parentesis es por la doble funcion de flechas
    return store;
}//se crea la tienda
