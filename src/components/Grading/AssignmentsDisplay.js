import React, { useState } from "react";
import {Button, Checkbox, Metric, Table, Link, Text, TextInput, FormFieldGroup, Pill, IconDownloadLine, IconGradebookExportLine, IconPlusSolid} from "@instructure/ui";
import "./AssignmentsDisplay.css"
import {useLocation} from "react-router-dom";
import Sidebar from "../Sidebar";
import AssignmentsTreeBrowser from "./AssignmentsTreeBrowser";


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

function AssignmentsDisplay() {
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            <div style={{ paddingRight: 200 }}>
                <AssignmentsTreeBrowser login={location.state.login} classes={location.state.classes}/>
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
            {/*<div>*/}
            {/*    <Sidebar/>*/}
            {/*</div>*/}
            {/*<div className="assignment-name">*/}
            {/*    <Text color="primary" size="x-large" weight="bold">Assignment name here</Text>*/}
            {/*</div>*/}

            {/*<div className="download-button">*/}
            {/*    <Button color="secondary" margin="small">Download All  <IconDownloadLine/></Button>*/}
            {/*</div>*/}

            {/*<div className="grade-button">*/}
            {/*    <Button color="primary" margin="small">Grade All  <IconGradebookExportLine/></Button>*/}
            {/*</div>*/}

            {/*<div className="toggle">*/}
            {/*    <Checkbox label="Publish grades" value="medium" variant="toggle" />*/}
            {/*</div>*/}


            {/*<div className="assignment-table">*/}
            {/*    <Table*/}
            {/*        layout= 'auto'*/}
            {/*        hover= 'true'*/}
            {/*    >*/}
            {/*        <Table.Head>*/}
            {/*            <Table.Row>*/}

            {/*                <Table.ColHeader id="Name" width="20%">Student Name</Table.ColHeader>*/}
            {/*                <Table.ColHeader id="ID" width="15%">SIS ID</Table.ColHeader>*/}
            {/*                <Table.ColHeader id="Submission" width="15%">Submission</Table.ColHeader>*/}
            {/*                <Table.ColHeader id="Download" width="20%">Download</Table.ColHeader> /!*shows if student's assignment has been downloaded or not*!/*/}
            {/*                <Table.ColHeader id="Grade_Status" width="20%">Grade Status</Table.ColHeader>*/}
            {/*                <Table.ColHeader id="Score" width="10%">Score</Table.ColHeader>*/}

            {/*            </Table.Row>*/}
            {/*        </Table.Head>*/}
            {/*        <Table.Body>*/}
            {/*            <Table.Row>*/}
            {/*                <Table.RowHeader>Samantha Barthelemy</Table.RowHeader>*/}
            {/*                <Table.Cell>40475908</Table.Cell>*/}
            {/*                <Table.Cell>*/}
            {/*                    <Link href="https://ufl.instructure.com/ex1.cpp/download">ex1.cpp</Link></Table.Cell>*/}
            {/*                <Table.Cell><Text weight="bold" color="success">Downloaded</Text></Table.Cell>*/}
            {/*                <Table.Cell>*/}
            {/*                    <Pill color="success" margin="x-small">Graded</Pill></Table.Cell>*/}
            {/*                <Table.Cell><Metric renderValue="80%" /></Table.Cell>*/}
            {/*            </Table.Row>*/}
            {/*            <Table.Row>*/}

            {/*                <Table.RowHeader>Cameron Kozlin</Table.RowHeader>*/}
            {/*                <Table.Cell>14055739</Table.Cell>*/}
            {/*                <Table.Cell>*/}
            {/*                    <Link href="https://ufl.instructure.com/ex1.cpp/download">ex1.cpp</Link></Table.Cell>*/}
            {/*                <Table.Cell><Text weight="bold" color="danger">Not Downloaded</Text></Table.Cell>*/}
            {/*                <Table.Cell>*/}
            {/*                    <Pill color="danger" margin="x-small">Not Graded</Pill></Table.Cell>*/}
            {/*                <Table.Cell> </Table.Cell>*/}
            {/*            </Table.Row>*/}
            {/*            <Table.Row>*/}

            {/*                <Table.RowHeader>Antonio Romero</Table.RowHeader>*/}
            {/*                <Table.Cell>16952863</Table.Cell>*/}
            {/*                <Table.Cell>*/}
            {/*                    <Link href="https://ufl.instructure.com/ex1.cpp/download">ex1.cpp</Link></Table.Cell>*/}
            {/*                <Table.Cell><Text weight="bold" color="success">Downloaded</Text></Table.Cell>*/}
            {/*                <Table.Cell>*/}
            {/*                    <Pill color="danger" margin="x-small">Not Graded</Pill></Table.Cell>*/}
            {/*                <Table.Cell> </Table.Cell>*/}
            {/*            </Table.Row>*/}
            {/*        </Table.Body>*/}
            {/*    </Table>*/}
            {/*</div>*/}

        </>
    );
}

export default AssignmentsDisplay;