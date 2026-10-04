import { FiSearch } from 'react-icons/fi'

// Champ de recherche + pastilles pour filtrer par tag.
function FilterBar({ search, onSearchChange, tags, activeTag, onTagChange }) {
  return (
    <div className="filter-bar">
      <label className="search">
        <FiSearch aria-hidden="true" />
        <input
          type="search"
          placeholder="Rechercher un titre, un tag ou du code"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="chips" role="group" aria-label="Filtrer par tag">
        <button
          type="button"
          className={`chip ${activeTag === null ? 'chip-active' : ''}`}
          onClick={() => onTagChange(null)}
        >
          Tous
        </button>
        {tags.map(({ name }) => (
          <button
            key={name}
            type="button"
            className={`chip ${activeTag === name ? 'chip-active' : ''}`}
            onClick={() => onTagChange(activeTag === name ? null : name)}
          >
            #{name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar
