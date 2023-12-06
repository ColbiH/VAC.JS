import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import PrintVsGrade from "./components/PrintVsGrade";
import './App.css';
import FetchClassesAndQuizzes from "./api/FetchClassesAndQuizzes";
import FetchClassesAndAssignments from "./api/FetchClassesAndAssignments";
import AssignmentsDisplay from "./components/Grading/AssignmentsDisplay";
import QuizzesDisplay from "./components/Printing/QuizzesDisplay";
import FetchAssignmentSubmissions from "./api/FetchAssignmentSubmissions";

//React Router setup in the root of the application
function App() {
    return (
        // <div className="App">
            <Routes>
                {/* Origin/Development Page */}
                <Route path = "/" element = {<Login />} />

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
                <Route path = "/fetchsassignmentsubmissions" element = {<FetchAssignmentSubmissions />} />
            </Routes>
        // </div>
    );
}

export default App;
