import React, { useState } from "react";
import {Button, FormFieldGroup, IconPlusSolid, Text, TextInput, TreeBrowser} from "@instructure/ui";
import { useNavigate } from 'react-router-dom';
import "./AssignmentsDisplay.css"
import Sidebar from "../Sidebar";
import FetchAssignmentSubmissions from "../../api/FetchAssignmentSubmissions";


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
                        name: quiz.name,
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


function AssignmentsTreeBrowser({login, classes}) {
    const navigate = useNavigate();
    const [testCases, setTestCases] = useState({
        points: '',
        sampleInput: '',
        expectedOutput: '',
    });
    const handleItemClick = async (item) => {
        navigate('/fetchsassignmentsubmissions', {
            state: {
                login: login,
                course: transformDataForItems(classes)[item.id].course_id,
                quiz: item.id,
                testcases: testCases
            }});
    };

    return (
        <>
            <div>
                <Sidebar/>
            </div>
            <div className="test-cases">
                <FormFieldGroup
                    description="Test Cases"
                    colSpacing="medium"
                    layout="columns"
                    vAlign="top"
                >
                    <div className="points">
                        <TextInput renderLabel="Points" width="70px" value={testCases.points}
                                   onChange={(e) => setTestCases({ ...testCases, points: e.target.value })}/>
                    </div>

                    <div className="input">
                        <TextInput renderLabel="Sample Input" width="250px" value={testCases.sampleInput}
                                   onChange={(e) => setTestCases({ ...testCases, sampleInput: e.target.value })}/>
                    </div>

                    <div className="output">
                        <TextInput renderLabel="Expected Output" width="150px" value={testCases.expectedOutput}
                                   onChange={(e) => setTestCases({ ...testCases, expectedOutput: e.target.value })}/>
                    </div>
                </FormFieldGroup>

                <div className="add-test">
                    <Button> <IconPlusSolid/> </Button>
                </div>

            </div>


            <div className="assignment-name">
                <Text color="primary" size="x-large" weight="bold">Assignment name here</Text>
            </div>

            <TreeBrowser
                size="large"
                collections={transformDataForTreeBrowser(classes)}
                items={transformDataForItems(classes)}
                defaultExpanded={[1]}
                rootId={1}
                onItemClick={handleItemClick}
            />
        </>
    );
}

export default AssignmentsTreeBrowser;
