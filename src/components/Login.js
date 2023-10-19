import React, { useState } from 'react';
import { Button, InstUISettingsProvider, TextInput } from "@instructure/ui";
import './Login.css'; // Import a CSS file for styling
import PrintVsGrade from './PrintVsGrade';

function Login() {
    const [currentPage, setCurrentPage] = useState(null);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <InstUISettingsProvider theme={{ fontFamily: 'Arial', fontSize: '16px' }}>
            <div className="login-container">
                {currentPage === null && (
                    <div className="login-form">
                        <h2>Welcome to VAC.JS</h2>
                        <TextInput
                            renderLabel="API key"
                            placeholder="abc1234ABC5678"
                            onChange={(event, value) => { console.log(value) }}
                        />
                        <TextInput
                            renderLabel="URL"
                            placeholder="www.ufl.edu"
                            onChange={(event, value) => { console.log(value) }}
                        />
                        <Button onClick={() => changePage('printvsgrade')}>Login</Button>
                    </div>
                )}
                {currentPage === 'printvsgrade' && <PrintVsGrade />}
            </div>
        </InstUISettingsProvider>
    );
}

export default Login;
