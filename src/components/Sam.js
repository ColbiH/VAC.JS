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
    RadioInput,
    TreeBrowser,
} from "@instructure/ui";
import "./Sam.css";
import { Popup } from "./pdf/popup/Popup";

const jsonData = {
    classes: {
        id: 1,
        name: "Classes",
        collections: [
            {
                id: 2,
                name: "COP 3502",
                descriptor: "Programming Fundamentals 1",
                collections: [],
                items: [
                    { id: 1, name: "Assignment 1" },
                    { id: 2, name: "Assignment 2" },
                ],
            },
            {
                id: 3,
                name: "COP 3503",
                descriptor: "Programming Fundamentals 2",
                collections: [],
                items: [
                    { id: 3, name: "Coding Problem 1" },
                ],
            },
        ],
        items: [],
    },
};

function transformDataForTreeBrowser(classes) {
    const collections = {};
        collections[1] = {
            id: classes[0].id,
            name: JSON.stringify(classes[0].name),
            collections: [],
            items: [
                {
                    id: 1,
                    name: "Yeah", //JSON.stringify(classes[0].quizzes[0].title),
                },
            ],
        };
    return collections;
}



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

function Example({classes}) {
    const [size, setSize] = useState("medium");

    const sizes = ["small", "medium", "large"];

    const handleSizeSelect = (e, newSize) => {
        setSize(newSize);
    };

    return (
        <>
            <View display="block" margin="none none medium">
                <RadioInputGroup
                    name="treeBrowserSize"
                    defaultValue="medium"
                    description={<ScreenReaderContent>TreeBrowser size selector</ScreenReaderContent>}
                    variant="toggle"
                    onChange={handleSizeSelect}
                >
                    {sizes.map((size) => (
                        <RadioInput key={size} label={size} value={size} />
                    ))}
                </RadioInputGroup>
            </View>

            <TreeBrowser
                size={size}
                collections={transformDataForTreeBrowser(classes)}
                items={{}}
                defaultExpanded={[1]}
                rootId={1}
            />
        </>
    );
}

function Sam({classes}) {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <div style={{ paddingRight: 200 }}>
                <Example classes={classes}/>
            </div>

            <div className="preview">
                <InstUISettingsProvider theme={canvas}>
                    <Button onClick={() => setModalOpen(true)} color="danger" margin="small">
                        Preview
                    </Button>
                </InstUISettingsProvider>

                <Modal
                    className="modal-container"
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    style={modalStyle}
                >
                    <div>
                        <Popup></Popup>
                    </div>
                    <CloseButton
                        onClick={() => setModalOpen(false)}
                        placement="end"
                        offset="small"
                        screenReaderLabel="Close"
                    />
                </Modal>
            </div>
        </>
    );
}

export default Sam;
