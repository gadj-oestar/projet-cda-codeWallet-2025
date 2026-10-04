import { ipcMain } from 'electron'
import {
  findAllFragments,
  createFragment,
  updateFragment,
  deleteFragment
} from './fragmentRepository.js'

// Exécute une écriture et renvoie toujours { success, error? } au renderer.
function runWrite(label, action) {
  try {
    action()
    return { success: true }
  } catch (error) {
    console.error(`Erreur (${label}) :`, error)
    return { success: false, error: error.message }
  }
}

export function registerFragmentHandlers() {
  ipcMain.handle('getFragments', () => {
    try {
      return findAllFragments()
    } catch (error) {
      console.error('Erreur (getFragments) :', error)
      return []
    }
  })

  ipcMain.handle('addFragment', (_event, fragment) =>
    runWrite('addFragment', () => createFragment(fragment))
  )

  ipcMain.handle('updateFragment', (_event, fragment) =>
    runWrite('updateFragment', () => updateFragment(fragment))
  )

  ipcMain.handle('deleteFragment', (_event, id) =>
    runWrite('deleteFragment', () => deleteFragment(id))
  )
}
