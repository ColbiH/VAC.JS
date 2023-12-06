//Preload acts as the Bridge Between Electron and React
//Functions need to be specified here to send messages to Electron
//These utilize window.api in the react code
//If the code relies on these functions it will ONLY work in Electron such as API calls

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    //All API-calls
    FetchAPI: async (url, options) => {
        try {
            const response = await ipcRenderer.invoke('fetch-canvas', { url, options });
            return await response;
        } catch (error) {
            throw error;
        }
        },
    //Download link and Test Cases for Grading of a Submission
    StartDownload: async (url, testcases) => {
        ipcRenderer.send("download", { payload: { fileUrl: url, testcases } });
    },
    //Callback to listen for response for a student's submission
    ListenForGrade: (callback) => {
        ipcRenderer.on('grade', (event, data) => {
            callback(data.grade);
        });
    },
    //Unused, but was used for testing downloads
    //Some API calls return download links with proper authentication in the URL while others do not
    //Often times opening url links in the user's default browser will allow them to access their file.
    //Student submission links have the proper AUTH
    //This is a limit to our AUTH approach
    OpenLinkExternally: async (url) => {
        ipcRenderer.send("link", url);
    },
});