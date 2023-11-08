import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Jenny from './Jenny';
import BackEnd from './BackEnd';
import QuizzesDisplay from './QuizzesDisplay';
import Login from './Login';
import FrontEnd from "./FrontEnd";
import Intro from "./Intro";
import PrintVsGrade from "./PrintVsGrade";
import './App.css';
import FetchClassesAndQuizzes from "../api/FetchClassesAndQuizzes";
import AssignmentTreeBrowser from "./AssignmentTreeBrowser";
import AssignmentDisplay from "./AssignmentDisplay";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path = "/" element = {<Intro />} />
                <Route path = "/sam" element = {<QuizzesDisplay/>} />
                <Route path = "/jenny" element = {<Jenny />} />
                <Route path = "/valentina" element = {<FrontEnd />} />
                <Route path = "/backend" element = {<BackEnd />} />
                <Route path = "/login" element = {<Login />}/>
                <Route path = "/printvsgrade" element = {<PrintVsGrade />} />
                <Route path = "/fetchclassesquizzes" element = {<FetchClassesAndQuizzes />} />
                <Route path = "/fetchclassassignments" element = {<AssignmentTreeBrowser />} />
                <Route path = "/assignmenttable" element = {<AssignmentDisplay />} />
            </Routes>
        </div>
    );
}

export default App;
