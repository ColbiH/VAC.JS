import React from 'react';
import { Button, Flex, Img, InstUISettingsProvider, canvas} from "@instructure/ui";
import Image from "../quiz.png";

function sayHello() {
    alert('Here is the pdf preview.');
}

function Jenny() {
    return (
        <InstUISettingsProvider theme={canvas}>
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

export default Jenny;
