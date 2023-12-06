import React from "react";
import "./QuizzesDisplay.css";
import {useLocation} from "react-router-dom";
import QuizzesTreeBrowser from "./QuizzesTreeBrowser";

//Another component which could be combined with the sub component, but was originally created for sub dividing main pages
function QuizzesDisplay() {
    const location = useLocation();

    return (
        <>
            <div style={{ paddingRight: 200 }}>
                <QuizzesTreeBrowser login={location.state.login} classes={location.state.classes}/>
            </div>
        </>
    );
}

export default QuizzesDisplay;