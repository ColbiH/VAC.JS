import React, {useRef, useState} from "react";
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
import FetchQuizQuestions from "../api/FetchQuizQuestions";
import {useLocation} from "react-router-dom";
import FetchClassesAndQuizzes from "../api/FetchClassesAndQuizzes";
import Sidebar from "./Sidebar";

function transformDataForTreeBrowser(classes) {
    const collections = {
        1: {
            id: 1,
            name: "Classes",
            collections: [],
            items: [],
        },
    };

    if (Array.isArray(classes) && classes.length > 0) {
        for (let i = 0; i < classes.length; i++) {
            const classInfo = classes[i];
            collections[1].collections.push(classInfo.id);

            collections[classInfo.id] = {
                id: classInfo.id,
                name: classInfo.name,
                collections: [],
                items: [],
            };

            if (Array.isArray(classInfo.quizzes) && classInfo.quizzes.length > 0) {
                for (let j = 0; j < classInfo.quizzes.length; j++) {
                    const quiz = classInfo.quizzes[j];
                    collections[classInfo.id].items.push(quiz.id);
                }
            }
        }
    }


    return collections;
}

function transformDataForItems(classes) {
    const collections = {
        1: {
            id: 1,
            name: "Classes",
            collections: [],
            items: {},
        },
    };

    if (Array.isArray(classes) && classes.length > 0) {
        for (let i = 0; i < classes.length; i++) {
            const classInfo = classes[i];
            collections[1].collections.push(classInfo.id);

            collections[classInfo.id] = {
                id: classInfo.id,
                name: classInfo.name,
                collections: [],
                items: {},
            };

            if (Array.isArray(classInfo.quizzes) && classInfo.quizzes.length > 0) {
                for (let j = 0; j < classInfo.quizzes.length; j++) {
                    const quiz = classInfo.quizzes[j];
                    collections[1].items[quiz.id] = {
                        id: quiz.id,
                        name: quiz.title,
                        course_id: classInfo.id,
                        collections: [],
                        items: {},
                    };
                }
            }
        }
    }
    //console.log(collections);
    return collections[1].items;
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

function Example(classes) {
    const [size, setSize] = useState("medium");
    const [clickedItem, setClickedItem] = useState(null);
    //const sizes = ["small", "medium", "large"];
    const { state: { login } = {} } = useLocation();
    //const { state: { classes } = {} } = useLocation();

    // const handleSizeSelect = (e, newSize) => {
    //     setSize(newSize);
    // };

    const handleItemClick = (item) => {
        setClickedItem(item);
    };

    return (
        <>

            <p>API Key: {login.api_key}</p>
            <p>URL: {login.canvas_url}</p>
            <p>Classes: {classes[0]}</p>


            {/*<View display="block" margin="none none medium">*/}
            {/*    */}
            {/*    <RadioInputGroup*/}
            {/*        name="treeBrowserSize"*/}
            {/*        defaultValue="medium"*/}
            {/*        description={<ScreenReaderContent>TreeBrowser size selector</ScreenReaderContent>}*/}
            {/*        variant="toggle"*/}
            {/*        onChange={handleSizeSelect}*/}
            {/*    >*/}
            {/*        {sizes.map((size) => (*/}
            {/*            <RadioInput key={size} label={size} value={size} />*/}
            {/*        ))}*/}
            {/*    </RadioInputGroup>*/}
            {/*</View>*/}

            <TreeBrowser
                size= 'large'
                collections={transformDataForTreeBrowser(classes)}
                items={transformDataForItems(classes)}
                defaultExpanded={[1]}
                rootId={1}
                onItemClick={handleItemClick}
            />
            {/*////TODO:  Move button from here*/}
            {/*{window.location.href}*/}
            {clickedItem !== null && (
                <FetchQuizQuestions login={login} course={transformDataForItems(classes)[clickedItem.id].course_id} quiz={clickedItem.id} />
            )}
        </>
    );
}

function Sam(classes) {
    const [modalOpen, setModalOpen] = useState(false);
    const { state: { login } = {} } = useLocation();
    //const { state: { classes } = {} } = useLocation();

    return (
        <>
            <div>
                <Sidebar/>
            </div>
            <div style={{ paddingRight: 200 }}>
                <Example login={login}/>
            </div>

            {/*<div className="preview">*/}
            {/*    <InstUISettingsProvider theme={canvas}>*/}
            {/*        <Button onClick={() => setModalOpen(true)} color="danger" margin="small">*/}
            {/*            Preview*/}
            {/*        </Button>*/}
            {/*        /!*<iframe*!/*/}
            {/*        /!*    ref={iframeRef}*!/*/}
            {/*        /!*    src="/LaTeX.wasm/pdftex_basic.html"*!/*/}
            {/*        /!*    title="LaTeX Compilation"*!/*/}
            {/*        /!*    width="100%"*!/*/}
            {/*        /!*    height="1200"*!/*/}
            {/*        /!*    frameBorder="0"*!/*/}
            {/*        /!*    scrolling="no"*!/*/}
            {/*        /!*></iframe>*!/*/}

            {/*        /!*<Button onClick={compileLatexInIframe} color = "danger" margin = "small">Compile LaTeX</Button>*!/*/}
            {/*    </InstUISettingsProvider>*/}

            {/*    <Modal*/}
            {/*        className="modal-container"*/}
            {/*        isOpen={modalOpen}*/}
            {/*        onRequestClose={() => setModalOpen(false)}*/}
            {/*        style={modalStyle}*/}
            {/*    >*/}
            {/*        <div>*/}
            {/*            <Popup></Popup>*/}
            {/*        </div>*/}
            {/*        <CloseButton*/}
            {/*            onClick={() => setModalOpen(false)}*/}
            {/*            placement="end"*/}
            {/*            offset="small"*/}
            {/*            screenReaderLabel="Close"*/}
            {/*        />*/}
            {/*    </Modal>*/}
            {/*</div>*/}
        </>
    );
}

export default Sam;
