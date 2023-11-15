const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
        FetchAPI: async (url, options) => {
            try {
                const response = await ipcRenderer.invoke('fetch-canvas', { url, options });
                return await response;
            } catch (error) {
                throw error;
            }
        }
    }
);
