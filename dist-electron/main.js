import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
app.on("ready", () => {
    const MainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    if (isDev()) {
        MainWindow.loadURL("http://localhost:5123");
    }
    else {
        MainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }
});
