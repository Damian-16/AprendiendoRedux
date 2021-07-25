import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { actualizarUsuarioAccion, editarFotoAccion } from '../redux/usuarioDucks'

const Perfil = () => {

    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)
    console.log(usuario)
    const [nombreUsuario, setNombreUsuario] = useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = useState(false)


    const dispatch = useDispatch()
    const actualizarUsuario = () =>{
      if(!nombreUsuario.trim()){
          console.log("nombre vacio")
          return
      }//leemos que haya algo

    dispatch(actualizarUsuarioAccion(nombreUsuario))//mandamos el nuevo nombre
    setActivarFormulario(false)//desaparecemos el formulario
    }
    const [error, setError] = useState(false)
    const seleccionarArchivo = imagen => {
        console.log(imagen.target.files[0])
        const imagenCliente = imagen.target.files[0]
        if(imagenCliente === undefined){
            console.log('no se selecciono imagen')
            return
        }
        if(imagenCliente.type ==="image/png" || imagenCliente.type ==="image/jpg"){
            dispatch(editarFotoAccion(imagenCliente))
            setError(false)
        }else{
            setError(true)
        }
    }
    return (
        <div className=",t-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} alt=""width="100px" className="img-fluid"/>
                    <h5 className="card-title">Nombre:{usuario.displayName}</h5>
                    <p className="card-text">Email:{usuario.email}</p>
                    <button className="btn btn-dark" onClick={()=>setActivarFormulario(true)}>Editar Nombre</button>
                    {
                        error && 
                        <div className="alert alert-warning mt-3">
                            Solo archivos .png o .jpg
                        </div>
                    }
                    <div className="custom-file">
                    <input 
        type="file" 
        className="custom-file-input" 
        id="validatedCustomFile" 
        onChange={e=>seleccionarArchivo(e)}
        disabled={loading}
       
        style={{display:'none'}}
        />
    <label 
        className={loading ? "btn btn-dark disabled mt-3" : "btn btn-dark mt-3"}
        htmlFor="validatedCustomFile"
        >
            Editar foto perfil
    </label>
                    </div>
                </div>
                {
                    loading &&
                    <div className="card-body">
                        <div className="d-flex justify-content-center my-2">
                            <div className="spinner-border" role="status">
                                {/* <span className="sr-only">Loading...</span> */}
                            </div>
                        </div>
                    </div>
                }
                {activarFormulario &&(
                <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="input-group mb-3">
                                <input
                                type="text"
                                class="form-control"
                                value={nombreUsuario}
                                onChange={e=>setNombreUsuario(e.target.value)}
                                aria-describedby="button-addon2"/>
                                <div className="input-group-append"
                                >
                                    <button
                                    className="btn btn-dark"
                                    type="button"
                                    id="button-addon2"
                                    onClick={()=>actualizarUsuario()}>Actualizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                </div>
                )}
            </div>
           
        </div>
    )
}
export default Perfil;