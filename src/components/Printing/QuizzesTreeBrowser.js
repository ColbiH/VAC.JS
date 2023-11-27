import React, { useState } from "react";
import {Pagination, TreeBrowser} from "@instructure/ui";
import "./QuizzesDisplay.css";
import FetchQuizQuestions from "../../api/FetchQuizQuestions";
import Sidebar from "../Sidebar";

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
    const [currentPage, setCurrentPage] = useState(0);

    const setPages = (page) => {
        setCurrentPage(page);
    };

    const handleItemClick = (item) => {
        setClickedItem(item);
    };

    const pages = Array.from(Array(9)).map((v, i) => <Pagination.Page
        key={i}
        onClick={setPages}
        current={i === currentPage}>
        {i + 1}
    </Pagination.Page>);

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
                {/*<Pagination*/}
                {/*    as="nav"*/}
                {/*    margin="small"*/}
                {/*    variant="compact"*/}
                {/*    labelNext="Next Page"*/}
                {/*    labelPrev="Previous Page"*/}
                {/*    themeOverride={{*/}
                {/*        margin: "small"*/}
                {/*    }}*/}
                {/*>*/}
                {/*    {pages}*/}
                {/*</Pagination>*/}
            </div>


            {clickedItem !== null && (
                <FetchQuizQuestions login={login} course_id={transformDataForItems(classes)[clickedItem.id].course_id} course_name={transformDataForItems(classes)[clickedItem.id].course_name} quiz_id={clickedItem.id} quiz_name={transformDataForItems(classes)[clickedItem.id].name} />
            )}
        </>
    );
}

export default QuizzesTreeBrowser;
