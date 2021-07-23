import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
    //useDispatch nos va a servir para consumir nuestra accion ,useSelector nos servira para leer el state principal(array:[])
import {anteriorPokemonAccion, obtenerPokemonsAccion,siguientePokemonAccion, unPokeDetalleAccion} from '../redux/pokeDucks';
import  Detalle  from './Detalle';


const Pokemons = () => {

    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemons.results)
    console.log(pokemones)
    const next = useSelector(store => store.pokemons.next)
    const previous = useSelector(store => store.pokemons.previous)

    React.useEffect(() =>{
        const fetchData = () =>{
            dispatch(obtenerPokemonsAccion())
        }  
        fetchData()
     },[dispatch])//esto es para que no se presione el getPokemon

    return (
        <div className="row">
            <div className="col-md-6">

          
            <h1>LISTA DE POKEMONES UwU</h1>
           
            <br/>
            <div className="d-flex justify-content-between">
            {
                pokemones.length === 0 &&
                
                             /* //dispatch llama ala accion y la accion es una funcion por eso viene con parentesis */
        
            <button className="btn btn-dark" onClick={()=>dispatch(obtenerPokemonsAccion())}>Trae el pokemon</button>
            }{
                next &&
                                                           /*en el parametro de siguientePokemonAccion si pusieramos 20 y lo recibieramos en pokeDucks ese parametro daria tambien el mismo resultado , ya que esta seria la otra alternativa */
            <button  className="btn btn-dark" onClick={()=>dispatch(siguientePokemonAccion())}>Siguiente</button>}
            {previous &&
            <button  className="btn btn-dark" onClick={()=>dispatch(anteriorPokemonAccion())}>Anterior</button>}
     </div>
     <ul className="list-group mt-3"> 
          {
              pokemones.map(item =>(
                  <li key={item.name} className="list-group-item text-uppercase" >
                      {item.name}
                      <button
                       className="btn btn-dark btn-sm float-right"
                       onClick={()=>dispatch(unPokeDetalleAccion(item.url))}>Info</button>
                      </li>
              ))
       } 
       </ul> 
       </div>
       <div className="col-md-6">
           <h3>Detalle de pokemon</h3>
       <Detalle/>
       </div>
        
       </div>
    )
}

export default Pokemons;