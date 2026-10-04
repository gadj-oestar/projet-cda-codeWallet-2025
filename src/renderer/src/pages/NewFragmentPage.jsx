import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import FragmentForm from '../components/FragmentForm'
import { fragmentApi } from '../services/fragmentApi'

function NewFragmentPage() {
  const navigate = useNavigate()

  const handleCreate = async (fragment) => {
    await fragmentApi.add(fragment)
    navigate('/fragment')
  }

  return (
    <>
      <PageHeader title="Nouveau fragment" subtitle="Donnez un titre et un tag à votre fragment." />
      <div className="card form-card">
        <FragmentForm
          submitLabel="Créer le fragment"
          onSubmit={handleCreate}
          onCancel={() => navigate('/fragment')}
        />
      </div>
    </>
  )
}

export default NewFragmentPage
