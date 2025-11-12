import React, { useState } from "react";
import axios from "axios";

const FormularioJuego = ({ onAgregar }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
    horasJugadas: "",
    completado: false,
    puntuacion: "",
    portada: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/juegos", formData);
      onAgregar(res.data);
      setFormData({
        titulo: "",
        plataforma: "",
        genero: "",
        horasJugadas: "",
        completado: false,
        puntuacion: "",
        portada: "",
      });
      alert("✅ Juego agregado correctamente");
    } catch (error) {
      alert("❌ Error al agregar el juego");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-juego">
      <h2>➕ Agregar nuevo juego</h2>

      <input
        type="text"
        name="titulo"
        placeholder="Título del juego"
        value={formData.titulo}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="plataforma"
        placeholder="Plataforma"
        value={formData.plataforma}
        onChange={handleChange}
      />

      <input
        type="text"
        name="genero"
        placeholder="Género"
        value={formData.genero}
        onChange={handleChange}
      />

      <input
        type="number"
        name="horasJugadas"
        placeholder="Horas jugadas"
        value={formData.horasJugadas}
        onChange={handleChange}
      />

      <label>
        <input
          type="checkbox"
          name="completado"
          checked={formData.completado}
          onChange={handleChange}
        />
        ¿Completado?
      </label>

      <input
        type="number"
        name="puntuacion"
        placeholder="Puntuación (0-5)"
        min="0"
        max="5"
        value={formData.puntuacion}
        onChange={handleChange}
      />

      <input
        type="text"
        name="portada"
        placeholder="URL de la portada"
        value={formData.portada}
        onChange={handleChange}
      />

      <button type="submit">Agregar</button>
    </form>
  );
};

export default FormularioJuego;
