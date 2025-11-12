import React, { useEffect, useState } from "react";
import axios from "axios";
import TarjetaJuego from "./TarjetaJuego";
import FormularioJuego from "./FormularioJuego";

const BibliotecaJuegos = () => {
  const [juegos, setJuegos] = useState([]);

  const obtenerJuegos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/juegos");
      setJuegos(res.data);
    } catch (error) {
      console.error("Error al obtener los juegos:", error);
    }
  };

  useEffect(() => {
    obtenerJuegos();
  }, []);

  const agregarJuego = (nuevoJuego) => {
    setJuegos([...juegos, nuevoJuego]);
  };

  return (
    <div>
      <h2>🎮 Biblioteca de Juegos</h2>
      <FormularioJuego onAgregar={agregarJuego} />
      <div className="contenedor-juegos">
        {juegos.length > 0 ? (
          juegos.map((juego) => (
            <TarjetaJuego key={juego._id} juego={juego} />
          ))
        ) : (
          <p>No hay juegos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default BibliotecaJuegos;
