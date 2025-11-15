import React, { useEffect, useState } from "react";

function ListaResenas({ idJuego, nuevaResenaTrigger }) {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
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
    cargar();
  }, [idJuego, nuevaResenaTrigger]); // se recarga cada vez que nuevaResenaTrigger cambia

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






useEffect(() => {
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
}, [idJuego, nuevaResenaTrigger]);
