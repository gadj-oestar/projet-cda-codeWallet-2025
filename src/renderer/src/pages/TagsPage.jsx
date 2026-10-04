import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import { useFragments } from '../hooks/useFragments'
import { pluralize } from '../utils/format'
import { groupByTag } from '../utils/tags'

function TagsPage() {
  const { fragments, loading, error } = useFragments()
  const tags = groupByTag(fragments)

  return (
    <>
      <PageHeader title="Tags" subtitle={loading ? 'Chargement…' : pluralize(tags.length, 'tag')} />

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
