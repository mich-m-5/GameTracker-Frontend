import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import FormularioJuego from "./components/FormularioJuego";
import "./App.css";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [mostrarFormularioJuego, setMostrarFormularioJuego] = useState(false);

  // ⭐⭐⭐ AQUI LA FUNCIÓN QUE FALTABA ⭐⭐⭐
  const actualizarJuego = (id, nuevaResena) => {
    setJuegos(prev =>
      prev.map(j =>
        j._id === id
          ? { ...j, resenas: [...(j.resenas || []), nuevaResena] }
          : j
      )
    );
  };

  // Cargar juegos del backend
  useEffect(() => {
    fetch("http://localhost:4000/api/juegos")
      .then((res) => res.json())
      .then((data) => setJuegos(data));
  }, []);

  return (
    <div>
      <Navbar onAgregarJuego={() => setMostrarFormularioJuego(true)} />

      {mostrarFormularioJuego && (
        <FormularioJuego
          onClose={() => setMostrarFormularioJuego(false)}
          recargar={() => window.location.reload()}
        />
      )}

      {/* ⭐⭐⭐ AQUI ENVÍO LA FUNCIÓN A LOS HIJOS ⭐⭐⭐ */}
      <BibliotecaJuegos juegos={juegos} actualizarJuego={actualizarJuego} />
    </div>
  );
}

export default App;
