import React from "react";
import TarjetaJuego from "./TarjetaJuego";

function BibliotecaJuegos() {
  // Aquí luego mostraremos los juegos desde el backend
  const juegos = [
    {id: 1, titulo: "Clash Royale", genero: "Estrategia", puntuacion: 5 },
    { id: 2, titulo: "The Legend of Zelda", genero: "Aventura", puntuacion: 4.2 },
    { id: 3, titulo: "Minecraft", genero: "Construcción", puntuacion: 4.5 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎮 Mi Biblioteca de Juegos</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {juegos.map((juego) => (
          <TarjetaJuego key={juego.id} juego={juego} />
        ))}
      </div>
    </div>
  );
}

export default BibliotecaJuegos;
