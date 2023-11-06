import React, { useEffect, useRef } from 'react';

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
            <button onClick={compileLatexInIframe}>Compile LaTeX</button>
        </div>
    );
}

export default App;
