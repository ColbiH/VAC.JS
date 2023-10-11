import React, { useState } from 'react';
import {Button, InstUISettingsProvider, canvas, IconPrinterLine, IconGradebookLine} from "@instructure/ui";
import Sam from './Sam';

function PrintVsGrade() {
    const [currentPage, setCurrentPage] = useState(null);
    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <InstUISettingsProvider theme={canvas}>
            <div>
                {currentPage === null && <Button
                    size = "large"
                    margin = "small"
                    onClick={() => changePage('sam')}
                    renderIcon={IconPrinterLine}></Button>}
                {currentPage === 'sam' && <Sam />}

                {currentPage === null && <Button
                    size = "large"
                    margin = "small"
                    renderIcon={IconGradebookLine}></Button>}
            </div>
        </InstUISettingsProvider>
    );
}

export default PrintVsGrade;