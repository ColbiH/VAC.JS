import React from 'react';
import { Button, Flex, Img, InstUISettingsProvider, instructure, View} from "@instructure/ui";
import Image from "../quiz.png";
//import styled from "styled-components";


// const Button = styled.button`
//   background-color: black;
//   color: white;
//   font-size: 20px;
//   padding: 10px 60px;
//   border-radius: 5px;
//   margin: 10px 0px;
//   cursor: pointer;
// `;

function sayHello() {
    alert('You clicked me!');
}

function FrontEnd() {
    return (
        <InstUISettingsProvider theme={instructure}>
        <>
            <Flex justifyItems = "space-around">
                <Flex.Item shouldShrink shouldGrow textAlign = "center">
                    <h1>Welcome to Vac.js!</h1>
                </Flex.Item>
            </Flex>
            <Flex wrap = "wrap" justifyItems = "space-around" margin = "0 0 medium medium">
                <Flex.Item
                    size = "100px"
                    shouldGrow
                    padding = "medium"
                    borderWidth = "medium"
                    borderColor = "info">
                    <Img
                        constrain = "cover"
                        alt="A placeholder image"
                        src={Image} />
                </Flex.Item>

                <Flex.Item
                    padding = "medium">
                    <Button onClick={sayHello}>Print as a pdf</Button>
                </Flex.Item>

            {/*<View textAlign="center" as="div">*/}
            {/*</View>*/}
            </Flex>
        </>
        </InstUISettingsProvider>
    );
}

export default FrontEnd;
