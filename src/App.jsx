import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import FormularioJuego from "./components/FormularioJuego";
import Modal from "./components/Modal";
import Estadisticas from "./components/Estadisticas";
import "./App.css";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [mostrarFormularioJuego, setMostrarFormularioJuego] = useState(false);
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);
  const [statsSincronizadas, setStatsSincronizadas] = useState(false);
  const [cargando, setCargando] = useState(true);

  const actualizarJuego = (id, nuevaResena) => {
    setJuegos(prev =>
      prev.map(j => {
        if (j._id !== id) return j;
        const resenas = [...(j.resenas || []), nuevaResena];
        const count = resenas.length;
        const sum = resenas.reduce((acc, r) => acc + (r.estrellas || 0), 0);
        const avg = count > 0 ? Number((sum / count).toFixed(2)) : 0;
        return { ...j, resenas, reviewCount: count, avgRating: avg };
      })
    );
  };

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      try {
        const res = await fetch("http://localhost:4000/api/juegos");
        const data = await res.json();
        const juegosConResenas = await Promise.all(
          data.map(async (j) => {
            try {
              const r = await fetch(`http://localhost:4000/api/juegos/${j._id}/resenas`);
              const resenas = await r.json();
              return { ...j, resenas };
            } catch {
              return { ...j, resenas: [] };
            }
          })
        );
        setJuegos(juegosConResenas);

        // Sincronizar avgRating y reviewCount con reseñas reales
        try {
          const r2 = await fetch("http://localhost:4000/api/juegos/recalc-ratings", { method: "POST" });
          const payload = await r2.json();
          const map = new Map((payload.juegos || []).map(j => [String(j.id), j]));
          setJuegos(prev => prev.map(j => {
            const m = map.get(String(j._id));
            return m ? { ...j, avgRating: m.avgRating || 0, reviewCount: m.reviewCount || 0 } : j;
          }));
          setStatsSincronizadas(true);
        } catch {
          setStatsSincronizadas(true);
        }
      } catch (e) {
        // Ignorar errores de carga inicial
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const recalcularStats = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/juegos/recalc-ratings", { method: "POST" });
      const data = await res.json();
      const map = new Map((data.juegos || []).map(j => [String(j.id), j]));
      setJuegos(prev => prev.map(j => {
        const m = map.get(String(j._id));
        return m ? { ...j, avgRating: m.avgRating || 0, reviewCount: m.reviewCount || 0 } : j;
      }));
    } catch (e) {
      // no-op: mantener estado actual
    }
  };

  return (
    <div>
      <Navbar
        onAgregarJuego={() => setMostrarFormularioJuego(true)}
        onVerEstadisticas={() => setMostrarEstadisticas(true)}
      />

      {mostrarFormularioJuego && (
        <Modal onClose={() => setMostrarFormularioJuego(false)}>
          <FormularioJuego
            onAgregar={(nuevo) => setJuegos((prev) => [...prev, { ...nuevo, resenas: [] }])}
            onClose={() => setMostrarFormularioJuego(false)}
          />
        </Modal>
      )}

      {mostrarEstadisticas && (
        <Modal onClose={() => setMostrarEstadisticas(false)}>
          <Estadisticas juegos={juegos} onRecalcular={recalcularStats} />
        </Modal>
      )}


      {cargando ? (
        <div className="sin-juegos">Cargando juegos y reseñas...</div>
      ) : (
        <BibliotecaJuegos
          juegos={juegos}
          actualizarJuego={actualizarJuego}
          recargar={() => window.location.reload()}
        />
      )}
    </div>
  );
}

export default App;
