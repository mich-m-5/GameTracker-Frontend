import React from "react";

const TarjetaJuego = ({ juego }) => {
  return (
    <div className="tarjeta-juego">
      <img
        src={juego.portada}
        alt={juego.titulo}
        width="200"
        style={{ borderRadius: "10px" }}
      />
      <h3>{juego.titulo}</h3>
      <p><strong>Plataforma:</strong> {juego.plataforma}</p>
      <p><strong>Género:</strong> {juego.genero}</p>
      <p><strong>Horas jugadas:</strong> {juego.horasJugadas}</p>
      <p><strong>Puntuación:</strong> {juego.puntuacion}/5</p>
    </div>
  );
};

export default TarjetaJuego;
