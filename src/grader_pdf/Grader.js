import React from "react";
import { useNavigate } from "react-router-dom";

import './Grader.css';
import NavBar from "./NavBar";

function Grader() { 
	/*const navigate = useNavigate();

	const handleClick = () => {
    navigate('/');//replaces current page in the history stack with the new page
  }; */

  return (
    <>
        <NavBar />
        <div className="header">
          This feature has not been implemented yet!
        </div>
    </>
  );
};
export default Grader;
