import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Jenny from './legacy/Jenny';
import BackEnd from './legacy/BackEnd';
import Login from './components/Login';
import FrontEnd from "./legacy/FrontEnd";
import Intro from "./components/Intro";
import PrintVsGrade from "./components/PrintVsGrade";
import './App.css';
import FetchClassesAndQuizzes from "./api/FetchClassesAndQuizzes";
import FetchClassesAndAssignments from "./api/FetchClassesAndAssignments";
import AssignmentsDisplay from "./components/Grading/AssignmentsDisplay";
import QuizzesDisplay from "./components/Printing/QuizzesDisplay";

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Origin/Development Page */}
                <Route path = "/" element = {<Intro />} />

                {/* Login Page */}
                <Route path = "/login" element = {<Login />}/>

                {/* Program Selection Page */}
                <Route path = "/printvsgrade" element = {<PrintVsGrade />} />

                {/* API Call followed by PDF Page */}
                <Route path = "/fetchclassesquizzes" element = {<FetchClassesAndQuizzes />} />
                <Route path = "/sam" element = {<QuizzesDisplay/>} />

                {/* API Call followed by Grading Page */}
                <Route path = "/fetchclassesassignments" element = {<FetchClassesAndAssignments />} />
                <Route path = "/assignmentsam" element = {<AssignmentsDisplay/>} />

                {/* Legacy Pages Pending Deletion */}
                <Route path = "/jenny" element = {<Jenny />} />
                <Route path = "/valentina" element = {<FrontEnd />} />
                <Route path = "/backend" element = {<BackEnd />} />
            </Routes>
        </div>
    );
}

export default App;
