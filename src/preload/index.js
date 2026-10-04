import { contextBridge, ipcRenderer } from 'electron'

// API exposée au renderer sous window.api
contextBridge.exposeInMainWorld('api', {
  getFragments: () => ipcRenderer.invoke('getFragments'),
  addFragment: (fragment) => ipcRenderer.invoke('addFragment', fragment),
  updateFragment: (fragment) => ipcRenderer.invoke('updateFragment', fragment),
  deleteFragment: (id) => ipcRenderer.invoke('deleteFragment', id)
})
