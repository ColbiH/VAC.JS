import React from 'react';
import { useNavigate } from "react-router-dom"; 
import { Button, TextArea, /*TextInput,*/ InstUISettingsProvider, canvas } from '@instructure/ui';

import './Login.css';

function Login() { 
	const navigate = useNavigate();

  //source help: https://reactjsguru.com/usehistory-was-not-found-in-react-router-dom/
	const handleClick = () => {
    navigate('/home',{replace: true});//replaces current page in the history stack with the new page
  };

	return ( 

    <><div className="welcome">
      Hello, Welcome to VAC.JS!
    </div>
    <div className="login-api">
        <TextArea
          placeholder="Enter API Key"
          display="inline-block"
          isRequired="true"
          maxHeight="40px"
          length="90px"
          autoGrow="false"
        ></TextArea>
      </div><br></br><div className="login-url">
        <TextArea
          placeholder="Enter Canvas URL"
          display="inline-block"
          isRequired="true"
          maxHeight="40px"
          length="90px"
          autoGrow="false"
        ></TextArea>

      </div><div className="submit">
        <InstUISettingsProvider theme={canvas}>
          <Button onClick={handleClick} color="danger" margin="small">Submit</Button> 
        </InstUISettingsProvider>
      </div></>
	) 
} 

export default Login 