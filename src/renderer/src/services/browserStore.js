// Remplace l'API Electron quand l'appli tourne dans un navigateur (version web).
// Les fragments sont gardés dans le localStorage, avec la même forme de réponse que l'IPC.

const STORAGE_KEY = 'code-wallet:fragments'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

function save(fragments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fragments))
}

// Exécute une écriture et renvoie toujours { success, error? }, comme le processus principal.
function runWrite(change) {
  try {
    save(change(load()))
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

function nextId(fragments) {
  return fragments.reduce((max, fragment) => Math.max(max, fragment.id), 0) + 1
}

export const browserStore = {
  getFragments: async () => load(),
  addFragment: async ({ title, tag, content = '' }) =>
    runWrite((list) => [...list, { id: nextId(list), title, tag, content }]),
  updateFragment: async ({ id, title, tag, content = '' }) =>
    runWrite((list) => list.map((item) => (item.id === id ? { id, title, tag, content } : item))),
  deleteFragment: async (id) => runWrite((list) => list.filter((item) => item.id !== id))
}
