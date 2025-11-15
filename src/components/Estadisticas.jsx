import React from "react";
import "./Estadisticas.css";

function Estadisticas({ juegos = [], onRecalcular }) {
  const totalJuegos = juegos.length;
  const totalResenas = juegos.reduce((acc, j) => {
    if (typeof j.reviewCount === "number") return acc + j.reviewCount;
    if (Array.isArray(j.resenas)) return acc + j.resenas.length;
    return acc;
  }, 0);


  const weightedSum = juegos.reduce((acc, j) => {
    const rc = typeof j.reviewCount === "number" ? j.reviewCount : (Array.isArray(j.resenas) ? j.resenas.length : 0);
    const ar = typeof j.avgRating === "number" ? j.avgRating : 0;
    return acc + ar * rc;
  }, 0);


  const generalAvg = totalResenas > 0 ? (weightedSum / totalResenas).toFixed(2) : "0.00";


  const top3 = [...juegos]
    .sort((a, b) => {
      const arA = a.avgRating || 0;
      const arB = b.avgRating || 0;
      if (arB !== arA) return arB - arA;
      const rcA = a.reviewCount || 0;
      const rcB = b.reviewCount || 0;
      if (rcB !== rcA) return rcB - rcA;
      return String(a.titulo || "").localeCompare(String(b.titulo || ""));
    })
    .slice(0, 3);

    
  return (
    <section className="stats-container">
      <h2 className="stats-title">Estadísticas</h2>
      {onRecalcular && (
        <div className="stats-actions">
          <button className="btn" onClick={onRecalcular}>Recalcular estadísticas</button>
        </div>
      )}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Cantidad total de juegos</div>
          <div className="stat-value">{totalJuegos}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Promedio general de la biblioteca</div>
          <div className="stat-value">⭐ {generalAvg}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Número total de reseñas</div>
          <div className="stat-value">{totalResenas}</div>
        </div>
      </div>

      <div className="top-container">
        <div className="top-title">Top 3 mejores juegos</div>
        {top3.length === 0 ? (
          <div className="top-empty">Aún no hay reseñas</div>
        ) : (
          <ol className="top-list">
            {top3.map((j) => (
              <li key={j._id} className="top-item">
                <span className="top-name">{j.titulo}</span>
                <span className="top-rating">⭐ {Number(j.avgRating || 0).toFixed(2)}</span>
                <span className="top-reviews">({j.reviewCount || (j.resenas?.length || 0)} reseñas)</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default Estadisticas;