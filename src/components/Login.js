import React, { useState } from 'react';
import {Button, InstUISettingsProvider, TextInput} from "@instructure/ui";
import { Alert } from '@instructure/ui-alerts';
import './Login.css';
import {useNavigate} from "react-router-dom";
import logo from './images/vacjs-high-resolution-logo-transparent.png';
import {FetchCanvas} from "../api/FetchCanvas";



function Login() {
    const [api_key, setApi_Key] = useState('');
    const [canvas_url, setcanvas_Url] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = {
        api_key: api_key,
        canvas_url: canvas_url
    };
    // Simple Function that enables alert for wrong login information.
    async function login_test() {
        const url = 'https://' + canvas_url + '/api/v1/courses/';
        const GEToptions = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + api_key,
            },
        };
            const result = await FetchCanvas(url, GEToptions);
            console.log(result);
        if (result.errors || result.error){
            setError('The API Key or URL is invalid! Please try again.');
        } else {
            navigate("/printvsgrade", { state: { login: login } });
        }
    }
    return (
        <InstUISettingsProvider theme={{ fontFamily: 'Arial', fontSize: '16px' }}>
            {error && (
                <div className='alert'>
                    <Alert variant="error" margin="small">
                        ERROR: {error}
                    </Alert>
                </div>
            )}
            <div className="login-container">
                <div className="login-form">
                    <img src={logo} alt={"logo"} width={100} height={100} />
                    <div className="login-text">
                        <TextInput
                            renderLabel="API key"
                            placeholder="abc1234ABC5678"
                            onChange={(event, value) => setApi_Key(value)}
                        />
                    </div>
                    <div className="login-text">
                        <TextInput
                            renderLabel="URL"
                            defaultValue=".instructure.com"
                            placeholder="ufl.instructure.com"
                            onChange={(event, value) => setcanvas_Url(value)}
                        />
                    </div>
                    <Button onClick={login_test}>Login</Button>
                </div>
            </div>
        </InstUISettingsProvider>
    );
}

export default Login;

