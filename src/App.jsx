import React, { useState, useEffect } from "react";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import Navbar from "./components/navbar";
import FormularioJuego from "./components/FormularioJuego";
import Ranking from "./components/Ranking";
import axios from "axios";
import "./App.css";

function App() {
  const [openAgregar, setOpenAgregar] = useState(false);
  const [juegos, setJuegos] = useState([]);

  // cargar juegos desde backend
  useEffect(() => {
    axios.get("http://localhost:4000/api/juegos")
      .then(res => {
        setJuegos(res.data);   // AJUSTA ESTO si tu backend responde distinto
      })
      .catch(err => console.error("Error cargando juegos:", err));
  }, []);

  const refrescar = () => {
    axios.get("http://localhost:4000/api/juegos")
      .then(res => setJuegos(res.data))
      .catch(err => console.error("Error:", err));
  };

  return (
    <div className="App dark-theme">
      <Navbar onOpenAgregar={() => setOpenAgregar(true)} />

      {openAgregar && (
        <div className="modal-backdrop" onClick={() => setOpenAgregar(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpenAgregar(false)}>✕</button>
            <FormularioJuego onAgregar={refrescar} />
          </div>
        </div>
      )}

      <main>
        <h1 className="page-title">🎮 GameTracker</h1>
        <div className="contenido-principal">

          {/* AHORA SÍ LE PASAMOS LOS JUEGOS */}
          <BibliotecaJuegos juegos={juegos} />

          <Ranking />
        </div>
      </main>
    </div>
  );
}

export default App;
