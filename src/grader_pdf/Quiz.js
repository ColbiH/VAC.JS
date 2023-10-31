import React from "react";
import { useNavigate } from "react-router-dom";

import './Quiz.css';
import Preview from "./Preview";
import NavBar from "./NavBar";

function Quiz() { 

/*const navigate = useNavigate();

	const handleClick = () => {
    navigate('/');//replaces current page in the history stack with the new page
  }; */

  return (

    <>
    <NavBar />
    <Preview /></>

    );
};
export default Quiz;

/*
import React, { Component } from 'react'; 
import { useNavigate } from "react-router-dom";
import {View, Menu, Button} from "@instructure/ui"

import './Quiz.css';
import Preview from "./grader_pdf/Preview";
import NavBar from "./grader_pdf/NavBar";


//function Quiz() { 
class Quiz extends Component { 


  constructor (props) {
    super(props)

    this.state = {
      singleSelection: ['itemOne'],
      multipleSelection: ['optionOne', 'optionThree']
    }
  }

  handleSingleSelect = (e, newSelected) => {
    this.setState({
      singleSelection: newSelected
    })
  };

  handleMultipleSelect = (e, newSelected) => {
    this.setState({
      multipleSelection: newSelected
    })
  };


  return (
        
        <><><NavBar /><Preview /><View padding="medium" textAlign="center">
            <Menu
                placement="bottom"
                trigger={<Button>Courses</Button>}
                mountNode={() => document.getElementById('main')}
            >

                <Menu label="COP3530">
                    <Menu.Item value="hw1">Assignment 1</Menu.Item>
                    <Menu.Item value="hw2">Assignment 2</Menu.Item>
                    <Menu.Item value="hw3">Assignment 3</Menu.Item>
                </Menu>

                <Menu label="CIS4914">
                    <Menu.Item value="hw1">Assignment 1</Menu.Item>
                    <Menu.Item value="hw2">Assignment 2</Menu.Item>
                    <Menu.Item value="hw3">Assignment 3</Menu.Item>
                </Menu>



            </Menu>
        </View></></>

        
  );
};
export default Quiz; */