import React, { useState } from 'react';
import {Button, InstUISettingsProvider, canvas, IconPrinterLine, IconGradebookLine} from "@instructure/ui";
import FetchClassesAndQuizzes from "../api/FetchClassesAndQuizzes";

function PrintVsGrade({login}) {
    const [currentPage, setCurrentPage] = useState(null);
    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <p>API Key: {login.api_key}</p>
            <p>URL: {login.canvas_url}</p>
            {<InstUISettingsProvider theme={canvas}>
                <div>
                    {currentPage === null && <Button
                        size = "large"
                        margin = "small"
                        onClick={() => changePage('sam')}
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