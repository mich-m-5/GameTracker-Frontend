import React, { useEffect, useState } from "react";

const Ranking = () => {
  const [top, setTop] = useState([]);


  return (
    <aside className="ranking">
      <h3>🏆 Top juegos</h3>
      <ol>
        {top.map(j => (
          <li key={j._id}>
            <img src={j.portada} alt={j.titulo} width="40" />
            <div className="meta">
              <strong>{j.titulo}</strong>
              <small>{j.avgRating ? j.avgRating.toFixed(2) : "0.00"} · {j.reviewCount || 0}</small>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
};

export default Ranking;
