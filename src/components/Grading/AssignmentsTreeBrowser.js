import React, { useState } from "react";
import {
    Button,
    FormFieldGroup,
    IconAddLine,
    IconPlusSolid,
    Text,
    TextArea,
    TextInput,
    TreeBrowser
} from "@instructure/ui";
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
    const BaseTestCases = () =>
        <FormFieldGroup
            // description="Test Cases"
            colSpacing="medium"
            layout="columns"
            vAlign="top"
        >
            <div className="points">
                <TextInput renderLabel="Points" width="70px" value={testCases.points}
                           onChange={(e) => setTestCases({ ...testCases, points: e.target.value })}/>
            </div>

            <div className="input">
                <TextArea label="Input" height="8rem" maxHeight="8rem" width="250px" value={testCases.sampleInput}
                          onChange={(e) => setTestCases({ ...testCases, sampleInput: e.target.value })}/>
            </div>

            <div className="output">
                <TextArea label="Expected Output" height ="8rem" maxHeight="8rem" width="250px" value={testCases.expectedOutput}
                          onChange={(e) => setTestCases({ ...testCases, expectedOutput: e.target.value })}/>
            </div>
        </FormFieldGroup>

    const AddTest = () =>
        <div className="add-test">
            <Button
                renderIcon={IconAddLine}
                onClick={setPlus}>Add Test Case</Button>
            {/*{clickedPlus ? <BaseTestCases/>: null}*/}
        </div>

    const [clickedPlus, setClickedPlus] = useState(false);
    const navigate = useNavigate();
    const [testCases, setTestCases] = useState({
        points: '',
        sampleInput: '',
        expectedOutput: '',
    });

    const setPlus = () => {
        setClickedPlus(true);
    };

    const handleItemClick = async (item) => {
        navigate('/fetchsassignmentsubmissions', {
            state: {
                login: login,
                course: transformDataForItems(classes)[item.id].course_id,
                quiz_name: transformDataForItems(classes)[item.id].name,
                quiz: item.id,
                testcases: testCases
            }});
    };

    return (
        <>
            <div>
                <Sidebar/>
            </div>
            <div className="instructions">
                <Text color="primary" size="large" weight="bold">Enter the assigned point value, input, and expected output for each test case in boxes below.  Then click on the appropriate assignment.</Text>
            </div>
            <div className="test-cases">
                <BaseTestCases/>
                <AddTest/>
                {/*<div className="add-test">*/}
                {/*    <Button*/}
                {/*        renderIcon={IconAddLine}*/}
                {/*        onClick={setPlus}>Add Test Case</Button>*/}
                {/*    {clickedPlus ? <BaseTestCases/>: null}*/}
                {/*</div>*/}
            {/*    <FormFieldGroup*/}
            {/*        // description="Test Cases"*/}
            {/*        colSpacing="medium"*/}
            {/*        layout="columns"*/}
            {/*        vAlign="top"*/}
            {/*    >*/}
            {/*        <div className="points">*/}
            {/*            <TextInput renderLabel="Points" width="70px" value={testCases.points}*/}
            {/*                       onChange={(e) => setTestCases({ ...testCases, points: e.target.value })}/>*/}
            {/*        </div>*/}

            {/*        <div className="input">*/}
            {/*            <TextArea label="Input" height="8rem" maxHeight="8rem" width="250px" value={testCases.sampleInput}*/}
            {/*                       onChange={(e) => setTestCases({ ...testCases, sampleInput: e.target.value })}/>*/}
            {/*        </div>*/}

            {/*        <div className="output">*/}
            {/*            <TextArea label="Expected Output" height ="8rem" maxHeight="8rem" width="250px" value={testCases.expectedOutput}*/}
            {/*                       onChange={(e) => setTestCases({ ...testCases, expectedOutput: e.target.value })}/>*/}
            {/*        </div>*/}
            {/*    </FormFieldGroup>*/}


            </div>



            <div className="assignment-tree">
                <TreeBrowser
                    size="large"
                    collections={transformDataForTreeBrowser(classes)}
                    items={transformDataForItems(classes)}
                    defaultExpanded={[1]}
                    rootId={1}
                    onItemClick={handleItemClick}
                />
            </div>
        </>
    );
}

export default AssignmentsTreeBrowser;
