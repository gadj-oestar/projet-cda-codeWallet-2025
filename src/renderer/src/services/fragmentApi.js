import { browserStore } from './browserStore'

// Point d'accès unique aux données.
// Dans Electron, window.api (preload) parle à SQLite ; dans un navigateur, browserStore prend le relais.
// Une réponse { success: false } est transformée en erreur pour simplifier les appels.

const api = window.api ?? browserStore

async function write(call) {
  const response = await call()
  if (!response?.success) {
    throw new Error(response?.error || "L'opération a échoué.")
  }
}

export const fragmentApi = {
  getAll: () => api.getFragments(),
  add: (fragment) => write(() => api.addFragment(fragment)),
  update: (fragment) => write(() => api.updateFragment(fragment)),
  remove: (id) => write(() => api.deleteFragment(id))
}
