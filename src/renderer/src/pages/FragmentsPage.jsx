import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import FragmentCard from '../components/FragmentCard'
import FragmentForm from '../components/FragmentForm'
import Modal from '../components/Modal'
import { useFragments } from '../hooks/useFragments'

SyntaxHighlighter.registerLanguage('javascript', javascript)

function countLabel(count) {
  return `${count} fragment${count > 1 ? 's' : ''}`
}

function FragmentsPage() {
  const { fragments, loading, error, updateFragment, deleteFragment } = useFragments()
  const [viewed, setViewed] = useState(null)
  const [edited, setEdited] = useState(null)

  const handleDelete = async (fragment) => {
    if (!window.confirm(`Supprimer le fragment « ${fragment.title} » ?`)) return
    try {
      await deleteFragment(fragment.id)
    } catch (err) {
      window.alert(err.message)
    }
  }

  const handleSaveEdit = async (values) => {
    await updateFragment({ ...edited, ...values })
    setEdited(null)
  }

  return (
    <>
      <PageHeader
        title="Fragments"
        subtitle={loading ? 'Chargement…' : countLabel(fragments.length)}
      >
        <Link to="/formulaire" className="button button-primary">
          <FiPlus aria-hidden="true" />
          Nouveau fragment
        </Link>
      </PageHeader>

      {error && <p className="form-error">{error}</p>}

      {!loading && fragments.length === 0 ? (
        <EmptyState
          title="Aucun fragment pour l'instant"
          text="Ajoutez votre premier fragment de code pour le retrouver ici."
        >
          <Link to="/formulaire" className="button button-primary">
            <FiPlus aria-hidden="true" />
            Créer un fragment
          </Link>
        </EmptyState>
      ) : (
        <section className="grid">
          {fragments.map((fragment) => (
            <FragmentCard
              key={fragment.id}
              fragment={fragment}
              onView={() => setViewed(fragment)}
              onEdit={() => setEdited(fragment)}
              onDelete={() => handleDelete(fragment)}
            />
          ))}
        </section>
      )}

      {viewed && (
        <Modal title={viewed.title} onClose={() => setViewed(null)} wide>
          <p className="tag tag-static">#{viewed.tag}</p>
          {viewed.content ? (
            <SyntaxHighlighter language="javascript" style={oneDark} className="code-block">
              {viewed.content}
            </SyntaxHighlighter>
          ) : (
            <p className="muted">Aucun code enregistré pour ce fragment.</p>
          )}
        </Modal>
      )}

      {edited && (
        <Modal title="Modifier le fragment" onClose={() => setEdited(null)} wide>
          <FragmentForm
            initialValues={edited}
            submitLabel="Enregistrer"
            onSubmit={handleSaveEdit}
            onCancel={() => setEdited(null)}
          />
        </Modal>
      )}
    </>
  )
}

export default FragmentsPage
