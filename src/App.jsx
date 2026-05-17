import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CharactersPage from './pages/CharactersPage';
import SpeciesPage from './pages/SpeciesPage';
import ErrorPage from './pages/ErrorPage';
import './App.css';

/**
 * Componente principal de la aplicación.
 * Gestiona las rutas y el layout general.
 */
function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="app__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/personajes" element={<CharactersPage />} />
          <Route path="/especies" element={<SpeciesPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <footer className="footer">
        <p className="footer__text">
          Hecho con <span className="footer__heart">❤️</span> usando React &{' '}
          <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">
            Rick and Morty API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
