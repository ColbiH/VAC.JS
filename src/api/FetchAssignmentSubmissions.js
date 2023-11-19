import React, { useEffect, useRef, useState } from 'react';
import { FetchCanvas } from './FetchCanvas';
import { useLocation } from 'react-router-dom';
import { Link, Metric, Pill, Table, Text } from '@instructure/ui';

const rows = [
    {
        id: '1',
        Name: 'Alyssa LaSalle',
        ID: '12456',
        Submission: 'yes',
        Download: 'https://ufl.instructure.com/ex1.cpp/download',
        Grade_Status: 'yes',
        Score: '100%'
    },
]

function FetchAssignmentSubmissions() {
    const [gradeReceived, setGradeReceived] = useState(false);
    const dataRef = useRef([]);
    const location = useLocation();
    const url =
        'https://' +
        location.state.login.canvas_url +
        '/api/v1/courses/' +
        location.state.course +
        '/assignments/' +
        location.state.quiz +
        '/submissions';

    useEffect(() => {
        const GEToptions = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + location.state.login.api_key,
            },
        };

        const PUToptions = {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + location.state.login.api_key,
            },
        };

        FetchCanvas(url, GEToptions)
            .then((result) => {

                dataRef.current = result;

                dataRef.current.map((entry, index) => {
                    //Add to Table
                    rows.push({
                        id: entry.id,
                        Name: entry.user_id,
                        ID: entry.user_id,
                        Submission: entry.workflow_state,
                        Download: 'https://ufl.instructure.com/ex2.cpp/download',
                        Grade_Status: entry.grade,
                        Score: entry.grade,
                    });
                });
                // Need for loop for all submissions
                console.log(dataRef.current[3].attachments[0].url);
                let alyssasubmission = dataRef.current[3].attachments[0].url;
                window.api.StartDownload(alyssasubmission);

                window.api.ListenForGrade((grade) => {
                    console.log('Grade: ', grade);
                    FetchCanvas(
                        url + '/1060168?submission[posted_grade]=' + grade,
                        PUToptions
                    );
                    setGradeReceived(true);
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    if (!gradeReceived) {
        return null;
    }

    const headers = [
        {
            id: 'Name',
            text: 'Student Name',
            width: '20%',
            textAlign: 'start',
        },
        {
            id: 'ID',
            text: 'SIS ID',
            width: '15%',
            textAlign: 'start',
        },
        {
            id: 'Submission',
            text: 'Submission',
            width: '15%',
            textAlign: 'start',
        },
        {
            id: 'Download',
            text: 'Download',
            width: '20%',
        },
        {
            id: 'Grade_Status',
            text: 'Grade Status',
            width: '20%',
            textAlign: 'end',
        },
        {
            id: 'Score',
            text: 'Score',
            width: '10%',
            textAlign: 'end',
        },
    ];



    return (
        <div className="assignment-table">
            <Table
                layout='auto'
                hover='true'
            >
                <Table.Head>
                    <Table.Row>
                        {(headers || []).map(({ id, text, width, textAlign }) => (
                            <Table.ColHeader
                                key={id}
                                id={id}
                                width={width}
                                //textAlign={textAlign}
                            >
                                {text}
                            </Table.ColHeader>
                        ))}
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {rows.map((row) => (
                        <Table.Row key={row.id}>
                            {headers.map(({ id,}) => (
                                <Table.Cell key={id}>
                                    {id === 'Grade_Status' ? (
                                        row[id] === null ? (
                                            <Pill color="danger" margin="x-small">Not Graded</Pill>
                                        ) : (
                                            <Pill color="success" margin="x-small">Graded</Pill>
                                        )
                                    ) : (
                                        row[id]
                                    )}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default FetchAssignmentSubmissions;