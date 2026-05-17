import { useState, useEffect } from 'react';
import CharacterList from '../components/CharacterList';
import Loading from '../components/Loading';
import './HomePage.css';

/**
 * Página de inicio.
 * Muestra un hero banner y el listado paginado de todos los personajes.
 */
function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudieron obtener los personajes`);
        }
        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (error) {
    return (
      <div className="home-error" id="home-error">
        <div className="home-error__icon">⚠️</div>
        <h2 className="home-error__title">¡Wubba Lubba Dub Dub!</h2>
        <p className="home-error__message">{error}</p>
        <button className="home-error__retry" onClick={() => setPage(page)}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <main id="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero__content">
          <div className="hero__badge">🌌 Explora el Multiverso</div>
          <h1 className="hero__title">
            Rick <span className="hero__title--accent">&</span> Morty
            <br />
            <span className="hero__title--sub">Explorer</span>
          </h1>
          <p className="hero__description">
            Descubre todos los personajes del multiverso. Explora especies, estados
            y filtra entre más de 800 personajes de la serie.
          </p>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">826+</span>
              <span className="hero__stat-label">Personajes</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-value">42</span>
              <span className="hero__stat-label">Páginas</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-value">∞</span>
              <span className="hero__stat-label">Dimensiones</span>
            </div>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__portal">
            <div className="hero__portal-ring hero__portal-ring--1"></div>
            <div className="hero__portal-ring hero__portal-ring--2"></div>
            <div className="hero__portal-ring hero__portal-ring--3"></div>
            <div className="hero__portal-core"></div>
          </div>
        </div>
      </section>

      {/* Character List */}
      {loading ? (
        <Loading />
      ) : (
        <CharacterList
          characters={characters}
          title="Todos los Personajes"
          subtitle="Explora el catálogo completo de personajes del multiverso"
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}

export default HomePage;
