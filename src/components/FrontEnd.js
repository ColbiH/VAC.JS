import React from 'react';
import { Button, InstUISettingsProvider, canvas } from '@instructure/ui';
import './FrontEnd.css';
function FrontEnd() {

    return (
    <div className="front">
        <header className="PDF-header">
        <div id="main">

            <h1>PDF View</h1>
        </div>
        </header>

        <InstUISettingsProvider theme={canvas}>
            <Button className= "quiz" size= "large"  > Save as PDF</Button>
        </InstUISettingsProvider>
    </div>

    )
}

export default FrontEnd;
