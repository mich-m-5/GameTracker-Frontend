import React, { useState } from "react";

// ======= Componente de Estrellas =======
function EstrellasInline({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {[...Array(5)].map((_, i) => {
        const val = i + 1;
        const displayValue = hover || rating;
        const isFull = displayValue >= val;
        const isHalf = !isFull && displayValue >= val - 0.5;

        return (
          <span
            key={val}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              setRating(pct <= 0.5 ? val - 0.5 : val);
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              setHover(pct <= 0.5 ? val - 0.5 : val);
            }}
            onMouseLeave={() => setHover(0)}
            style={{
              position: "relative",
              display: "inline-block",
              fontSize: 38,
              cursor: "pointer",
              color: "#ccc",
            }}
          >
            ★
            {isFull && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  color: "#FFD700",
                  pointerEvents: "none",
                }}
              >
                ★
              </span>
            )}
            {!isFull && isHalf && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "50%",
                  overflow: "hidden",
                  color: "#FFD700",
                  pointerEvents: "none",
                }}
              >
                ★
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ======= Componente principal =======
function ListaResenas() {
  const [juegos, setJuegos] = useState([
    {
      _id: 1,
      nombre: "Clash Royale",
      descripcion: "Juego de estrategia en tiempo real.",
      imagen: "https://via.placeholder.com/400x180",
      resenas: [],
    },
    {
      _id: 2,
      nombre: "Minecraft",
      descripcion: "Construye y explora mundos infinitos.",
      imagen: "https://via.placeholder.com/400x180",
      resenas: [],
    },
  ]);

  const [nuevoComentario, setNuevoComentario] = useState("");
  const [rating, setRating] = useState(0);

  const enviarReseña = (juegoId) => {
    if (!nuevoComentario.trim()) return alert("Escribe tu reseña.");

    setJuegos((prev) =>
      prev.map((j) =>
        j._id === juegoId
          ? {
              ...j,
              resenas: [
                ...j.resenas,
                { texto: nuevoComentario, puntuacion: rating },
              ],
            }
          : j
      )
    );

    alert("✅ Reseña enviada");
    setNuevoComentario("");
    setRating(0);
  };

  return (
    <div
      style={{
        padding: 20,
        color: "#fff",
        background: "#121212",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center" }}>⭐ Reseñas de Juegos</h2>

      {juegos.map((juego) => (
        <div
          key={juego._id}
          style={{
            background: "#1E1E1E",
            borderRadius: 12,
            margin: "20px auto",
            padding: 16,
            maxWidth: 480,
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          }}
        >
          <h3 style={{ color: "#FFD700" }}>{juego.nombre}</h3>
          <img
            src={juego.imagen}
            alt={juego.nombre}
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              borderRadius: 8,
              marginBottom: 10,
            }}
          />
          <p style={{ opacity: 0.8 }}>{juego.descripcion}</p>

          <EstrellasInline rating={rating} setRating={setRating} />

          <textarea
            placeholder="Deja tu reseña..."
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            style={{
              width: "100%",
              height: 70,
              borderRadius: 8,
              border: "none",
              marginTop: 10,
              padding: 8,
              fontSize: 15,
            }}
          ></textarea>

          <button
            onClick={() => enviarReseña(juego._id)}
            style={{
              marginTop: 8,
              background: "#FFD700",
              border: "none",
              borderRadius: 6,
              padding: "8px 12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Enviar reseña
          </button>

          {juego.resenas.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <h4>Reseñas:</h4>
              {juego.resenas.map((r, i) => (
                <div
                  key={i}
                  style={{
                    background: "#2A2A2A",
                    borderRadius: 6,
                    padding: 8,
                    marginTop: 4,
                  }}
                >
                  <div>⭐ {r.puntuacion}</div>
                  <div>{r.texto}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ListaResenas;
