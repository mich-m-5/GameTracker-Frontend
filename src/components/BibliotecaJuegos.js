import React from "react";
import "./BibliotecaJuegos.css";

function BibliotecaJuegos({ juegos }) {
  return (
    <div className="biblioteca">
      {juegos.length === 0 && (
        <p style={{ color: "#ccc", textAlign: "center" }}>
          No hay juegos todavía. Agrega uno.
        </p>
      )}

      {juegos.map((j) => (
        <div key={j._id} className="juego-card">
          <img src={j.portada} alt={j.titulo} className="juego-portada" />

          <h3 className="titulo-iluminado">{j.titulo}</h3>

          <p>{j.descripcion}</p>

          <p>
            <strong>Tipo:</strong> {j.tipo}
          </p>

          <p>
            <strong>Plataforma:</strong> {j.plataforma}
          </p>

          {j.completado && <p>✅ Completado</p>}

          {/* BOTÓN PARA IR A LAS RESEÑAS */}
          <a className="btn-resena" href={`/reseñas/${j._id}`}>
            Ver / Agregar reseñas
          </a>
        </div>
      ))}
    </div>
  );
}

export default BibliotecaJuegos;
