import React, { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, InstUISettingsProvider, canvas, IconPrinterLine, IconGradebookLine, Spinner} from "@instructure/ui";
import FetchClassesAndQuizzes from "../api/FetchClassesAndQuizzes";
import Sidebar from "./Sidebar";

function PrintVsGrade() {
    const [currentPage, setCurrentPage] = useState(null);
    const changePage = (page) => {
        setCurrentPage(page);
    };
    const { state: { login } = {} } = useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <Sidebar/>
            </div>
            <p>API Key: {login.api_key}</p>
            <p>URL: {login.canvas_url}</p>
            {<InstUISettingsProvider theme={canvas}>
                <div>
                    {currentPage === null && <Button
                        size = "large"
                        margin = "small"
                        onClick={() => navigate('/sam', {state: {login: login }})}
                        renderIcon={IconPrinterLine}></Button>}
                    <FetchClassesAndQuizzes login={login} />

                    {currentPage === null && <Button
                        size = "large"
                        margin = "small"
                        renderIcon={IconGradebookLine}></Button>}
                </div>
            </InstUISettingsProvider>}
        </div>
    );
}

export default PrintVsGrade;