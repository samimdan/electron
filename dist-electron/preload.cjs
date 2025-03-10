"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const resourceManager_1 = require("./resourceManager");
const systemInfoApi = {
    cpuCount: (0, resourceManager_1.getCpuCount)(),
};
electron_1.contextBridge.exposeInMainWorld('systemInfoApi', systemInfoApi);
