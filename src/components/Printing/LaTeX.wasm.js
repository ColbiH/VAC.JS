import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    InstUISettingsProvider,
    canvas,
} from '@instructure/ui';
import "./QuizzesDisplay.css";
import {Alert} from "@instructure/ui-alerts";


function App({ template }) {
    const iframeRef = useRef(null);
    const [error, setError] = useState(null);
    //Function that communicates with the IFrame layer where compilation of LaTeX takes place
    //Not ideal, but it works till LaTeX wasm can be integrated in
    function compileLatexInIframe() {
        setError(null);
        const iframe = iframeRef.current;
        iframe.contentWindow.postMessage(template, '*');
        //Error Handler
        window.addEventListener('message', (event) => {
            if (event.source === iframe.contentWindow) {
                const data = event.data;
                if (data.type === 'error') {
                    console.error('Error in iframe:', data.message);
                    setError('PDF Compilation failed. Please try a different Quiz');
                }
            }
        });
    }

    useEffect(() => {
        //Makes .WASM Invisible
        //Very useful for debugging because when commenting out this IFrame display the log and LaTeX editor can be viewed
        iframeRef.current.style.display = 'none';
    }, []);

    return (
        <div>
            <iframe
                ref={iframeRef}
                src="/LaTeX.wasm/pdftex_basic.html"
                title="LaTeX Compilation"
                width="100%"
                height="1200"
                frameBorder="0"
                scrolling="no"
            ></iframe>
            <div className="download-button-pdf">
                <InstUISettingsProvider theme={canvas}>
                    <Button onClick={compileLatexInIframe}
                            color="primary"
                            margin="small">Download</Button>
                </InstUISettingsProvider>
            </div>
            {error && (
                <div className='alert'>
                    <Alert variant="error" margin="small">
                        ERROR: {error}
                    </Alert>
                </div>
            )}
        </div>

    );
}

export default App;