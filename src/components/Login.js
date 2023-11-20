import React, { useState } from 'react';
import {Button, InstUISettingsProvider, TextInput} from "@instructure/ui";
import './Login.css';
import {useNavigate} from "react-router-dom";

function Login() {
    const [api_key, setApi_Key] = useState('');
    const [canvas_url, setcanvas_Url] = useState('');
    const navigate = useNavigate();

    const login = {
        api_key: api_key,
        canvas_url: canvas_url
    };

    return (
        <InstUISettingsProvider theme={{ fontFamily: 'Arial', fontSize: '16px' }}>
            <div className="login-container">
                    <div className="login-form">
                        <h2>Welcome to VAC.JS</h2>
                        <TextInput
                            renderLabel="API key"
                            placeholder="abc1234ABC5678"
                            onChange={(event, value) => setApi_Key(value)}
                        />
                        <TextInput
                            renderLabel="URL"
                            defaultValue = ".instructure.com"
                            placeholder="ufl.instructure.com"
                            onChange={(event, value) => setcanvas_Url(value)}
                        />
                        <div className="login-btn">
                            <Button onClick={() => navigate("/printvsgrade", {state: {login: login }})}>Login</Button>
                        </div>
                    </div>
            </div>
        </InstUISettingsProvider>
    );
}

export default Login;
