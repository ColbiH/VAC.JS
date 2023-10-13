import React, { useState } from 'react';
import {Button, InstUISettingsProvider, canvas, TextInput} from "@instructure/ui";
import PrintVsGrade from './PrintVsGrade';

function Login() {
    const [currentPage, setCurrentPage] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [canvasurl, setcanvasUrl] = useState('');

    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <InstUISettingsProvider theme={canvas}>
            <div>
                <br></br>
                {currentPage === null && (
                    <>
                        <TextInput
                            renderLabel="API key"
                            placeholder="abc1234ABC5678"
                            display="block"
                            onChange={(event, value) => setApiKey(value)}
                        />
                        <br></br>
                        <TextInput
                            renderLabel="URL"
                            placeholder="www.ufl.edu"
                            display="inline-block"
                            onChange={(event, value) => setcanvasUrl(value)}
                        />
                        &nbsp;
                        <Button onClick={() => changePage('printvsgrade')}>Submit</Button>
                    </>
                )}
                {currentPage === 'printvsgrade' && <PrintVsGrade apiKey={apiKey} canvasurl={canvasurl} />}
            </div>
        </InstUISettingsProvider>
    );
}

export default Login;
