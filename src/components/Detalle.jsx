import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unPokeDetalleAccion } from "../redux/pokeDucks";

const Detalle = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchData = () => {
      dispatch(unPokeDetalleAccion());
    };
    fetchData();
  }, [dispatch]);

  const pokemon = useSelector((store) => store.pokemons.unPokemon);

  return pokemon ? (
    <div className="card mt-4  text-center" style={{width:600,height:400}}>
      <div className="card-body w-100">
      <div className="card-title" style={{fontSize:"2rem"}}>Nombre del Pokemon:{pokemon.nombre}</div>
        <img src={pokemon.foto} className="img-fuid" style={{height:200,width:200}} />
       
        <p className="card-text" style={{fontSize:"1.5rem"}}>
          Alto:{pokemon.alto}mts Ancho:{pokemon.ancho} cm
        </p>
      </div>
    </div>
  ) : null;
};
export default Detalle;
