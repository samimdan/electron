import os from 'os'
import { ipcRenderer, contextBridge } from 'electron'
import { getDay, getAzanSobh, getAzanZohr, getAzanMaghreb } from './jalaliDays'

declare global {
  interface Window {
    dayApi: any
    electronAPI: {
      onCallFunction: (callback: (data: string) => void) => void
    }
  }
}
//ipcRenderer: Sends/receives events in the renderer process (React).

contextBridge.exposeInMainWorld('electronAPI', {
  onCallFunction: (callback: (data: string) => string) => {
    ipcRenderer.on('getDay', (_event, data) => {
      const dayPromise = getDay()
      dayPromise
        .then(day => {
          callback(day as string)
        })
        .catch(error => {
          callback('Check your internet connection')
        })
    })
  },
})
contextBridge.exposeInMainWorld('azanAPI', {
  onCallFunction: (callback: (data: string) => string) => {
    ipcRenderer.on('getAzanSobh', (_event, data) => {
      const azanSobhPromise = getAzanSobh()
      azanSobhPromise
        .then(azanSobh => {
          callback(azanSobh as string)
        })
        .catch(error => {
          callback(error as string)
        })
    })
  },
})
contextBridge.exposeInMainWorld('azanZohrAPI', {
  onCallFunction: (callback: (data: string) => string) => {
    ipcRenderer.on('getAzanZohr', (_event, data) => {
      const azanZohrPromise = getAzanZohr()
      azanZohrPromise
        .then(azanZohr => {
          console.log('azanZohr', azanZohr)
          callback(azanZohr as string)
        })
        .catch(error => {
          console.log('error', error)
        })
    })
  },
})
contextBridge.exposeInMainWorld('azanMaghrebAPI', {
  onCallFunction: (callback: (data: string) => string) => {
    ipcRenderer.on('getAzanMaghreb', (_event, data) => {
      const azanZohrPromise = getAzanMaghreb()
      azanZohrPromise
        .then(getAzanMaghreb => {
          callback(getAzanMaghreb as string)
        })
        .catch(error => {
          console.log('error', error)
        })
    })
  },
})
