import React, { useState } from 'react';
import {Button, InstUISettingsProvider, canvas, IconPrinterLine, IconGradebookLine} from "@instructure/ui";
import FetchClassesAndQuizzes from "../api/FetchClassesAndQuizzes";

function PrintVsGrade({ apiKey, canvasurl }) {
    const [currentPage, setCurrentPage] = useState(null);
    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <p>API Key: {apiKey}</p>
            <p>URL: {canvasurl}</p>
            {<InstUISettingsProvider theme={canvas}>
                <div>
                    {currentPage === null && <Button
                        size = "large"
                        margin = "small"
                        onClick={() => changePage('sam')}
                        renderIcon={IconPrinterLine}></Button>}
                    <FetchClassesAndQuizzes apiKey={apiKey} canvasurl={canvasurl} />

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