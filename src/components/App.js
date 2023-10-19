import React, { useState } from 'react';
import Jenny from './Jenny';
import BackEnd from './BackEnd';
import Sam from './Sam';
import Login from './Login';
import FrontEnd from "./FrontEnd";
import { Heading } from '@instructure/ui-heading'
import './App.css'

function App() {
    const [currentPage, setCurrentPage] = useState(null);
    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="App">
            <header className="App-header">
                {currentPage === null && <Heading>WELCOME TO çVAC.JS</Heading>}
                {currentPage === null && (
                    <>
                        <button onClick={() => changePage('jenny')}>Go to Jenny</button>
                        <button onClick={() => changePage('sam')}>Go to Sam</button>
                        <button onClick={() => changePage('valentina')}>Go to Valentina</button>
                        <button onClick={() => changePage('backend')}>Go to BackEnd</button>
                        <button onClick={() => changePage('login')}>Go to Login</button>

                    </>
                )}
            </header>
            {currentPage === 'jenny' && <Jenny />}
            {currentPage === 'sam' && <Sam />}
            {currentPage === 'valentina' && <FrontEnd />}
            {currentPage === 'backend' && <BackEnd />}
            {currentPage === 'login' && <Login />}
        </div>
    );
}

export default App;
