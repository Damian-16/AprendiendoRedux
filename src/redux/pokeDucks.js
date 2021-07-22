import axios from "axios"

// constantes
const dataInicial ={
    count:0,
    next:null,
    previous:null,
    results : [],
  
}

//types 
const OBTENER_POKEMONS_EXITO = 'OBTENER_POKEMONS_EXITO'
const SIGUIENTE_POKEMONS_EXITO = 'SIGUIENTE_POKEMONS_EXITO'


//reducers
export default function pokeReducer(state= dataInicial,action){
switch(action.type){
case OBTENER_POKEMONS_EXITO:
    return {...state,...action.payload} //se queda con el estado inicial y se le suma lo que le llega del payload
case SIGUIENTE_POKEMONS_EXITO:
    return {...state,...action.payload}
default:
    return state
}
}


//actions
                                  //esta funcion arrow retorna otra funcion, la primera recibe parametros que necesitamos enviar a obtenerPokemonAccion, y la siguiente necesita un dispatch(activa el reducer)y getState(obtiene la data inicial)
export const obtenerPokemonsAccion = () => async (dispatch,getState)=>{

       
    //    console.log('getSTate trae',getState().pokemons.offset)
    //    const offset = getState().pokemons.offset  //tambien se puede escribir asi const {offset} = getState.pokemons
    
    
    //    getState()
    if(localStorage.getItem('offset=0')){
        console.log('datos guardados')
        dispatch({
            type:OBTENER_POKEMONS_EXITO,
            payload:JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }
    try {
        console.log('datos que vienen desde la api')// esto se presentara la primera vez q se llama ala api que quedara guardado en el localstorage
       const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
       dispatch({
           type:OBTENER_POKEMONS_EXITO,
           payload:res.data  //esto lo envia 
       })
       localStorage.setItem('offset=0',JSON.stringify(res.data))//informaciond e key y value a guardar en el localstorage
    }
    catch (err){
        console.log(err)
    }

}


export const siguientePokemonAccion = () => async (dispatch,getState) => {
    //primera alternativa
    // const offset = getState().pokemons.offset
    // const siguiente = offset + 20
    const next = getState().pokemons.next
    if(localStorage.getItem(next)){
        console.log('datos next guardados')
        dispatch({
            type:OBTENER_POKEMONS_EXITO,
            payload:JSON.parse(localStorage.getItem(next)) 
        })
        return
    }
try {
                                                      
    const res = await axios.get(next)
    dispatch({
        type:SIGUIENTE_POKEMONS_EXITO,
        payload:res.data 
         
    })
    localStorage.setItem(next,JSON.stringify(res.data))
} catch (error) {
    console.log(error)
}
}

export const anteriorPokemonAccion =()=>async(dispatch,getState)=>{
    const previous = getState().pokemons.previous
    if(localStorage.getItem(previous)){
        console.log('datos anteriores guardados')
        dispatch({
            type:OBTENER_POKEMONS_EXITO,
            payload:JSON.parse(localStorage.getItem(previous)) 
        })
        return
    }
    
    try {
                                                      
        const res = await axios.get(previous)
        dispatch({
            type:SIGUIENTE_POKEMONS_EXITO,
            payload:res.data 
             
        })
    } catch (error) {
        console.log(error)
    }

}