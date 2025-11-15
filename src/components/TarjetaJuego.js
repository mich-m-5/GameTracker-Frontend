import React, { useState } from "react";
import axios from "axios";
import "./TarjetaJuego.css";
import ListaResenas from "./ListaResenas";

function TarjetaJuego({ juego, actualizarJuego, recargar }) {
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [usuario, setUsuario] = useState("");
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    titulo: juego?.titulo || "",
    descripcion: juego?.descripcion || "",
    portada: juego?.portada || "",
  });

  const countLocal = Array.isArray(juego.resenas) ? juego.resenas.length : 0;
  const promedio = countLocal > 0
    ? (
        juego.resenas.reduce((acc, r) => acc + (r.estrellas || 0), 0) /
        countLocal
      ).toFixed(2)
    : "0.00";

  const enviar = async () => {
    if (!comentario.trim()) return alert("Escribe una reseña");
    if (rating === 0) return alert("Selecciona una puntuación");

    try {
      const nuevaResena = {
        texto: comentario,
        rating: rating,
        usuario: usuario || undefined,
      };

      const res = await axios.post(
        `http://localhost:4000/api/juegos/${juego._id}/resena`,
        nuevaResena
      );

      actualizarJuego(juego._id, res.data);

      setComentario("");
      setRating(0);
      setHover(0);
      setUsuario("");

      alert("Reseña agregada correctamente");
    } catch (error) {
      console.error("Error al agregar reseña:", error);
      alert("No se pudo agregar la reseña");
    }
  };

  const guardarJuego = async () => {
    try {
      const payload = { ...form };
      await axios.put(`http://localhost:4000/api/juegos/${juego._id}`, payload);
      alert("Juego actualizado");
      setEditando(false);
      if (recargar) recargar();
    } catch (error) {
      console.error("Error al actualizar juego:", error);
      alert("No se pudo actualizar el juego");
    }
  };

  const borrarJuego = async () => {
    if (!window.confirm("¿Seguro que deseas borrar este juego?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/juegos/${juego._id}`);
      alert("Juego borrado");
      if (recargar) recargar();
    } catch (error) {
      console.error("Error al borrar juego:", error);
      alert("No se pudo borrar el juego");
    }
  };


  
  return (
    <div className="juego-card"> 
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

        <input
          type="text"
          placeholder="Nombre de usuario (opcional)"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="textarea-resena"
          style={{ height: 36 }}
        />

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
