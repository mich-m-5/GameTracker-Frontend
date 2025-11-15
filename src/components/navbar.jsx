import React from "react";

function Navbar({ onAgregarJuego, onVerEstadisticas }) {
  return (
    <nav className="nav">
      <h1 className="titulo-app">GameTracker</h1>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn-agregar" onClick={onAgregarJuego}>
          Agregar Juego
        </button>
        <button className="btn-agregar" onClick={onVerEstadisticas}>
          Estadísticas
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
