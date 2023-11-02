import React, { useState } from "react";
import "./QuizzesDisplay.css";
import {useLocation} from "react-router-dom";
import QuizzesTreeBrowser from "./QuizzesTreeBrowser";

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

function QuizzesDisplay() {
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            <div style={{ paddingRight: 200 }}>
                <QuizzesTreeBrowser login={location.state.login} classes={location.state.classes}/>
            </div>

            {/*<div className="preview">*/}
            {/*    <InstUISettingsProvider theme={canvas}>*/}
            {/*        <Button onClick={() => setModalOpen(true)} color="danger" margin="small">*/}
            {/*            Preview*/}
            {/*        </Button>*/}
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

export default QuizzesDisplay;