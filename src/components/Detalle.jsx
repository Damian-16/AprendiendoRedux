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
    <div className="card mt-4 text-center">
      <div className="card-body">
        <img src={pokemon.foto} className="img-fuid" />
        <div className="card-title">Nombre del Pokemon:{pokemon.nombre}</div>
        <p className="card-text">
          Alto:{pokemon.alto} Ancho:{pokemon.ancho}
        </p>
      </div>
    </div>
  ) : null;
};
export default Detalle;
