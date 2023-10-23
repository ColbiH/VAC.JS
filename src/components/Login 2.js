import React, { useState } from 'react';
import {Button, InstUISettingsProvider, canvas, TextInput} from "@instructure/ui";
import PrintVsGrade from './PrintVsGrade';

function Login() {
    const [currentPage, setCurrentPage] = useState(null);
    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <InstUISettingsProvider theme={canvas}>
            <div>
                <br></br>
                {currentPage === null && <TextInput
                    renderLabel="API key"
                    placeholder="abc1234ABC5678"
                    display = "block"
                    onChange={(event, value) => { console.log(value) }}
                />}
                <br></br>
                {currentPage === null && <TextInput
                    renderLabel="URL"
                    placeholder="www.ufl.edu"
                    display = "inline-block"
                    onChange={(event, value) => { console.log(value) }}
                />}
                &nbsp;
                {currentPage === null && <Button onClick={() => changePage('printvsgrade')}>Submit</Button>}
                {currentPage === 'printvsgrade' && <PrintVsGrade />}
            </div>
        </InstUISettingsProvider>

    );
}

export default Login;