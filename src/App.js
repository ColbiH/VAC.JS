import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Jenny from './legacy/Jenny';
import BackEnd from './legacy/BackEnd';
import Login from './components/Login';
import FrontEnd from "./legacy/FrontEnd";
import Intro from "./components/Intro";
import PrintVsGrade from "./components/PrintVsGrade";
import './App.css';
import FetchClassesAndQuizzes from "../api/FetchClassesAndQuizzes";
import AssignmentTreeBrowser from "./AssignmentTreeBrowser";
import AssignmentDisplay from "./AssignmentDisplay";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path = "/" element = {<Intro />} />
                <Route path = "/sam" element = {<AssignmentsDisplay/>} />
                <Route path = "/assignmentsam" element = {<AssignmentsDisplay/>} />
                <Route path = "/jenny" element = {<Jenny />} />
                <Route path = "/valentina" element = {<FrontEnd />} />
                <Route path = "/backend" element = {<BackEnd />} />
                <Route path = "/login" element = {<Login />}/>
                <Route path = "/printvsgrade" element = {<PrintVsGrade />} />
                <Route path = "/fetchclassesquizzes" element = {<FetchClassesAndQuizzes />} />
<<<<<<< HEAD:src/components/App.js
                <Route path = "/fetchclassassignments" element = {<AssignmentTreeBrowser />} />
                <Route path = "/assignmenttable" element = {<AssignmentDisplay />} />
=======
                <Route path = "/fetchclassesassignments" element = {<FetchClassesAndAssignments />} />
>>>>>>> master:src/App.js
            </Routes>
        </div>
    );
}

export default App;
