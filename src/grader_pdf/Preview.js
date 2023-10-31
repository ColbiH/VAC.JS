import React from "react";
import './Preview.css';
import { Button } from '@instructure/ui';

//export const Preview = ({ close }) => (
const Preview = () => {
  return (
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
}
export default Preview;
