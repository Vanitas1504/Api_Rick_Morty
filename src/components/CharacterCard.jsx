import './CharacterCard.css';

/**
 * Componente de tarjeta de personaje.
 * Muestra imagen, nombre, especie, estado y género del personaje.
 */
function CharacterCard({ character }) {
  const statusClass = character.status.toLowerCase();

  return (
    <article className="character-card" id={`character-card-${character.id}`}>
      <div className="character-card__image-wrapper">
        <img
          className="character-card__image"
          src={character.image}
          alt={`Imagen de ${character.name}`}
          loading="lazy"
        />
        <div className="character-card__image-overlay"></div>
        <span className={`character-card__status-badge character-card__status-badge--${statusClass}`}>
          <span className="character-card__status-dot"></span>
          {character.status}
        </span>
      </div>

      <div className="character-card__body">
        <h3 className="character-card__name" title={character.name}>
          {character.name}
        </h3>
        <div className="character-card__info">
          <div className="character-card__info-row">
            <span className="character-card__info-label">Especie</span>
            <span className="character-card__info-value character-card__info-value--species">
              {character.species}
            </span>
          </div>
          <div className="character-card__info-row">
            <span className="character-card__info-label">Género</span>
            <span className="character-card__info-value character-card__info-value--gender">
              {character.gender}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CharacterCard;
