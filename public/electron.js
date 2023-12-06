const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const { shell } = require('electron');
const isDev = require('electron-is-dev');
let mainWindow;


//Function to compile and run Java code
//This utilizes whatever default PATH Variable setup is used for Java
//If a user has Java installed (JRE) then code will execute as the path variable is defined correctly
//Works cross platform and is simple, but can result in unforseen issues in niche situations
function compileAndRunJavaFile(filePath, testcases, callback) {
    let grade = 0;
    const compileAndRunCommand = `javac ${filePath} && java -cp ${path.dirname(filePath)} ${path.basename(filePath, '.java')}`;

    const javaProcess = exec(compileAndRunCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Exit Code:', error.code);
            callback(-1);
        } else {
            console.log('Exit Code:', 0);
            callback(grade);
        }
    });

    //Deals with 1 basic test case
    //Simple writing in of a string
    javaProcess.stdin.write(testcases.sampleInput+'\n');
    javaProcess.stdin.end();

    //Sends back the grade
    javaProcess.stdout.on('data', data => {
        console.log('Java execution output:', data.toString());
        if (data.toString().trim() === testcases.expectedOutput.trim()){
            grade += testcases.points;
        }
    });
}

//Same approach, but with C++
//Works with any compiler that has been setup with g++ as PATH Variable.
//Not as straight forward as Python or Java
function compileAndRunCPPFile(filePath, testcases, callback) {
    let grade = 0;
    const compileAndRunCommand = `g++ ${filePath} -o ${path.basename(filePath, '.cpp')} && ./${path.basename(filePath, '.cpp')}`;
    const cppProcess = exec(compileAndRunCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Exit Code:', error.code);
            callback(-1);
        } else {
            console.log('Exit Code:', 0);
            callback(grade);
        }
    });

    cppProcess.stdin.write(testcases.sampleInput+'\n');
    cppProcess.stdin.end();

    cppProcess.stdout.on('data', data => {
        console.log('C++ execution output:', data.toString());
        if (data.toString().trim() === testcases.expectedOutput.trim()){
            grade += testcases.points;
        }
    });
}

//Same as Java, utilizes default Python PATH installation as well
function compileAndRunPythonFile(filePath, testcases, callback) {
    let grade = 0;
    const runCommand = `python ${filePath}`;

    const pythonProcess = exec(runCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Exit Code:', error.code);
            callback(-1);
        } else {
            console.log('Exit Code:', 0);
            callback(grade);
        }
    });

    pythonProcess.stdin.write(testcases.sampleInput+'\n');
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', data => {
        console.log('Python execution output:', data.toString());
        if (data.toString().trim() === testcases.expectedOutput.trim()){
            grade += testcases.points;
        }
    });
}

function createWindow() {
    //API call routed through Electron
    //This is done as a solution to CORS issues
    ipcMain.handle('fetch-canvas', async (event, { url, options }) => {
        try {
            const response = await fetch(url, options);
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return { error: error.message };
        }
    });

//Download Files and saves them to a folder /downloads
    ipcMain.on('download', (event, { payload }) => {
        const { fileUrl, testcases } = payload;

        const appPath = app.getAppPath();

        mainWindow.webContents.downloadURL(fileUrl);

        mainWindow.webContents.session.once('will-download', (event, item) => {
            const downloadPath = path.join(appPath, 'downloads');
            const savePath = path.join(downloadPath, item.getFilename());
            let grade = 0;
            item.setSavePath(savePath);
            //When download is complete program is compiled and run
            //Grade is then returned to the react application
            item.once('done', (event, state) => {
                if (state === 'completed') {
                    const fileExtension = path.extname(savePath);

                    if (fileExtension === '.java') {
                        compileAndRunJavaFile(savePath, testcases, (result) => {
                            grade = result;
                            mainWindow.webContents.send('grade', { grade });
                        })
                    } else if (fileExtension === '.py') {
                        compileAndRunPythonFile(savePath, (result) => {
                            grade = result;
                            mainWindow.webContents.send('grade', { grade });
                        })
                    } else if  (fileExtension === '.cpp') {
                        compileAndRunCPPFile(savePath, (result) => {
                            grade = result;
                            mainWindow.webContents.send('grade', { grade });
                        })
                    } else {
                        console.error('Unsupported file type:', fileExtension);
                    }
                }
            });
        });
    });

    //Opens link in default browser in any OS
    ipcMain.on('link', (url) => {
        shell.openExternal(url);
    });

    //Initializes the Electron application
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        title: 'VAC.JS',
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            enableRemoteModule: true,
            //Needs to preload compatibility layer with react application
            preload: path.join(__dirname, 'preload.js')
        },
    });

    //Loads React APP
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    //Opens debug tools
    if (isDev){
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
