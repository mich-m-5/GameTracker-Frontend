import React, { useState } from "react";
import "./FormularioResena.css";

function FormularioResena({ idJuego }) {
  const [texto, setTexto] = useState("");

  const enviarResena = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:4000/api/resenas/${idJuego}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto }),
    });

    setTexto("");
  };

  return (
    <form className="form-resena" onSubmit={enviarResena}>
      <h3>Deja tu reseña</h3>

      <textarea
        placeholder="Escribe tu reseña..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      ></textarea>

      <button type="submit">Enviar reseña</button>
    </form>
  );
}

export default FormularioResena;
