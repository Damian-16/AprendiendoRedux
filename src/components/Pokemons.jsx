import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
    //useDispatch nos va a servir para consumir nuestra accion ,useSelector nos servira para leer el state principal(array:[])
import {anteriorPokemonAccion, obtenerPokemonsAccion,siguientePokemonAccion} from '../redux/pokeDucks';

const Pokemons = () => {

    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemons.results)
    console.log(pokemones)
    const next = useSelector(store => store.pokemons.next)
    const previous = useSelector(store => store.pokemons.previous)

    return (
        <div>
            <h1>LISTA DE POKEMONES UwU</h1>
            <br/>
            {
                pokemones.length === 0 &&
                
                             /* //dispatch llama ala accion y la accion es una funcion por eso viene con parentesis */
        
            <button onClick={()=>dispatch(obtenerPokemonsAccion())}>Trae el pokemon</button>
            }{
                next &&
                                                           /*en el parametro de siguientePokemonAccion si pusieramos 20 y lo recibieramos en pokeDucks ese parametro daria tambien el mismo resultado , ya que esta seria la otra alternativa */
            <button onClick={()=>dispatch(siguientePokemonAccion())}>Siguiente</button>}
            {previous &&
            <button onClick={()=>dispatch(anteriorPokemonAccion())}>Anterior</button>}
      <ul> 
          {
              pokemones.map(item =>(
                  <li key={item.name} >{item.name}</li>
              ))
       } 
       </ul>
       </div>
    )
}

export default Pokemons;