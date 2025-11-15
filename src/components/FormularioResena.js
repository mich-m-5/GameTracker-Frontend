import React, { useState } from "react";
import "./FormularioResena.css";

function FormularioResena({ idJuego }) {
  const [texto, setTexto] = useState("");
  const [estrellas, setEstrellas] = useState(0);
  const [hover, setHover] = useState(0);
  const [trigger, setTrigger] = useState(0); // para avisar a ListaResenas

  const enviarResena = async (e) => {
    e.preventDefault();
    if (estrellas === 0) return alert("Selecciona una puntuación.");

    try {
      const resp = await fetch("http://localhost:4000/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ juegoId: idJuego, texto, estrellas }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        alert("Error al enviar la reseña: " + data.message);
        return;
      }

      setTexto("");
      setEstrellas(0);
      setHover(0);

      // ⚡ aumentar trigger para avisar a ListaResenas
      setTrigger((prev) => prev + 1);
    } catch (err) {
      console.error("Error enviando reseña:", err);
      alert("Error al enviar la reseña");
    }
  };

  return (
    <div>
      <form className="form-resena" onSubmit={enviarResena}>
        <h3>Deja tu reseña</h3>

        <div style={{ display: "flex", gap: 5, fontSize: 25 }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              onClick={() => setEstrellas(s)}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              style={{
                cursor: "pointer",
                color: s <= (hover || estrellas) ? "#FFD700" : "#999",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Escribe tu reseña..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        ></textarea>

        <button type="submit">Enviar reseña</button>
      </form>

      {/* Lista de reseñas dentro del mismo archivo */}
      <ListaResenas idJuego={idJuego} nuevaResenaTrigger={trigger} />
    </div>
  );
}

export default FormularioResena;
