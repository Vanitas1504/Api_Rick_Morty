import { useState, useEffect } from 'react';
import CharacterList from '../components/CharacterList';
import Loading from '../components/Loading';

/**
 * Página de todos los personajes con paginación.
 * Ruta: /personajes
 */
function CharactersPage() {
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
      <div className="home-error" id="characters-error">
        <div className="home-error__icon">⚠️</div>
        <h2 className="home-error__title">¡Error al cargar personajes!</h2>
        <p className="home-error__message">{error}</p>
        <button className="home-error__retry" onClick={() => setPage(page)}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <main id="characters-page" style={{ paddingTop: '20px' }}>
      {loading ? (
        <Loading />
      ) : (
        <CharacterList
          characters={characters}
          title="Todos los Personajes"
          subtitle="Explora el catálogo completo del multiverso de Rick and Morty"
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}

export default CharactersPage;
