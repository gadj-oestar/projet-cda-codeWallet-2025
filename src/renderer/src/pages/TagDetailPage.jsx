import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import { useFragments } from '../hooks/useFragments'
import { fragmentApi } from '../services/fragmentApi'

function TagDetailPage() {
  const { tagName } = useParams()
  const navigate = useNavigate()
  const { fragments, loading, reload } = useFragments()
  const [newTag, setNewTag] = useState(tagName)
  const [error, setError] = useState('')

  // Remet le champ à jour quand on change de tag (après un renommage par exemple).
  useEffect(() => setNewTag(tagName), [tagName])

  const tagged = fragments.filter((fragment) => fragment.tag === tagName)

  const handleRename = async (event) => {
    event.preventDefault()
    const renamed = newTag.trim()
    if (!renamed || renamed === tagName) return

    try {
      for (const fragment of tagged) {
        await fragmentApi.update({ ...fragment, tag: renamed })
      }
      await reload()
      navigate(`/tag/${encodeURIComponent(renamed)}`, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async () => {
    const message = `Supprimer le tag « ${tagName} » et ses ${tagged.length} fragment(s) ?`
    if (!window.confirm(message)) return

    try {
      for (const fragment of tagged) {
        await fragmentApi.remove(fragment.id)
      }
      navigate('/tag')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <button type="button" className="back-link" onClick={() => navigate('/tag')}>
        <FiArrowLeft aria-hidden="true" />
        Tous les tags
      </button>

      <PageHeader
        title={`#${tagName}`}
        subtitle={loading ? 'Chargement…' : `${tagged.length} fragment(s)`}
      />

      <div className="tag-detail">
        <section className="card">
          <h2 className="section-title">Renommer le tag</h2>
          <form className="form" onSubmit={handleRename}>
            <div className="field">
              <label htmlFor="new-tag">Nouveau nom</label>
              <input
                id="new-tag"
                type="text"
                required
                value={newTag}
                onChange={(event) => setNewTag(event.target.value)}
              />
            </div>
            {error && <p className="form-error">{error}</p>}
            <div className="form-actions">
              <button type="submit" className="button button-primary">
                Renommer
              </button>
            </div>
          </form>

          <div className="danger-zone">
            <div>
              <h2 className="section-title">Supprimer le tag</h2>
              <p className="muted">Supprime aussi tous les fragments associés.</p>
            </div>
            <button type="button" className="button button-danger" onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        </section>

        <section className="card">
          <h2 className="section-title">Fragments associés</h2>
          {tagged.length > 0 ? (
            <ul className="simple-list">
              {tagged.map((fragment) => (
                <li key={fragment.id}>{fragment.title}</li>
              ))}
            </ul>
          ) : (
            <p className="muted">Aucun fragment avec ce tag.</p>
          )}
        </section>
      </div>
    </>
  )
}

export default TagDetailPage
