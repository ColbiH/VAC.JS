import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Jenny from './legacy/Jenny';
import BackEnd from './legacy/BackEnd';
import QuizzesDisplay from './components/Printing/QuizzesDisplay';
import Login from './components/Login';
import FrontEnd from "./legacy/FrontEnd";
import Intro from "./components/Intro";
import PrintVsGrade from "./components/PrintVsGrade";
import './App.css';
import FetchClassesAndQuizzes from "./api/FetchClassesAndQuizzes";
import FetchClassesAndAssignments from "./api/FetchClassesAndAssignments";
import GSam from "./components/Grading/GSam";
import AssignmentsDisplay from "./components/Grading/AssignmentsDisplay";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path = "/" element = {<Intro />} />
                <Route path = "/sam" element = {<QuizzesDisplay/>} />
                <Route path = "/gsam" element = {<AssignmentsDisplay/>} />
                <Route path = "/jenny" element = {<Jenny />} />
                <Route path = "/valentina" element = {<FrontEnd />} />
                <Route path = "/backend" element = {<BackEnd />} />
                <Route path = "/login" element = {<Login />}/>
                <Route path = "/printvsgrade" element = {<PrintVsGrade />} />
                <Route path = "/fetchclassesquizzes" element = {<FetchClassesAndQuizzes />} />
                <Route path = "/fetchclassesassignments" element = {<FetchClassesAndAssignments />} />
            </Routes>
        </div>
    );
}

export default App;
