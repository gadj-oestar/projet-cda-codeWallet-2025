// Point d'accès unique à l'API exposée par le preload (window.api).
// Une réponse { success: false } est transformée en erreur pour simplifier les appels.

function getApi() {
  if (!window.api) {
    throw new Error("L'API Electron n'est pas disponible.")
  }
  return window.api
}

async function write(call) {
  const response = await call(getApi())
  if (!response?.success) {
    throw new Error(response?.error || "L'opération a échoué.")
  }
}

export const fragmentApi = {
  getAll: () => getApi().getFragments(),
  add: (fragment) => write((api) => api.addFragment(fragment)),
  update: (fragment) => write((api) => api.updateFragment(fragment)),
  remove: (id) => write((api) => api.deleteFragment(id))
}
