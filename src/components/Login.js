
import React, { useState } from 'react';
import {Button, InstUISettingsProvider, TextInput} from "@instructure/ui";
import './Login.css';
import {useNavigate} from "react-router-dom";
import logo from './images/vacjs-high-resolution-logo-transparent.png';

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

                    <img src={logo} width={100} height={100} />
                    <h2>Welcome to VAC.JS</h2>

                    <div className = "login-text">
                        <TextInput
                            renderLabel="API key"
                            placeholder="abc1234ABC5678"
                            onChange={(event, value) => setApi_Key(value)}
                        />
                    </div>
                    <div className = "login-text">
                        <TextInput
                            renderLabel="URL"
                            defaultValue = ".instructure.com"
                            placeholder="ufl.instructure.com"
                            onChange={(event, value) => setcanvas_Url(value)}
                        />
                    </div>

                    {/*<div className = "login-text">*/}
                    {/*    <TextInput*/}
                    {/*        renderLabel="API key"*/}
                    {/*        placeholder="abc1234ABC5678"*/}
                    {/*        onChange={(event, value) => setApi_Key(value)}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className = "login-text">*/}
                    {/*    <TextInput*/}
                    {/*        renderLabel="URL"*/}
                    {/*        defaultValue = ".instructure.com"*/}
                    {/*        placeholder="ufl.instructure.com"*/}
                    {/*        onChange={(event, value) => setcanvas_Url(value)}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<Button onClick={() => changePage('printvsgrade')}>Login</Button>*/}

                    <Button onClick={() => navigate("/printvsgrade", {state: {login: login }})}>Login</Button>
                </div>
            </div>
        </InstUISettingsProvider>
    );
}

export default Login;

