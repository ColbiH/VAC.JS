const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const https = require('https');
const fs = require('fs');

let mainWindow;

function createWindow() {
    ipcMain.handle('fetch-canvas', async (event, { url, options }) => {
        try {
            console.log(url);
            console.log(options);
            const response = await fetch(url, options);
            console.log(response);
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return { error: error.message };
        }
    });

//Download Files
    ipcMain.on('download', (event, { payload }) => {
        const { fileUrl } = payload;
        console.log(fileUrl);
        mainWindow.webContents.downloadURL(fileUrl);

        mainWindow.webContents.session.once('will-download', (event, item, webContents) => {
            item.once('done', (event, state) => {
                if (state === 'completed') {
                    event.sender.send('download-completed', item.getSavePath());
                } else {
                    event.sender.send('download-error', 'Download failed');
                }
            });
        });
    });

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    mainWindow.loadURL('http://localhost:3000');

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
