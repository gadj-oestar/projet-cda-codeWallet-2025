import { contextBridge, ipcRenderer } from 'electron';

console.log('🚀 Le fichier preload.js a bien été chargé !');

contextBridge.exposeInMainWorld('api', {
  getFragments: () => ipcRenderer.invoke('getFragments'),
  addFragment: (fragment) => ipcRenderer.invoke('addFragment', fragment),
  updateFragment: (fragment) => ipcRenderer.invoke('updateFragment', fragment),
  deleteFragment: (id) => ipcRenderer.invoke('deleteFragment', id),
});
