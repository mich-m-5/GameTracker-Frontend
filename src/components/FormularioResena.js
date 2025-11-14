import React, { useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

function FormularioResena({ juegoId }) {
  const [estrellas, setEstrellas] = useState(0);
  const [comentario, setComentario] = useState("");

  const enviarResena = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/resenas", {
        juego: juegoId,
        estrellas,
        comentario,
      });
      alert("✅ Reseña enviada correctamente");
      setComentario("");
      setEstrellas(0);
    } catch (error) {
      console.error("❌ Error al enviar reseña:", error);
      alert("Error al enviar la reseña");
    }
  };

  // Configuración de estrellas animadas
  const configEstrellas = {
    size: 45,
    count: 5,
    color: "#ccc",         // color base (gris)
    activeColor: "#FFD700", // color dorado al seleccionar
    value: estrellas,
    isHalf: true,          // permite medias estrellas ⭐
    onChange: (valor) => setEstrellas(valor),
  };

  return (
    <form className="form-resena" onSubmit={enviarResena}>
      <h3>Deja tu reseña</h3>

      {/* ⭐ Estrellas interactivas */}
      <ReactStars {...configEstrellas} />

      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="¿Cómo te fue con el juego?"
        required
      />

      <button type="submit">Enviar reseña</button>
    </form>
  );
}

export default FormularioResena;
