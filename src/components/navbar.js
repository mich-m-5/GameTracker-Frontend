import React from "react";

function Navbar({ onOpenAgregar }) {
  return (
    <nav className="navbar">
      <h2 className="logo">🎮 GameTracker</h2>
      <button className="btn-agregar" onClick={onOpenAgregar}>
        ➕ Agregar juego
      </button>
    </nav>
  );
}

export default Navbar;
