import React, { useState } from 'react'
import {useSelector} from 'react-redux'

const Perfil = () => {

    const usuario = useSelector(store => store.usuario.user)
    console.log(usuario)
    const [nombreUsuario, setNombreUsuario] = useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = useState(false)

    const actualizarUsuario = () =>{

    }
    return (
        <div className=",t-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} alt=""width="100px" className="img-fluid"/>
                    <h5 className="card-title">Nombre:{usuario.displayName}</h5>
                    <p className="card-text">Email:{usuario.email}</p>
                    <button className="btn btn-dark" onClick={()=>setActivarFormulario(true)}>Editar Nombre</button>
                </div>
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