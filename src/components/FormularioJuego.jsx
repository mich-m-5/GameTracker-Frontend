import React, { useState } from "react";
import axios from "axios";
import "./FormularioJuego.css";

function FormularioJuego({ onAgregar, onClose }) {
  const [titulo, setTitulo] = useState("");
  const [portada, setPortada] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [completado, setCompletado] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "titulo":
        if (!value.trim()) return "El título es obligatorio";
        return "";
      case "portada":
        if (!value.trim()) return "La portada es obligatoria";
        try {
          const u = new URL(value);
          if (!/^https?:/.test(u.protocol)) return "Debe ser URL http/https";
        } catch {
          return "URL inválida";
        }
        return "";
      case "descripcion":
        if (!value.trim()) return "La descripción es obligatoria";
        return "";
      case "plataforma":
        if (!value) return "Selecciona una plataforma";
        return "";
      default:
        return "";
    }
  };

  const setAndValidate = (name, value) => {
    if (name === "titulo") setTitulo(value);
    if (name === "portada") setPortada(value);
    if (name === "descripcion") setDescripcion(value);
    if (name === "tipo") setTipo(value);
    if (name === "plataforma") setPlataforma(value);

    
    const msg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    setTouched({ titulo: true, portada: true, descripcion: true, plataforma: true });

    
    const nextErrors = {
      titulo: validateField("titulo", titulo),
      portada: validateField("portada", portada),
      descripcion: validateField("descripcion", descripcion),
      plataforma: validateField("plataforma", plataforma),
    };
    setErrors(nextErrors);
    const hasErrors = Object.values(nextErrors).some((m) => m);
    if (hasErrors) return; // stop submit if invalid

    try {
      const resp = await axios.post("http://localhost:4000/api/juegos", {
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
      if (onAgregar) onAgregar(resp.data);
      if (onClose) onClose();
    } catch (error) {
      console.error("❌ Error al agregar el juego:", error);
      alert("Error al agregar el juego");
    }
  };

  return (
    <form className="formulario-juego" onSubmit={manejarEnvio} noValidate>
      <h2>Agregar nuevo juego</h2>

      <label>Título:</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setAndValidate("titulo", e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, titulo: true }))}
        placeholder="Nombre del juego"
        required
      />
      {touched.titulo && errors.titulo && (
        <small className="error">{errors.titulo}</small>
      )}

      <label>URL de la portada:</label>
      <input
        type="text"
        value={portada}
        onChange={(e) => setAndValidate("portada", e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, portada: true }))}
        placeholder="Ej: https://imagen.com/juego.jpg"
        required
      />
      {touched.portada && errors.portada && (
        <small className="error">{errors.portada}</small>
      )}

      <label>Descripción:</label>
      <textarea
        value={descripcion}
        onChange={(e) => setAndValidate("descripcion", e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, descripcion: true }))}
        placeholder="Escribe una breve descripción del juego"
        required
      ></textarea>
      {touched.descripcion && errors.descripcion && (
        <small className="error">{errors.descripcion}</small>
      )}

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
        onChange={(e) => setAndValidate("plataforma", e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, plataforma: true }))}
        required
      >
        <option value="">Selecciona una plataforma</option>
        <option value="PC">PC</option>
        <option value="Celular">Celular</option>
        <option value="Consola">Consola</option>
      </select>
      {touched.plataforma && errors.plataforma && (
        <small className="error">{errors.plataforma}</small>
      )}

      <label>
        <input
          type="checkbox"
          checked={completado}
          onChange={() => setCompletado(!completado)}
        />
        ¿Completado?
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Agregar juego</button>
        {onClose && (
          <button type="button" className="btn" onClick={onClose}>Cancelar</button>
        )}
      </div>
    </form>
  );
}

export default FormularioJuego;
