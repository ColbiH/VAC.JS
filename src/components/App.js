import React, { useState } from 'react';
import FrontEnd from './FrontEnd';
import BackEnd from './BackEnd';
import "./App.css"
import { Button, InstUISettingsProvider, canvas } from '@instructure/ui'

function App() {
    const [currentPage, setCurrentPage] = useState(null);
    const changePage = (page) => {
        setCurrentPage(page);

    };

    return (
        <div className="App">
            <header className="App-header">
                {currentPage === null && <h1>My React App</h1>}
                {currentPage === null && (
                    <>
                        <button onClick={() => changePage('frontend')}>Go to FrontEnd</button>
                        <button onClick={() => changePage('backend')}>Go to BackEnd</button>
                    </>
                )}
            </header>
            {currentPage === 'frontend' && <FrontEnd />}
            {currentPage === 'backend' && <BackEnd />}
        </div>
    );
}

export default App;
