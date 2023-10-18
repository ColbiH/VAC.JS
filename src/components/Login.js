import React, { useState } from 'react';
import {Button, InstUISettingsProvider, canvas, TextInput} from "@instructure/ui";
import PrintVsGrade from './PrintVsGrade';

function Login() {
    const [currentPage, setCurrentPage] = useState(null);
    const [api_key, setApi_Key] = useState('');
    const [canvas_url, setcanvas_Url] = useState('');

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const login = {
        api_key: api_key,
        canvas_url: canvas_url
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
                            onChange={(event, value) => setApi_Key(value)}
                        />
                        <br></br>
                        <TextInput
                            renderLabel="URL"
                            placeholder="www.ufl.edu"
                            display="inline-block"
                            onChange={(event, value) => setcanvas_Url(value)}
                        />
                        &nbsp;
                        <Button onClick={() => changePage('printvsgrade')}>Submit</Button>
                    </>
                )}
                {currentPage === 'printvsgrade' && <PrintVsGrade login={login} />}
            </div>
        </InstUISettingsProvider>
    );
}

export default Login;
