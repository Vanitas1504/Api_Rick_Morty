import './Loading.css';

/**
 * Componente de carga con animación de portal.
 * Se muestra mientras se obtienen datos de la API.
 */
function Loading() {
  return (
    <div className="loading" id="loading-spinner">
      <div className="loading__portal">
        <div className="loading__ring"></div>
        <div className="loading__ring"></div>
        <div className="loading__ring"></div>
        <div className="loading__center-dot"></div>
      </div>
      <p className="loading__text">Abriendo portal interdimensional...</p>
    </div>
  );
}

export default Loading;
