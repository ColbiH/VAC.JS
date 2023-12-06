import React, { useEffect, useRef, useState } from 'react';
import { FetchCanvas } from './FetchCanvas';
import { useLocation } from 'react-router-dom';
import {
    Button,
    Checkbox,
    IconDownloadLine,
    IconGradebookExportLine,
    Link,
    Metric,
    Pill,
    Table,
    Text
} from '@instructure/ui';
import Sidebar from "../components/Sidebar";
import {Alert} from "@instructure/ui-alerts";



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

function handleDownloadSubmissions(location) {
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
    const url =
        'https://' +
        location.state.login.canvas_url +
        '/api/v1/courses/' +
        location.state.course +
        '/assignments/' +
        location.state.quiz +
        '/submissions?zip=1';
    FetchCanvas(url, GEToptions);
}

function FetchAssignmentSubmissions() {
    const [graded, setGraded] = useState(false);
    const [users, setUsers] = useState([]);
    const [rows, setRows] = useState([]);
    const dataRef = useRef([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const url =
        'https://' +
        location.state.login.canvas_url +
        '/api/v1/courses/' +
        location.state.course +
        '/assignments/' +
        location.state.quiz +
        '/submissions';
    const urlUser = 'https://' + location.state.login.canvas_url + '/api/v1/courses/' + location.state.course + '/users';
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
    useEffect(() => {
        Promise.all([
            FetchCanvas(urlUser, GEToptions),
            FetchCanvas(url, GEToptions)
        ])
            .then(([users, result]) => {
                setUsers(users);
                console.log(users);

                dataRef.current = result;

                const newRows = dataRef.current.map((entry) => ({
                    id: entry.id,
                    Name: users.find(user => user.id === entry.user_id)?.short_name,
                    ID: entry.user_id,
                    Submission: entry.workflow_state,
                    Download: entry.attachments && entry.attachments.length > 0 ? entry.attachments[0].url : null,
                    Grade_Status: entry.grade,
                    Score: entry.grade,
                }));

                setRows(newRows);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [graded]);


    const handleButtonClick = async () => {
        try {
            for (let i = 0; i < dataRef.current.length; i++) {
                const submission = dataRef.current[i];

                if (submission.attachments && submission.attachments.length > 0) {
                    const attachment = submission.attachments[0];
                    const submissionUrl = attachment.url;
                    console.log('Submission URL:', submissionUrl);

                    window.api.StartDownload(submissionUrl, location.state.testcases);

                    window.api.ListenForGrade((grade) => {
                        console.log('Grade:', grade);
                        if (grade === -1){
                            setError('One (or more) grading attempts failed due to improper test case or student submission');
                        } else {
                            FetchCanvas(`${url}/${submission.user_id}?submission[posted_grade]=${grade}`, PUToptions);
                        }
                    });
                }
            }

        } catch (error) {
            console.error('Error:', error);
        }
            setGraded(true);
    };


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
        <>
            <div>
                <Sidebar/>
            </div>
            {error && (
                <div className='alert'>
                    <Alert variant="error" margin="small">
                        ERROR: {error}
                    </Alert>
                </div>
            )}
            <div className="assignment-name">
                <Text color="primary" size="x-large" weight="bold">{location.state.quiz_name}</Text>
            </div>

            <div className="grade-button">
                <Button color="primary" margin="small" onClick={() => handleButtonClick()}>
                    Grade All <IconGradebookExportLine />
                </Button>
            </div>

            <div className="download-button">
                <Button color="secondary" margin="small" onClick={() => handleDownloadSubmissions(location)}>Download All Submissions  <IconDownloadLine/></Button>
            </div>

            {/*<div className="toggle">*/}
            {/*    <Checkbox label="Publish grades" value="medium" variant="toggle" />*/}
            {/*</div>*/}

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
                                        ) : id === 'Download' ? (
                                            row[id] === null ? null : (
                                                <a href={row[id]} >
                                                    <Button>Download</Button>
                                                </a>
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
        </>
    );
}

export default FetchAssignmentSubmissions;