import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import FilterBar from '../components/FilterBar'
import FragmentCard from '../components/FragmentCard'
import FragmentForm from '../components/FragmentForm'
import CodeViewer from '../components/CodeViewer'
import Modal from '../components/Modal'
import { useFragments } from '../hooks/useFragments'
import { pluralize } from '../utils/format'
import { filterFragments, groupByTag } from '../utils/tags'

// Durée de l'animation de sortie d'une carte (voir .is-leaving dans styles.css).
const LEAVE_DURATION = 200

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function NewFragmentButton({ label }) {
  return (
    <Link to="/formulaire" className="button button-primary">
      <FiPlus aria-hidden="true" />
      {label}
    </Link>
  )
}

function FragmentsPage() {
  const { fragments, loading, error, updateFragment, deleteFragment } = useFragments()
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState(null)
  const [viewed, setViewed] = useState(null)
  const [edited, setEdited] = useState(null)
  const [leavingId, setLeavingId] = useState(null)

  const visible = filterFragments(fragments, { search, tag: activeTag })

  const handleDelete = async (fragment) => {
    if (!window.confirm(`Supprimer le fragment « ${fragment.title} » ?`)) return
    setLeavingId(fragment.id)
    await wait(LEAVE_DURATION)
    try {
      await deleteFragment(fragment.id)
    } catch (err) {
      window.alert(err.message)
    } finally {
      setLeavingId(null)
    }
  }

  const handleSaveEdit = async (values) => {
    await updateFragment({ ...edited, ...values })
    setEdited(null)
  }

  const renderList = () => {
    if (loading) return null

    if (fragments.length === 0) {
      return (
        <EmptyState
          title="Aucun fragment pour l'instant"
          text="Ajoutez votre premier fragment de code pour le retrouver ici."
        >
          <NewFragmentButton label="Créer un fragment" />
        </EmptyState>
      )
    }

    if (visible.length === 0) {
      return (
        <EmptyState title="Aucun résultat" text="Essayez une autre recherche ou un autre tag." />
      )
    }

    return (
      <section className="grid">
        {visible.map((fragment, index) => (
          <FragmentCard
            key={fragment.id}
            fragment={fragment}
            index={index}
            leaving={fragment.id === leavingId}
            onView={() => setViewed(fragment)}
            onEdit={() => setEdited(fragment)}
            onDelete={() => handleDelete(fragment)}
          />
        ))}
      </section>
    )
  }

  return (
    <>
      <PageHeader
        title="Fragments"
        subtitle={loading ? 'Chargement…' : pluralize(fragments.length, 'fragment')}
      >
        <NewFragmentButton label="Nouveau fragment" />
      </PageHeader>

      {error && <p className="form-error">{error}</p>}

      {fragments.length > 0 && (
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          tags={groupByTag(fragments)}
          activeTag={activeTag}
          onTagChange={setActiveTag}
        />
      )}

      {renderList()}

      {viewed && (
        <Modal title={viewed.title} onClose={() => setViewed(null)} wide>
          <p className="tag tag-static">#{viewed.tag}</p>
          {viewed.content ? (
            <CodeViewer code={viewed.content} tag={viewed.tag} />
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
