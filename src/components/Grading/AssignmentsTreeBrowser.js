import React, { useState } from "react";
import {TreeBrowser} from "@instructure/ui";
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
    const [clickedItem, setClickedItem] = useState(null);

    const handleItemClick = (item) => {
        setClickedItem(item);
    };

    return (
        <>
            <div>
                <Sidebar/>
            </div>
            <TreeBrowser
                size="large"
                collections={transformDataForTreeBrowser(classes)}
                items={transformDataForItems(classes)}
                defaultExpanded={[1]}
                rootId={1}
                onItemClick={handleItemClick}
            />
            {clickedItem !== null && (
                <FetchAssignmentSubmissions login={login} course={transformDataForItems(classes)[clickedItem.id].course_id} quiz={clickedItem.id} />
            )}
        </>
    );
}

export default AssignmentsTreeBrowser;
