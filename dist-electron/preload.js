"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const jalaliDays_1 = require("./jalaliDays");
//ipcRenderer: Sends/receives events in the renderer process (React).
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    onCallFunction: (callback) => {
        electron_1.ipcRenderer.on('getDay', (_event, data) => {
            const dayPromise = (0, jalaliDays_1.getDay)();
            dayPromise
                .then(day => {
                callback(day);
            })
                .catch(error => {
                callback('Check your internet connection');
            });
        });
    },
});
electron_1.contextBridge.exposeInMainWorld('azanAPI', {
    onCallFunction: (callback) => {
        electron_1.ipcRenderer.on('getAzanSobh', (_event, data) => {
            const azanSobhPromise = (0, jalaliDays_1.getAzanSobh)();
            azanSobhPromise
                .then(azanSobh => {
                callback(azanSobh);
            })
                .catch(error => {
                callback(error);
            });
        });
    },
});
electron_1.contextBridge.exposeInMainWorld('azanZohrAPI', {
    onCallFunction: (callback) => {
        electron_1.ipcRenderer.on('getAzanZohr', (_event, data) => {
            const azanZohrPromise = (0, jalaliDays_1.getAzanZohr)();
            azanZohrPromise
                .then(azanZohr => {
                console.log('azanZohr', azanZohr);
                callback(azanZohr);
            })
                .catch(error => {
                console.log('error', error);
            });
        });
    },
});
electron_1.contextBridge.exposeInMainWorld('azanMaghrebAPI', {
    onCallFunction: (callback) => {
        electron_1.ipcRenderer.on('getAzanMaghreb', (_event, data) => {
            const azanZohrPromise = (0, jalaliDays_1.getAzanMaghreb)();
            azanZohrPromise
                .then(getAzanMaghreb => {
                callback(getAzanMaghreb);
            })
                .catch(error => {
                console.log('error', error);
            });
        });
    },
});
