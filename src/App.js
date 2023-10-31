import React from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; 

import Login from "./grader_pdf/Login";
import Homepage from "./grader_pdf/Homepage";
import Quiz from "./grader_pdf/Quiz";
import Preview from "./grader_pdf/Preview";
import Grader from "./grader_pdf/Grader";

function App() { 
  return ( 
      <> 
          <Router> 
              <Routes> 
                
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/grader" element={<Grader />} />
              <Route path="/preview" element={<Preview />} />
  
              </Routes> 
          </Router> 
      </> 
  ); 
} 

export default App; 

/*
const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/grader" element={<Grader />} />
        </Routes>
      </Router>
  );
};

export default App;
*/