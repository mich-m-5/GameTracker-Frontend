import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import FormularioJuego from "./components/FormularioJuego";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [mostrarFormularioJuego, setMostrarFormularioJuego] = useState(false);

  const actualizarJuego = (id, nuevaResena) => {
    setJuegos(prev =>
      prev.map(j =>
        j._id === id
          ? { ...j, resenas: [...(j.resenas || []), nuevaResena] }
          : j
      )
    );
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/juegos")
      .then((res) => res.json())
      .then((data) => setJuegos(data.map(j => ({ ...j, resenas: [] }))));
  }, []);

  return (
    <div>
      <Navbar onAgregarJuego={() => setMostrarFormularioJuego(true)} />

      {mostrarFormularioJuego && (
        <Modal onClose={() => setMostrarFormularioJuego(false)}>
          <FormularioJuego
            onAgregar={(nuevo) => setJuegos((prev) => [...prev, { ...nuevo, resenas: [] }])}
            onClose={() => setMostrarFormularioJuego(false)}
          />
        </Modal>
      )}


      <BibliotecaJuegos
        juegos={juegos}
        actualizarJuego={actualizarJuego}
        recargar={() => window.location.reload()}
      />
    </div>
  );
}

export default App;
