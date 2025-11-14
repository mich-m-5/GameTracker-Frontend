import React, { useEffect, useState } from "react";

function ListaResenas({ idJuego }) {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/resenas/${idJuego}`)
      .then((res) => res.json())
      .then((data) => setResenas(data));
  }, [idJuego]);

  return (
    <div className="lista-resenas">
      <h4> Reseñas de este juego</h4>

      {resenas.length === 0 ? (
        <p>No hay reseñas todavía.</p>
      ) : (
        resenas.map((r) => (
          <div key={r._id} className="resena-item">
            <p>{r.texto}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ListaResenas;
