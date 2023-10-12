import React, { useState } from "react";
import Modal from "react-modal";

import {
    Button,
    CloseButton,
    InstUISettingsProvider,
    canvas,
    RadioInputGroup,
    View,
    ScreenReaderContent,
    TreeBrowser,
    RadioInput } from '@instructure/ui' //call specific components from here
import './Sam.css';
import { Popup } from "./pdf/popup/Popup";

//source help: https://www.educative.io/answers/how-to-create-a-modal-in-react-js
const modalStyle = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        width: 400,
    },
};

class Example extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            size: 'medium'
        }

        this.sizes = ['small', 'medium', 'large']
    }

    handleSizeSelect = (e, size) => {
        this.setState({ size })
    };

    render () {
        return (
            <>
                <View display="block" margin="none none medium">
                    <RadioInputGroup
                        name="treeBrowserSize"
                        defaultValue="medium"
                        description={<ScreenReaderContent>TreeBrowser size selector</ScreenReaderContent>}
                        variant="toggle"
                        onChange={this.handleSizeSelect}
                    >
                        {this.sizes.map((size) => <RadioInput key={size} label={size} value={size} />)}
                    </RadioInputGroup>
                </View>

                <TreeBrowser
                    size={this.state.size}
                    collections={{
                        1: {
                            id: 1,
                            name: "Classes",
                            collections: [2,3,4,5],
                            items: [],
                        },
                        2: { id: 2, name: "COP 3502", descriptor: "Programming Fundamentals 1", collections: [], items: [1,2] },
                        3: { id: 3, name: "COP 3503", descriptor: "Programming Fundamentals 2", collections: [], items: [3] },
                        4: { id: 4, name: "COP 3530", descriptor: "Data Structures & Algorithms", collections: [], items: [4,5] },
                        5: { id: 5, name: "STA 3032", descriptor: "Engineering Statistics", items: [5]}
                    }}
                    items={{
                        1: { id: 1, name: "Assignment 1" },
                        2: { id: 2, name: "Assignment 2" },
                        3: { id: 3, name: "Coding Problem 1" },
                        4: { id: 4, name: "Coding Problem 2" },
                        5: { id: 5, name: "Calculator Coding"}
                    }}
                    defaultExpanded={[1, 3]}
                    rootId={1}
                />
            </>
        )
    }
}

function Sam() {

    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <div style = {{paddingRight: 200}}>
                <Example/>
            </div>

            <div className="preview">
                <InstUISettingsProvider theme={canvas}>
                    <Button onClick={setModalOpen} color="danger" margin="small">Preview</Button>
                </InstUISettingsProvider>

                <Modal className="modal-container"
                       isOpen={modalOpen}
                       onRequestClose={() => setModalOpen(false)}
                       style={modalStyle}
                >
                    <div>
                        <Popup></Popup>
                    </div>
                    <CloseButton onClick={() => setModalOpen(false)} placement="end" offset="small" screenReaderLabel="Close" />
                </Modal>
            </div>
        </>
        /*<div className="preview">
          <InstUISettingsProvider theme={canvas}>
            <Button onClick={setModalOpen} color="danger" margin="small">Preview</Button>
          </InstUISettingsProvider>
        </div> */

    )
}

export default Sam;