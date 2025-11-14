import React, { useState } from "react";
import axios from "axios";

function FormularioJuego({ onAgregar }) {
  const [titulo, setTitulo] = useState("");
  const [portada, setPortada] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [completado, setCompletado] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/juegos", {
        titulo,
        portada,
        descripcion,
        tipo,
        plataforma,
        completado,
      });
      alert("✅ Juego agregado correctamente");
      setTitulo("");
      setPortada("");
      setDescripcion("");
      setTipo("");
      setPlataforma("");
      setCompletado(false);
      if (onAgregar) onAgregar();
    } catch (error) {
      console.error("❌ Error al agregar el juego:", error);
      alert("Error al agregar el juego");
    }
  };

  return (
    <form className="formulario-juego" onSubmit={manejarEnvio}>
      <h2>Agregar nuevo juego</h2>

      <label>Título:</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nombre del juego"
        required
      />

      <label>URL de la portada:</label>
      <input
        type="text"
        value={portada}
        onChange={(e) => setPortada(e.target.value)}
        placeholder="Ej: https://imagen.com/juego.jpg"
        required
      />

      <label>Descripción:</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Escribe una breve descripción del juego"
        required
      ></textarea>

      <label>Tipo de juego:</label>
      <input
        type="text"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        placeholder="Ej: Acción, Aventura, RPG..."
      />

      <label>Plataforma:</label>
      <select
        value={plataforma}
        onChange={(e) => setPlataforma(e.target.value)}
        required
      >
        <option value="">Selecciona una plataforma</option>
        <option value="PC">PC</option>
        <option value="Celular">Celular</option>
        <option value="Consola">Consola</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={completado}
          onChange={() => setCompletado(!completado)}
        />
        ¿Completado?
      </label>

      <button type="submit">Agregar juego</button>
    </form>
  );
}

export default FormularioJuego;
