import React, { useState } from "react";
import Modal from "react-modal";

import { Button, CloseButton, InstUISettingsProvider, canvas } from '@instructure/ui' //call specific components from here
import './App.css';
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

function App() {

  const [modalOpen, setModalOpen] = useState(false);
  return (

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

    /*<div className="preview">
      <InstUISettingsProvider theme={canvas}>
        <Button onClick={setModalOpen} color="danger" margin="small">Preview</Button>
      </InstUISettingsProvider>
    </div> */

  )
} 

export default App;