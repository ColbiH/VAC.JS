import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, InstUISettingsProvider, canvas, IconPrinterLine, IconGradebookLine} from "@instructure/ui";
import Sidebar from "./Sidebar";

function PrintVsGrade() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <Sidebar/>
            </div>
            {/*<p>API Key: {location.state.login.api_key}</p>*/}
            {/*<p>URL: {location.state.login.canvas_url}</p>*/}
            {<InstUISettingsProvider theme={canvas}>
                <div>
                    <Button
                        size = "large"
                        margin = "small"
                        onClick={() => navigate('/fetchclassesquizzes', {state: {login: location.state.login, classes : location.state.classes }})}
                        renderIcon={IconPrinterLine}></Button>

                    <Button
                        size = "large"
                        margin = "small"
                        onClick={() => navigate('/fetchclassesassignments', {state: {login: location.state.login, classes : location.state.classes }})}
                        renderIcon={IconGradebookLine}></Button>
                </div>
            </InstUISettingsProvider>}
        </div>
    );
}

export default PrintVsGrade;