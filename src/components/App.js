import React, { useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Jenny from './Jenny';
import BackEnd from './BackEnd';
import Sam from './Sam';
import Login from './Login';
import FrontEnd from "./FrontEnd";
import Intro from "./Intro";
import PrintVsGrade, {loader as PvgLoader} from "./PrintVsGrade";
import { Heading } from '@instructure/ui-heading';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState(null);
    const changePage = (page) => {
        setCurrentPage(page);
    };
    const navigate = useNavigate();

    return (
        <div className="App">
            <Routes>
                <Route path = "/" element = {<Intro />} />
                <Route path = "/sam" element = {<Sam />} />
                <Route path = "/jenny" element = {<Jenny />} />
                <Route path = "/valentina" element = {<FrontEnd />} />
                <Route path = "/backend" element = {<BackEnd />} />
                <Route path = "/login" element = {<Login />}/>
                <Route path = "/printvsgrade" element = {<PrintVsGrade />} />
            </Routes>

        {/*    <header className="App-header">*/}
        {/*        {currentPage === null && <Heading>WELCOME TO VAC.JS</Heading>}*/}
        {/*        {currentPage === null && (*/}
        {/*            <>*/}
        {/*                /!*<button onClick={() => changePage('jenny')}>Go to Jenny</button>*!/*/}
        {/*                /!*<button onClick={() => changePage('sam')}>Go to Sam</button>*!/*/}
        {/*                /!*<button onClick={() => changePage('valentina')}>Go to Valentina</button>*!/*/}
        {/*                /!*<button onClick={() => changePage('backend')}>Go to BackEnd</button>*!/*/}
        {/*                /!*<button onClick={() => changePage('login')}>Go to Login</button>*!/*/}
        {/*                <button onClick={() => navigate("/jenny")}>Go to Jenny</button>*/}
        {/*                <button onClick={() => navigate("/sam")}>Go to Sam</button>*/}
        {/*                <button onClick={() => navigate("/valentina")}>Go to Valentina</button>*/}
        {/*                <button onClick={() => navigate("/backend")}>Go to BackEnd</button>*/}
        {/*                <button onClick={() => navigate("/login")}>Go to Login</button>*/}
        {/*            </>*/}
        {/*        )}*/}
        {/*    </header>*/}
        {/*    /!*{currentPage === 'jenny' && <Jenny />}*!/*/}
        {/*    /!*{currentPage === 'sam' && <Sam />}*!/*/}
        {/*    /!*{currentPage === 'valentina' && <FrontEnd />}*!/*/}
        {/*    /!*{currentPage === 'backend' && <BackEnd />}*!/*/}
        {/*    /!*{currentPage === 'login' && <Login />}*!/*/}
        </div>
    );
}

export default App;
