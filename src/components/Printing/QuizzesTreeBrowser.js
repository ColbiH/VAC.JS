import React, { useState } from "react";
import {TreeBrowser} from "@instructure/ui";
import "./QuizzesDisplay.css";
import FetchQuizQuestions from "../../api/FetchQuizQuestions";
import Sidebar from "../Sidebar";
//TreeBrowser has a unique setup with collections and items
//These two functions were made to return the proper data to a Treebrowser acceptable form
//Both functions also come in handy when attempting to access the base data structure which holds all of the data upon clicking on an item
//Acts almost identically to the AssignmentTreeBrowser
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
                        course_name: classInfo.name,
                        collections: [],
                        items: {},
                    };
                }
            }
        }
    }
    return collections[1].items;
}

function QuizzesTreeBrowser({login, classes}) {
    const [clickedItem, setClickedItem] = useState(null);

    const handleItemClick = (item) => {
        setClickedItem(item);
    };

    return (
        <>
            <div>
                <Sidebar/>
            </div>
            <div className="quizzes-tree">
                <TreeBrowser
                    size= "large"
                    collections={transformDataForTreeBrowser(classes)}
                    items={transformDataForItems(classes)}
                    defaultExpanded={[1]}
                    rootId={1}
                    onItemClick={handleItemClick}
                />
            </div>

            {clickedItem !== null && (
                //Key here causes FetchQuizQuestions to update. Prior to this selection of a quiz after the first was selected didn't work.
                <FetchQuizQuestions key={clickedItem.id} login={login} course_id={transformDataForItems(classes)[clickedItem.id].course_id} course_name={transformDataForItems(classes)[clickedItem.id].course_name} quiz_id={clickedItem.id} quiz_name={transformDataForItems(classes)[clickedItem.id].name} />
            )}
        </>
    );
}

export default QuizzesTreeBrowser;
