import React from "react";

function Navbar({ onAgregarJuego }) {
  return (
    <nav className="nav">
      <h1 className="titulo-app">GameTracker</h1>

      <button className="btn-agregar" onClick={onAgregarJuego}>
        Agregar Juego
      </button>
    </nav>
  );
}

export default Navbar;
