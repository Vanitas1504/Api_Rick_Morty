import CharacterCard from './CharacterCard';
import './CharacterList.css';

/**
 * Componente de listado de personajes en cuadrícula.
 * Incluye título, contador, tarjetas y paginación.
 */
function CharacterList({ characters, title, subtitle, page, totalPages, onPageChange }) {
  if (!characters || characters.length === 0) {
    return (
      <section className="character-list">
        <div className="character-list__header">
          <h1 className="character-list__title">
            <span className="character-list__title-accent">{title || 'Personajes'}</span>
          </h1>
        </div>
        <div className="character-list__empty">
          <div className="character-list__empty-icon">🛸</div>
          <p className="character-list__empty-text">
            No se encontraron personajes en esta dimensión.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="character-list" id="character-list-section">
      <div className="character-list__header">
        <h1 className="character-list__title">
          <span className="character-list__title-accent">{title || 'Personajes'}</span>
        </h1>
        {subtitle && <p className="character-list__subtitle">{subtitle}</p>}
        <div className="character-list__count">
          🌀 {characters.length} personajes en esta página
        </div>
      </div>

      <div className="character-list__grid" id="character-grid">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="character-list__pagination" id="pagination">
          <button
            className="character-list__page-btn"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            id="pagination-prev"
          >
            ← Anterior
          </button>
          <span className="character-list__page-info">
            Página <strong>{page}</strong> de <strong>{totalPages}</strong>
          </span>
          <button
            className="character-list__page-btn"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            id="pagination-next"
          >
            Siguiente →
          </button>
        </div>
      )}
    </section>
  );
}

export default CharacterList;
