import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CharacterList from '../components/CharacterList';
import Loading from '../components/Loading';
import './SpeciesPage.css';

// Especies disponibles para filtrar
const SPECIES_OPTIONS = [
  { value: '', label: 'Todas las Especies', icon: '🌀' },
  { value: 'Human', label: 'Human', icon: '🧑' },
  { value: 'Alien', label: 'Alien', icon: '👽' },
  { value: 'Robot', label: 'Robot', icon: '🤖' },
  { value: 'Mythological Creature', label: 'Mythological Creature', icon: '🐉' },
  { value: 'Animal', label: 'Animal', icon: '🐾' },
  { value: 'Humanoid', label: 'Humanoid', icon: '🧬' },
  { value: 'Cronenberg', label: 'Cronenberg', icon: '🧟' },
  { value: 'Disease', label: 'Disease', icon: '🦠' },
  { value: 'Poopybutthole', label: 'Poopybutthole', icon: '💛' },
  { value: 'unknown', label: 'Desconocido', icon: '❓' },
];

/**
 * Página de filtrado por especie.
 * Permite seleccionar una especie y ver los personajes filtrados.
 * Usa parámetros de consulta (query params) en la URL.
 */
function SpeciesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSpecies = searchParams.get('species') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!currentSpecies) {
      setCharacters([]);
      setTotalPages(1);
      setLoading(false);
      return;
    }

    const fetchBySpecies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?species=${encodeURIComponent(currentSpecies)}&page=${currentPage}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            setCharacters([]);
            setTotalPages(1);
            return;
          }
          throw new Error(`Error ${response.status}: No se pudieron obtener los personajes`);
        }
        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError(err.message);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBySpecies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSpecies, currentPage]);

  const handleSpeciesChange = (species) => {
    if (species) {
      setSearchParams({ species, page: '1' });
    } else {
      setSearchParams({});
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ species: currentSpecies, page: String(newPage) });
  };

  return (
    <main className="species-page" id="species-page">
      {/* Header + Filter */}
      <section className="species-page__header">
        <div className="species-page__header-content">
          <h1 className="species-page__title">
            Filtrar por <span className="species-page__title-accent">Especie</span>
          </h1>
          <p className="species-page__subtitle">
            Selecciona una especie para explorar los personajes del multiverso
          </p>
        </div>

        <div className="species-page__filters" id="species-filters">
          {SPECIES_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={`species-page__filter-btn ${currentSpecies === option.value ? 'species-page__filter-btn--active' : ''}`}
              onClick={() => handleSpeciesChange(option.value)}
              id={`filter-${option.value || 'all'}`}
            >
              <span className="species-page__filter-icon">{option.icon}</span>
              <span className="species-page__filter-label">{option.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      {error && (
        <div className="species-page__error" id="species-error">
          <span>⚠️</span> {error}
        </div>
      )}

      {!currentSpecies && !loading && (
        <div className="species-page__prompt" id="species-prompt">
          <div className="species-page__prompt-icon">👆</div>
          <p className="species-page__prompt-text">
            Selecciona una especie para ver los personajes
          </p>
        </div>
      )}

      {loading ? (
        <Loading />
      ) : (
        currentSpecies && (
          <CharacterList
            characters={characters}
            title={`Especie: ${currentSpecies}`}
            subtitle={`Mostrando personajes de tipo "${currentSpecies}"`}
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )
      )}
    </main>
  );
}

export default SpeciesPage;
