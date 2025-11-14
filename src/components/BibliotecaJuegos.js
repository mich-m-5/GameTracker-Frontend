import React from "react";
import TarjetaJuego from "./TarjetaJuego";
import "./BibliotecaJuegos.css";

function BibliotecaJuegos({ juegos }) {
  return (
    <div className="biblioteca">
      {juegos.length === 0 && (
        <p style={{ color: "#ccc", textAlign: "center" }}>
          No hay juegos todavía. Agrega uno.
        </p>
      )}

      {juegos.map((juego) => (
        <TarjetaJuego key={juego._id} juego={juego} />
      ))}
    </div>
  );
}

export default BibliotecaJuegos;
