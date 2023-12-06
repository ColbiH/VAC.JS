import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, InstUISettingsProvider, canvas, IconPrinterLine, IconGradebookLine, Tooltip} from "@instructure/ui";
import Sidebar from "./Sidebar";
import './PrintVsGrade.css';

//Selection of portion of the program
//useNavigate uses React-Router
function PrintVsGrade() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <Sidebar/>
            </div>
            {<InstUISettingsProvider theme={canvas}>
                <div className="quiz-pdf">
                    <Tooltip color="primary-inverse" renderTip="PDF Printer" placement="start" offsetX="5px">
                        <Button
                            size = "large"
                            margin = "small"
                            onClick={() => navigate('/fetchclassesquizzes', {state: {login: location.state.login, classes : location.state.classes }})}
                            renderIcon={IconPrinterLine}></Button>
                    </Tooltip>
                </div>

                <div className="code-grader">
                    <Tooltip color="primary-inverse" renderTip="Code Grader" placement="end" offsetX="5px">
                        <Button
                            size = "large"
                            margin = "small"
                            onClick={() => navigate('/fetchclassesassignments', {state: {login: location.state.login, classes : location.state.classes }})}
                            renderIcon={IconGradebookLine}></Button>
                    </Tooltip>
                </div>
            </InstUISettingsProvider>}
        </div>
    );
}

export default PrintVsGrade;