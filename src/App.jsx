import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import FormularioJuego from "./components/FormularioJuego";
import "./App.css";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [mostrarFormularioJuego, setMostrarFormularioJuego] = useState(false);

  // Cargar juegos
  useEffect(() => {
    fetch("http://localhost:4000/api/juegos")
      .then((res) => res.json())
      .then((data) => setJuegos(data));
  }, []);

  return (
    <div>
      <Navbar onAgregarJuego={() => setMostrarFormularioJuego(true)} />

      {/* Mostrar formulario solo cuando se presiona el botón */}
      {mostrarFormularioJuego && (
        <FormularioJuego
          onClose={() => setMostrarFormularioJuego(false)}
          recargar={() => window.location.reload()}
        />
      )}

      <BibliotecaJuegos juegos={juegos} />
    </div>
  );
}

export default App;
