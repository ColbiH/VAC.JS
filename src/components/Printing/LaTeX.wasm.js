import React, { useEffect, useRef } from 'react';
import {
    Button,
    InstUISettingsProvider,
    canvas,
    Checkbox,
    NumberInput
} from '@instructure/ui';
import "./QuizzesDisplay.css";


function App({ template }) {
    const iframeRef = useRef(null);

    function compileLatexInIframe() {
        const iframe = iframeRef.current;

        iframe.contentWindow.postMessage(template, '*');
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
            <div className="download-button">
                {/*<button onClick={compileLatexInIframe}>Compile LaTeX</button>*/}

                {/*//TODO: Connect to LaTeX builder and convert to proper units for onChange, or to correspond with "download" button*/}
                <NumberInput renderLabel="How many lines would you like for free-response questions?"
                             showArrows ={false}
                             placeholder={"10"}/>
                <br></br>

                {/*//TODO: make onChange for checked option*/}
                <Checkbox label={'Use alt-text for images'} value="medium" />

                <InstUISettingsProvider theme={canvas}>
                    <Button onClick={compileLatexInIframe} color="danger" margin="small">Download</Button>
                </InstUISettingsProvider>
            </div>
        </div>
    );
}

export default App;
