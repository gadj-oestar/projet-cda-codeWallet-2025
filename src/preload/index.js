import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  addFragment: (fragment) => ipcRenderer.invoke('addFragment', fragment),
  getFragments: () => ipcRenderer.invoke('getFragments')
});
