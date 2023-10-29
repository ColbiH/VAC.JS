import {Heading} from "@instructure/ui-heading";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Intro () {
    const [currentPage, setCurrentPage] = useState(null);
    const changePage = (page) => {
        setCurrentPage(page);
    };
    const navigate = useNavigate();

    return (
    <header className="App-header">
        {currentPage === null && <Heading>WELCOME TO VAC.JS</Heading>}
        {currentPage === null && (
            <>
                {/*<button onClick={() => changePage('jenny')}>Go to Jenny</button>*/}
                {/*<button onClick={() => changePage('sam')}>Go to Sam</button>*/}
                {/*<button onClick={() => changePage('valentina')}>Go to Valentina</button>*/}
                {/*<button onClick={() => changePage('backend')}>Go to BackEnd</button>*/}
                {/*<button onClick={() => changePage('login')}>Go to Login</button>*/}
                <button onClick={() => navigate("/jenny")}>Go to Jenny</button>
                <button onClick={() => navigate("/sam")}>Go to Sam</button>
                <button onClick={() => navigate("/valentina")}>Go to Valentina</button>
                <button onClick={() => navigate("/backend")}>Go to BackEnd</button>
                <button onClick={() => navigate("/login")}>Go to Login</button>
            </>
        )}
    </header>
    );
}
export default Intro;
