import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

/**
 * Componente de navegación principal.
 * Incluye logo, enlaces de navegación y menú responsive.
 */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" id="navbar-main">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-icon">🌀</span>
          <span className="navbar__logo-text">Rick & Morty</span>
        </Link>

        <button
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
          id="navbar-toggle"
        >
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
        </button>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`} id="navbar-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              onClick={closeMenu}
              id="nav-link-home"
            >
              <span className="navbar__link-icon">🏠</span>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/personajes"
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              onClick={closeMenu}
              id="nav-link-characters"
            >
              <span className="navbar__link-icon">👥</span>
              Personajes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/especies"
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              onClick={closeMenu}
              id="nav-link-species"
            >
              <span className="navbar__link-icon">🧬</span>
              Filtrar por Especie
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
