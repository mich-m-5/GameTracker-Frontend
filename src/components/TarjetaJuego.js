import React, { useState } from "react";
import FormularioResena from "./FormularioResena";

function TarjetaJuego({ juego }) {
  const [mostrarResena, setMostrarResena] = useState(false);

  return (
    <div className="tarjeta-juego">
      <img src={juego.portada} alt={juego.titulo} className="portada-juego" />
      <h3>{juego.titulo}</h3>
      <p>{juego.descripcion}</p>

      <p className="estrellas">
        ⭐ {juego.promedioEstrellas?.toFixed(1) || "Sin calificación"}
      </p>

      <button onClick={() => setMostrarResena(!mostrarResena)}>
        {mostrarResena ? "Cerrar reseña" : "Agregar reseña"}
      </button>

      {/* 🔹 Solo muestra el formulario si el usuario abre el botón */}
      {mostrarResena && <FormularioResena juegoId={juego._id} />}
    </div>
  );
}

export default TarjetaJuego;
