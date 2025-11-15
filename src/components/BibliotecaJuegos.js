import React from "react";
import TarjetaJuego from "./TarjetaJuego";
import "./TarjetaJuego.css";

function BibliotecaJuegos({ juegos, actualizarJuego }) {
  return (
    <div className="biblioteca-container">
      {juegos.map((juego) => (
        <TarjetaJuego
          key={juego._id}
          juego={juego}
          actualizarJuego={actualizarJuego}
        />
      ))}
    </div>
  );
}

export default BibliotecaJuegos;
