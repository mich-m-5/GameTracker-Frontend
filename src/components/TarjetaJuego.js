import React from "react";

function TarjetaJuego({ juego }) {
  return (
    <div
      style={{
        border: "2px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        width: "200px",
        textAlign: "center",
      }}
    >
      <h3>{juego.titulo}</h3>
      <p>Género: {juego.genero}</p>
      <p>⭐ {juego.puntuacion}</p>
      <button>Editar</button>
      <button>Eliminar</button>
    </div>
  );
}

export default TarjetaJuego;
