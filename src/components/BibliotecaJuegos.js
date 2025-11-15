import React from "react";
import TarjetaJuego from "./TarjetaJuego";
import "./TarjetaJuego.css";

function BibliotecaJuegos({ juegos, actualizarJuego, recargar }) {
  return (
    <div className="biblioteca-container">
      {juegos.map((juego) => (
        <TarjetaJuego
          key={juego._id}
          juego={juego}
          actualizarJuego={actualizarJuego}
          recargar={recargar}
        />
      ))}
    </div>
  );
}

export default BibliotecaJuegos;
