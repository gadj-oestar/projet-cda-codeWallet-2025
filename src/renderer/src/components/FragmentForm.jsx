import { useState } from 'react'

// Formulaire titre, tag et code, utilisé pour la création et la modification d'un fragment.
function FragmentForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [tag, setTag] = useState(initialValues?.tag ?? '')
  const [content, setContent] = useState(initialValues?.content ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      await onSubmit({ title: title.trim(), tag: tag.trim(), content })
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="fragment-title">Titre</label>
        <input
          id="fragment-title"
          type="text"
          required
          autoFocus
          placeholder="Ex. : Requête fetch avec async/await"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="fragment-tag">Tag</label>
        <input
          id="fragment-tag"
          type="text"
          required
          placeholder="Ex. : javascript"
          value={tag}
          onChange={(event) => setTag(event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="fragment-content">Code</label>
        <textarea
          id="fragment-content"
          className="code-input"
          rows={10}
          spellCheck={false}
          placeholder="Collez votre code ici"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="button button-ghost" onClick={onCancel}>
            Annuler
          </button>
        )}
        <button type="submit" className="button button-primary" disabled={saving}>
          {saving ? 'Enregistrement…' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default FragmentForm
