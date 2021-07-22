import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
    //useDispatch nos va a servir para consumir nuestra accion ,useSelector nos servira para leer el state principal(array:[])
import {obtenerPokemonsAccion} from '../redux/pokeDucks';

const Pokemons = () => {

    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemons.array)
    console.log(pokemones)

    return (
        <div>
            <h1>LISTA DE POKEMONES UwU</h1>
                             {/* //dispatch llama ala accion y la accion es una funcion por eso viene con parentesis */}
          
            <button onClick={()=>dispatch(obtenerPokemonsAccion())}>Trae el pokemon</button>
      <ul> {
              pokemones.map(item =>(
                  <li key={item.name} >{item.name}</li>
              ))
       } 
       </ul>
       </div>
    )
}

export default Pokemons;