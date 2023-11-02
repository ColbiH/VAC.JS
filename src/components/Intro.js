import {Heading} from "@instructure/ui-heading";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Intro () {
    const navigate = useNavigate();

    return (
    <header className="App-header">
       <Heading>WELCOME TO VAC.JS</Heading>
            <>
                <button onClick={() => navigate("/jenny")}>Go to Jenny</button>
                <button onClick={() => navigate("/sam")}>Go to Sam</button>
                <button onClick={() => navigate("/valentina")}>Go to Valentina</button>
                <button onClick={() => navigate("/backend")}>Go to BackEnd</button>
                <button onClick={() => navigate("/login")}>Go to Login</button>
            </>
    </header>
    );
}
export default Intro;
