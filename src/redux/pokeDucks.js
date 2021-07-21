// constantes
const dataInicial ={
    array : []
}

//types 
const OBTENER_POKEMONS_EXITO = 'OBTENER_POKEMONS_EXITO'


//reducers
export default function pokeReducer(state= dataInicial,action){
switch(action.type){
case OBTENER_POKEMONS_EXITO:
    return {...state,array:action.payload} //se queda con el estado inicial y se le suma lo que le llega del payload
default:
    return state
}
}


//actions
                                  //esta funcion arrow retorna otra funcion, la primera recibe parametros que necesitamos enviar a obtenerPokemonAccion, y la siguiente necesita un dispatch(activa el reducer)y getState(obtiene la data inicial)
export const obtenerPokemonsAccion = () => async (dispatch,getState)=>{
    try {
       const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
       dispatch({
           type:OBTENER_POKEMONS_EXITO,
           payload:res.data.result  //esto lo envia 
       })
    }
    catch (err){
        console.log(err)
    }

}