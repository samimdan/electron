import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 250,
    height: 1000,
    //  disable menu

    fullscreen: false,
    show: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(app.getAppPath(), './dist-electron/preload.js'),
      autoplayPolicy: 'no-user-gesture-required',
      nodeIntegration: true,
    },
  })
  //set interval to update webcontents every 30 minutes
  setInterval(() => {
    mainWindow?.webContents.send('getDay', '')
    mainWindow?.webContents.send('getAzanSobh', '')
    mainWindow?.webContents.send('getAzanZohr', '')
    mainWindow?.webContents.send('getAzanMaghreb', '')
  }, 18000000)
  //ipcMain: Listens for events in themain process.
  mainWindow.webContents.on('did-frame-finish-load', () => {
    mainWindow?.webContents.send('getDay', '')
    mainWindow?.webContents.send('getAzanSobh', '')
    mainWindow?.webContents.send('getAzanZohr', '')
    mainWindow?.webContents.send('getAzanMaghreb', '')
  })
  ipcMain.on('playAzan', () => {
    mainWindow?.webContents.send('playAzan', '')
  })
  mainWindow.on('ready-to-show', mainWindow.show)
  mainWindow.loadURL('http://localhost:5000')
}

app
  .whenReady()
  .then(() => {
    createWindow()
  })
  .catch(error => {
    console.error('Failed to create window:', error)
  })
//set interval to update webcontents every 30 minutes
