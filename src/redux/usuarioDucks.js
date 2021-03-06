import {auth,firebase,db, storage} from '../firebase'




//data inicial
const dataInicial ={
    loading:false,
    activo:false
}

//types
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_SESION ="CERRAR_SESION"



// reducer
export default function usuarioReducer(state=dataInicial,action){
    switch(action.type){
    case LOADING:
        return {...state,loading:true}
    case USUARIO_ERROR:
        return {...dataInicial}    //se pasa solo la data incial ya que no ingreso correctamente
    case USUARIO_EXITO:
        return {...state,loading:false,activo:true,user:action.payload}
    case CERRAR_SESION:
        return {...dataInicial}    
        default:
        return {...state}
     }
}
// accion
export const ingresoUsuarioAccion =()=>async(dispatch)=>{
dispatch({
    type:LOADING
})
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)
        // console.log(res.user)
        const usuario = {
            uid:res.user.uid,
            email:res.user.email,
            displayName:res.user.displayName,
            photoURL:res.user.photoURL
        }
        const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()// de esta manera preguntamos si en la base de datos esta el usuario en el mail solicitado
        console.log(usuarioDB)
        if(usuarioDB.exists){
            //cuando existe el usuario en firestore
            dispatch({
                type:USUARIO_EXITO,
                payload:usuarioDB.data()// ese usuarioDB es el que viene de nuestra conexion solo que data()accede al objeto usuario
            })
            localStorage.setItem('usuario',JSON.stringify(usuarioDB.data()))

        }else{
            //no existe el usuario en firestore, por eso lo guardamos
            await db.collection('usuarios').doc(usuario.email).set(usuario) 
            dispatch({
                type:USUARIO_EXITO,
                payload:usuario //estamos enviando el usuario
            })
            localStorage.setItem('usuario',JSON.stringify(usuario))
        }


        // dispatch({
        //     type:USUARIO_EXITO,
        //     payload:{
        //         uid:res.user.uid,
        //         email:res.user.email
        //     }
        // })
        // localStorage.setItem("usuario",JSON.stringify({
        //     uid:res.user.uid,
        //     email:res.user.email
        // }))                             hecha la validacion mas arriba esto ya no se usa


    } catch (error) {
        console.error(error)
        dispatch({
            type:USUARIO_ERROR
        })
    }

    

}
export const leerUsuarioActivoAccion = () =>  (dispatch)=>{
    if(localStorage.getItem('usuario')){
        dispatch({
            type:USUARIO_EXITO,
            payload:JSON.parse(localStorage.getItem('usuario'))
        })
  }
}

export const cerrarSesionAccion =()=>(dispatch)=>{
    auth.signOut()//esto elimina las sesiones activas
    localStorage.removeItem('usuario')//esto elimina el usuario del localstorage
    dispatch({
        type:CERRAR_SESION
    })
}

                                       //aca recibe el nombre actualizado
export const actualizarUsuarioAccion =(nombreActualizado) =>async(dispatch,getState)=>{

    dispatch({
        type:LOADING
    })
    const {user} = getState().usuario
    console.log(user)
    try {
        await db.collection('usuarios').doc(user.email).update({
            displayName:nombreActualizado // se le asigna el nuevo nombre a display name
        })
        const usuario ={
            ...user,
            displayName:nombreActualizado //se le asign a user el nuevo nombre a displayName
        }
        dispatch({
            type:USUARIO_EXITO,
            payload:usuario // y se envia todo el update en un usuario nuevo
        })
        localStorage.setItem('usuario',JSON.stringify(usuario))

    } catch (error) {
        console.error(error)
    }
}

export const editarFotoAccion =(imagenEditada)=>async(dispatch,getState)=>{

    dispatch({
        type:LOADING
    })
    const {user} = getState().usuario
    try {         //archivo referenciado //guardado en esta carpeta  // guardado con este nombre de foto
         const imagenRef = await storage.ref().child(user.email).child('foto perfil') 
        await imagenRef.put(imagenEditada)// ese archivo lo guardamos con put
        const imagenURL = await imagenRef.getDownloadURL()// y aqui obtenemos su url

        await db.collection('usuarios').doc(user.email).update({
            photoURL:imagenURL
        })
        const usuario ={
            ...user,
            photoURL:imagenURL // lo que estamos obteniendo del storage
        }
        dispatch({
            type:USUARIO_EXITO,
            payload:usuario
        })
        localStorage.setItem('usuario',JSON.stringify(usuario))
    } catch (error) {
        console.error(error)
    }

}