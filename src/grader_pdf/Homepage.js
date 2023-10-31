/*import React from "react";
import Modal from "react-modal";

import { Button, CloseButton, TextArea, TextInput, InstUISettingsProvider, canvas } from '@instructure/ui' //call specific components from here
//import {Routes, Route, useNavigate} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
*/

import { Button, IconPrinterLine, IconGradebookLine, InstUISettingsProvider, Tooltip, canvas } from '@instructure/ui' //call specific components from here


import React from "react"; 
import { useNavigate } from "react-router-dom";

import './Homepage.css';
import NavBar from "./NavBar";


//soruce help: https://www.delftstack.com/howto/react/onclick-redirect-react/
//const Homepage = () => {
function Homepage() { 
    const navigate = useNavigate();

    const handleQuiz = () => {
      navigate('/quiz');
    };

    const handleGrader = () => {
      navigate('/grader');
    };
  
    return (
      <>
      <NavBar />
      
      <div className="quiz-preview">
        <InstUISettingsProvider theme={canvas}>
          <Tooltip color="primary-inverse" renderTip="Quizzes" placement="start" offsetX="5px">
            <Button onClick={handleQuiz} size = "large" margin = "small" renderIcon={IconPrinterLine}></Button> 
          </Tooltip>
        </InstUISettingsProvider>
      </div>

      <div className="code-grader">
        <InstUISettingsProvider theme={canvas}>
          <Tooltip color="primary-inverse" renderTip="Assignments" placement="end" offsetX="5px"> 
            <Button onClick={handleGrader} size = "large" margin = "small" renderIcon={IconGradebookLine}></Button>
          </Tooltip>
        </InstUISettingsProvider>
      </div>


      </>
  );
};

export default Homepage;
