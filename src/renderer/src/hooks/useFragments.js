import { useCallback, useEffect, useState } from 'react'
import { fragmentApi } from '../services/fragmentApi'

// Charge la liste des fragments et expose les actions qui la modifient.
export function useFragments() {
  const [fragments, setFragments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    setLoading(true)
    try {
      setFragments(await fragmentApi.getAll())
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const updateFragment = async (updated) => {
    await fragmentApi.update(updated)
    setFragments((list) => list.map((item) => (item.id === updated.id ? updated : item)))
  }

  const deleteFragment = async (id) => {
    await fragmentApi.remove(id)
    setFragments((list) => list.filter((item) => item.id !== id))
  }

  return { fragments, loading, error, reload, updateFragment, deleteFragment }
}
