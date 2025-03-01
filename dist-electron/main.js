"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const util_js_1 = require("./util.js");
electron_1.app.on("ready", () => {
    const MainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    if ((0, util_js_1.isDev)()) {
        MainWindow.loadURL("http://localhost:5000");
    }
    else {
        MainWindow.loadFile(path_1.default.join(electron_1.app.getAppPath(), "/dist-react/index.html"));
    }
});
