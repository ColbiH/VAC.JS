import React, { useState } from "react";
import {Button, Metric, Table, Link, Text, Pill, IconDownloadLine, IconGradebookExportLine, Options} from "@instructure/ui";
import Sidebar from "./Sidebar";
import "./AssignmentDisplay.css";

function AssignmentDisplay({login, classes}) {
    const [clickedItem, setClickedItem] = useState(null);

    const handleItemClick = (item) => {
        setClickedItem(item);
    };

    //not sure if there should be a condition here to check the role of each person (student/teacher)
    //Table pulls only student info

    //need toggle button and need to find way to pull in assignment name from previous page
    return (
        <>
            <div>
                <Sidebar/>
            </div>

            <div className="download-button">
                <Button color="secondary" margin="small">Download All  <IconDownloadLine/></Button>
            </div>

            <div className="grade-button">
                <Button color="primary" margin="small">Grade All  <IconGradebookExportLine/></Button>
            </div>

            
            <div className="assignment-table">
                <Table
                    layout= 'auto'
                    hover= 'false'
                >
                    <Table.Head>
                        <Table.Row>

                            <Table.ColHeader id="Name" width="20%">Student Name</Table.ColHeader>
                            <Table.ColHeader id="ID" width="15%">SIS ID</Table.ColHeader>
                            <Table.ColHeader id="Submission" width="15%">Submission</Table.ColHeader>
                            <Table.ColHeader id="Download" width="20%">Download</Table.ColHeader> {/*shows if student's assignment has been downloaded or not*/}
                            <Table.ColHeader id="Grade_Status" width="20%">Grade Status</Table.ColHeader>
                            <Table.ColHeader id="Score" width="10%">Score</Table.ColHeader>

                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                        <Table.RowHeader>Samantha Barthelemy</Table.RowHeader>
                        <Table.Cell>40475908</Table.Cell>
                        <Table.Cell>
                            <Link href="https://ufl.instructure.com/ex1.cpp/download">ex1.cpp</Link></Table.Cell>
                        <Table.Cell><Text weight="bold" color="success">Downloaded</Text></Table.Cell>
                        <Table.Cell>
                            <Pill color="success" margin="x-small">Graded</Pill></Table.Cell>
                        <Table.Cell><Metric renderValue="80%" /></Table.Cell>
                        </Table.Row>
                        <Table.Row>

                        <Table.RowHeader>Cameron Kozlin</Table.RowHeader>
                        <Table.Cell>14055739</Table.Cell>
                        <Table.Cell>
                            <Link href="https://ufl.instructure.com/ex1.cpp/download">ex1.cpp</Link></Table.Cell>
                        <Table.Cell><Text weight="bold" color="danger">Not Downloaded</Text></Table.Cell>
                        <Table.Cell>
                            <Pill color="danger" margin="x-small">Not Graded</Pill></Table.Cell>
                        <Table.Cell> </Table.Cell>
                        </Table.Row>
                        <Table.Row>

                        <Table.RowHeader>Antonio Romero</Table.RowHeader>
                        <Table.Cell>16952863</Table.Cell>
                        <Table.Cell>
                            <Link href="https://ufl.instructure.com/ex1.cpp/download">ex1.cpp</Link></Table.Cell>
                        <Table.Cell><Text weight="bold" color="success">Downloaded</Text></Table.Cell>
                        <Table.Cell>
                            <Pill color="danger" margin="x-small">Not Graded</Pill></Table.Cell>
                        <Table.Cell> </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>    
            </div>
            
        </>
    );
}

export default AssignmentDisplay;
