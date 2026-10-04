import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import { useFragments } from '../hooks/useFragments'

// Regroupe les fragments par tag : [{ name, count }], triés par ordre alphabétique.
function groupByTag(fragments) {
  const counts = new Map()
  for (const { tag } of fragments) {
    counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

function TagsPage() {
  const { fragments, loading, error } = useFragments()
  const tags = groupByTag(fragments)

  return (
    <>
      <PageHeader
        title="Tags"
        subtitle={loading ? 'Chargement…' : `${tags.length} tag${tags.length > 1 ? 's' : ''}`}
      />

      {error && <p className="form-error">{error}</p>}

      {!loading && tags.length === 0 ? (
        <EmptyState
          title="Aucun tag trouvé"
          text="Les tags apparaissent ici dès que vous créez un fragment."
        />
      ) : (
        <ul className="tag-list">
          {tags.map(({ name, count }) => (
            <li key={name}>
              <Link to={`/tag/${encodeURIComponent(name)}`} className="card tag-card">
                <span className="tag-card-name">#{name}</span>
                <span className="tag-card-count">{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default TagsPage
