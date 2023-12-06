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
    function compileLatexInIframe() {
        setError(null);
        const iframe = iframeRef.current;
        iframe.contentWindow.postMessage(template, '*');
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