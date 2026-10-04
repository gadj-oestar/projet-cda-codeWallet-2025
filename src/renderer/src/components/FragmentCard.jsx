import { Link } from 'react-router-dom'
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi'

function FragmentCard({ fragment, onView, onEdit, onDelete }) {
  return (
    <article className="card fragment-card">
      <h2 className="fragment-title">{fragment.title}</h2>
      <Link to={`/tag/${encodeURIComponent(fragment.tag)}`} className="tag">
        #{fragment.tag}
      </Link>

      <div className="card-actions">
        <button type="button" className="icon-button" onClick={onView} aria-label="Voir">
          <FiEye />
        </button>
        <button type="button" className="icon-button" onClick={onEdit} aria-label="Modifier">
          <FiEdit2 />
        </button>
        <button
          type="button"
          className="icon-button icon-button-danger"
          onClick={onDelete}
          aria-label="Supprimer"
        >
          <FiTrash2 />
        </button>
      </div>
    </article>
  )
}

export default FragmentCard
