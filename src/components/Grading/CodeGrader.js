import React from 'react';

async function fetchAttachment(attachmentUrl, fileName) {
    try {
        const response = await fetch(attachmentUrl);
        if (response.ok) {
            const blob = await response.blob();
            const filePath = fileName;

            const fs = window.require('fs');
            const writeStream = fs.createWriteStream(filePath);
            writeStream.write(Buffer.from(await blob.arrayBuffer()));
            writeStream.end();

            writeStream.on('finish', () => {
                console.log('File saved successfully');
            });
        } else {
            console.error('Error downloading the file:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error downloading the file:', error);
    }
}

function CodeGrader({ data }) {
    if (!data || data.length === 0) {
        return <div>Loading...</div>;
    }

    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if(data[i].workflow_state === "submitted"){
                let codedownload = data[i].attachments[0].url;
                console.log(data[i].attachments[0]);

                fetchAttachment(codedownload, i)
                    .then((filePath) => {
                        console.log('Downloaded file at:', filePath);
                        const { spawn } = window.require('child_process');
                        const path = window.require('path');

                        const javaFilePath = filePath;

                        const baseFileName = path.basename(javaFilePath, path.extname(javaFilePath));

                        const compileProcess = spawn('javac', [javaFilePath]);


                        compileProcess.on('close', (compileExitCode) => {
                            if (compileExitCode === 0) {
                                const runProcess = spawn('java', [baseFileName]);

                                runProcess.stdout.on('data', (data) => {
                                    //Java Inputs
                                    runProcess.stdin.write('2\n');
                                    runProcess.stdin.write('2\n');
                                    console.log(`Java Program Output: ${data}`);
                                });

                                runProcess.stderr.on('data', (data) => {
                                    console.error(`Java Program Error: ${data}`);
                                });

                                runProcess.on('close', (runExitCode) => {
                                    if (runExitCode === 0) {
                                        console.log('Java Program executed successfully.');
                                    } else {
                                        console.error(`Error executing Java Program. Exit code: ${runExitCode}`);
                                    }
                                });
                            } else {
                                console.error(`Error compiling Java file. Exit code: ${compileExitCode}`);
                            }
                        });
                    })
                    .catch((error) => {
                        console.error('Download error:', error);
                    });

            }
        }
    }

    //return (
        //<div>
            // <LaTeXWasm template={Template(data)} />
        //</div>
    //);
}

export default CodeGrader;
