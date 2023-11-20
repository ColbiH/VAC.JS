const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;


function compileAndRunJavaFile(filePath, callback) {
    const compileAndRunCommand = `javac ${filePath} && java -cp ${path.dirname(filePath)} ${path.basename(filePath, '.java')}`;

    const javaProcess = exec(compileAndRunCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Exit Code:', error.code);
            callback(0);
        } else {
            console.log('Exit Code:', 0);
            callback(100);
        }
    });

    javaProcess.stdin.write('2\n');
    javaProcess.stdin.write('2\n');
    javaProcess.stdin.end();

    javaProcess.stdout.on('data', data => {
        console.log('Java execution output:', data.toString());
    });
}

function compileAndRunCPPFile(filePath, callback) {
    const compileAndRunCommand = `g++ ${filePath} -o ${path.basename(filePath, '.cpp')} && ./${path.basename(filePath, '.cpp')}`;

    const cppProcess = exec(compileAndRunCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Exit Code:', error.code);
            callback(0);
        } else {
            console.log('Exit Code:', 0);
            callback(100);
        }
    });

    cppProcess.stdin.write('2\n');
    cppProcess.stdin.write('2\n');
    cppProcess.stdin.end();

    cppProcess.stdout.on('data', data => {
        console.log('C++ execution output:', data.toString());
    });
}

function compileAndRunPythonFile(filePath, callback) {
    const runCommand = `python ${filePath}`;

    const pythonProcess = exec(runCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Exit Code:', error.code);
            callback(100);
        } else {
            console.log('Exit Code:', 0);
            callback(0);
        }
    });

    pythonProcess.stdin.write('2\n');
    pythonProcess.stdin.write('2\n');
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', data => {
        console.log('Python execution output:', data.toString());
    });
}

function createWindow() {
    ipcMain.handle('fetch-canvas', async (event, { url, options }) => {
        try {
            const response = await fetch(url, options);
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return { error: error.message };
        }
    });

//Download Files
    ipcMain.on('download', (event, { payload }) => {
        const { fileUrl } = payload;

        const appPath = app.getAppPath();

        mainWindow.webContents.downloadURL(fileUrl);

        mainWindow.webContents.session.once('will-download', (event, item) => {
            const downloadPath = path.join(appPath, 'downloads');
            const savePath = path.join(downloadPath, item.getFilename());
            let grade = 0;
            item.setSavePath(savePath);

            item.once('done', (event, state) => {
                if (state === 'completed') {
                    const fileExtension = path.extname(savePath);

                    if (fileExtension === '.java') {
                        compileAndRunJavaFile(savePath, (result) => {
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

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        title: 'VAC.JS',
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
