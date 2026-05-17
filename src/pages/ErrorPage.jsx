import { Link } from 'react-router-dom';
import './ErrorPage.css';

/**
 * Página de error (404 o errores generales).
 * Se muestra cuando la ruta no existe.
 */
function ErrorPage() {
  return (
    <main className="error-page" id="error-page">
      <div className="error-page__content">
        <div className="error-page__visual">
          <span className="error-page__code">404</span>
          <div className="error-page__portal-lost">
            <div className="error-page__ring error-page__ring--1"></div>
            <div className="error-page__ring error-page__ring--2"></div>
          </div>
        </div>
        <h1 className="error-page__title">Dimensión No Encontrada</h1>
        <p className="error-page__message">
          Parece que este portal te llevó a una dimensión que no existe.
          <br />
          Rick no programó esta ruta... todavía.
        </p>
        <Link to="/" className="error-page__link" id="error-go-home">
          🌀 Volver al Inicio
        </Link>
      </div>
    </main>
  );
}

export default ErrorPage;
