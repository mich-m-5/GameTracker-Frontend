import React, { useState } from "react";

function TarjetaJuego({ juego, onAgregarResena }) {
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const enviar = () => {
    if (!comentario.trim()) return alert("Escribe una reseña");

    onAgregarResena(juego._id, {
      texto: comentario,
      puntuacion: rating,
    });

    setComentario("");
    setRating(0);
  };

  return (
    <div className="tarjeta-juego">
      <img className="juego-portada" src={juego.portada} alt={juego.titulo} />
      <h3>{juego.titulo}</h3>
      <p>{juego.descripcion}</p>

      {/* =================== AGREGAR RESEÑA =================== */}
      <div className="resena-box">
        <h4>⭐ Agregar reseña</h4>

        {/* Estrellas */}
        <div style={{ display: "flex", gap: 6, fontSize: 28, cursor: "pointer" }}>
          {[1, 2, 3, 4, 5].map((star) => {
            const filled = hover >= star || rating >= star;
            return (
              <span
                key={star}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                style={{ color: filled ? "#FFD700" : "#666" }}
              >
                ★
              </span>
            );
          })}
        </div>

        <textarea
          placeholder="Escribe tu reseña..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="textarea-resena"
        ></textarea>

        <button className="btn-resena" onClick={enviar}>
          Enviar reseña
        </button>
      </div>

      {/* =================== LISTA DE RESEÑAS =================== */}
      <div className="lista-resenas">
        <h4>⭐ Reseñas:</h4>

        {juego.resenas?.length === 0 && <p>No hay reseñas aún.</p>}

        {juego.resenas?.map((r, i) => (
          <div key={i} className="resena-item">
            <p>
              <strong>⭐ {r.puntuacion}/5</strong>
            </p>
            <p>{r.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TarjetaJuego;
