import React, { useEffect, useState } from "react";
import axios from "axios";

function ListaResenas({ idJuego, nuevaResenaTrigger }) {
  const [resenas, setResenas] = useState([]);

  const cargar = async () => {
    try {
      const resp = await fetch(
        `http://localhost:4000/api/resenas?juegoId=${idJuego}`
      );
      const data = await resp.json();
      setResenas(data);
    } catch (err) {
      console.error("Error cargando reseñas:", err);
    }
  };

  useEffect(() => {
    cargar();
  }, [idJuego, nuevaResenaTrigger]); 
  const extraerNumeroEstrellas = (r) => {
    if (!r) return 0;
    if (typeof r.estrellas === "number") return Math.min(5, Math.max(0, r.estrellas));
    const count = (r.texto.match(/★/g) || []).length;
    return Math.min(5, count);
  };

  const renderStars = (n) => {
    const filled = "★".repeat(n);
    const empty = "☆".repeat(5 - n);
    return filled + empty;
  };

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ texto: "", estrellas: 0, usuario: "" });

  const comenzarEdicion = (r) => {
    setEditId(r._id);
    setEditForm({ texto: r.texto || "", estrellas: r.estrellas || 0, usuario: r.usuario || "Anónimo" });
  };

  const guardarEdicion = async () => {
    try {
      await axios.put(`http://localhost:4000/api/resenas/${editId}`, editForm);
      setEditId(null);
      await cargar();
    } catch (err) {
      console.error("Error editando reseña:", err);
      alert("No se pudo editar la reseña");
    }
  };

  const borrarResena = async (id) => {
    if (!window.confirm("¿Borrar esta reseña?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/resenas/${id}`);
      await cargar();
    } catch (err) {
      console.error("Error borrando reseña:", err);
      alert("No se pudo borrar la reseña");
    }
  };

  return (
    <div className="lista-resenas">
      <h4>Reseñas de este juego</h4>

      {resenas.length === 0 ? (
        <p>No hay reseñas todavía.</p>
      ) : (
        resenas.map((r) => {
          const n = extraerNumeroEstrellas(r);
          return (
            <div key={r._id ?? Math.random()} className="resena-item">
              <p className="estrellas" aria-label={`${n} de 5 estrellas`}>
                {renderStars(n)}
              </p>
              <p className="texto">{r.texto ?? r.comentario ?? JSON.stringify(r).slice(0, 200)}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ListaResenas;






/* useEffect(() => {
  const cargar = async () => {
    try {
      const resp = await fetch(
        `http://localhost:4000/api/resenas?juegoId=${idJuego}`
      );
      const data = await resp.json();

      console.log("RESEÑAS CARGADAS:", data); // ← AGREGA ESTO

      setResenas(data);
    } catch (err) {
      console.error("Error cargando reseñas:", err);
    }
  };
  cargar();
}, [idJuego, nuevaResenaTrigger]); */
