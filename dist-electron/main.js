"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
function createWindow() {
    const mainWindow = new electron_1.BrowserWindow({
        width: 250,
        height: 1000,
        //  disable menu
        fullscreen: false,
        show: false,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            preload: path_1.default.join(electron_1.app.getAppPath(), './dist-electron/preload.js'),
            autoplayPolicy: 'no-user-gesture-required',
            nodeIntegration: true,
        },
    });
    //set interval to update webcontents every 30 minutes
    setInterval(() => {
        mainWindow?.webContents.send('getDay', '');
        mainWindow?.webContents.send('getAzanSobh', '');
        mainWindow?.webContents.send('getAzanZohr', '');
        mainWindow?.webContents.send('getAzanMaghreb', '');
    }, 1800000);
    //ipcMain: Listens for events in themain process.
    mainWindow.webContents.on('did-frame-finish-load', () => {
        mainWindow?.webContents.send('getDay', '');
        mainWindow?.webContents.send('getAzanSobh', '');
        mainWindow?.webContents.send('getAzanZohr', '');
        mainWindow?.webContents.send('getAzanMaghreb', '');
    });
    electron_1.ipcMain.on('playAzan', () => {
        mainWindow?.webContents.send('playAzan', '');
    });
    mainWindow.on('ready-to-show', mainWindow.show);
    mainWindow.loadURL('http://localhost:5000');
}
electron_1.app
    .whenReady()
    .then(() => {
    createWindow();
})
    .catch(error => {
    console.error('Failed to create window:', error);
    electron_1.dialog.showErrorBox('Error', `Failed to create window: ${error.message}`);
});
//set interval to update webcontents every 30 minutes
