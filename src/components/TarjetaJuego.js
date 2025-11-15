import React, { useState } from "react";
import axios from "axios";
import "./TarjetaJuego.css";

function TarjetaJuego({ juego, actualizarJuego }) {
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const promedio =
    juego.resenas && juego.resenas.length > 0
      ? (
          juego.resenas.reduce((acc, r) => acc + (r.estrellas || 0), 0) /
          juego.resenas.length
        ).toFixed(1)
      : (juego.avgRating || 0);

  const enviar = async () => {
    if (!comentario.trim()) return alert("Escribe una reseña");
    if (rating === 0) return alert("Selecciona una puntuación");

    try {
      const nuevaResena = {
        texto: comentario,
        rating: rating,
      };

      const res = await axios.post(
        `http://localhost:4000/api/juegos/${juego._id}/resena`,
        nuevaResena
      );

      actualizarJuego(juego._id, res.data);

      setComentario("");
      setRating(0);
      setHover(0);

      alert("Reseña agregada correctamente");
    } catch (error) {
      console.error("Error al agregar reseña:", error);
      alert("No se pudo agregar la reseña");
    }
  };


  
  return (
    <div className="juego-card"> {/* <==== CAMBIO 1 */}
      <img className="juego-portada" src={juego.portada} alt={juego.titulo} />

      <h3 className="titulo-juego" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {juego.titulo}
        <span
          style={{
            background: "#FFD700",
            color: "#000",
            padding: "3px 8px",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          ⭐ {promedio}
        </span>
      </h3>

      <p>{juego.descripcion}</p>

      <div className="resena-box">
        <h4>⭐ Agregar reseña</h4>

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

        <button className="btn-resena" onClick={enviar}> {/* <==== CAMBIO 3 */}
          Enviar reseña
        </button>
      </div>

      <div className="lista-resenas">
        <h4>⭐ Reseñas:</h4>

        {juego.resenas?.length === 0 && <p>No hay reseñas aún.</p>}

        {juego.resenas?.map((r, i) => (
          <div key={i} className="resena-item" style={{ marginBottom: 10 }}>
            <p style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {Array.from({ length: r.estrellas || 0 }, (_, i) => (
                <span key={i} style={{ color: "#FFD700", fontSize: 18 }}>★</span>
              ))}
              {Array.from({ length: 5 - (r.estrellas || 0) }, (_, i) => (
                <span key={i} style={{ color: "#ccc", fontSize: 18 }}>★</span>
              ))}
              <span>{r.texto}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TarjetaJuego;
