const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    FetchAPI: async (url, options) => {
        try {
            const response = await ipcRenderer.invoke('fetch-canvas', { url, options });
            return await response;
        } catch (error) {
            throw error;
        }
        },
    StartDownload: async (url) => {
        return new Promise((resolve, reject) => {
            ipcRenderer.send("download", { payload: { fileUrl: url } });

            ipcRenderer.once("download-completed", (event, filePath) => {
                resolve({ success: true, filePath });
            });

            ipcRenderer.once("download-error", (event, errorMessage) => {
                reject({ success: false, error: errorMessage });
            });
        });
    },
});