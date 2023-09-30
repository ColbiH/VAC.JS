import React from "react";
import './Popup.css';
import { Button } from '@instructure/ui';

export const Popup = ({ close }) => (
  <div className="modal-content">
    <br/>
    <div className="header"><b>Quiz 1</b></div>

    <div className="content">
    
        <div className="quiz-view">
            This is the quiz preview
        </div>

        <div className="options">
            <Button color="danger" margin="small">Download</Button>
            <br/>
            <Button color="danger" margin="small">Print</Button>
            <br/>
            <Button color="danger" margin="small">Share</Button> 
        </div>
      
    </div>
  </div>
);
