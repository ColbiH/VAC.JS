import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {TreeBrowser, CondensedButton} from "@instructure/ui";
import "./AssignmentDisplay.css";
import Sidebar from "./Sidebar";


function AssignmentTreeBrowser({login, classes}) {
    const [clickedItem, setClickedItem] = useState(null);

    const handleItemClick = (item) => {
        setClickedItem(item);
    };

    const navigate = useNavigate();

    return (
        <>
            <div>
                <Sidebar/>
            </div>

            <div className="assignment-tree">
                <TreeBrowser
                    size= "large"
                    /*collections={transformDataForTreeBrowser(classes)}
                    items={transformDataForItems(classes)}
                    */
                    collections={{
                        1: {
                          id: 1,
                          name: "Classes",
                          collections: [2], //folders and single assignments contained in Classes
                          items: [],
                        },
                        2: { id: 2, name: "Nudges Test", collections: [], items: [1,2,3] },
                        
                      }}
                      items={{
                        1: { id: 1, name: "Exercise 1", descriptor: <CondensedButton onClick={() => navigate("/assignmenttable")}> View Assignment</CondensedButton>},
                        2: { id: 2, name: "Exercise 2", descriptor: <CondensedButton onClick={() => navigate("/assignmenttable")}>View Assignment</CondensedButton>},
                        3: { id: 3, name: "Project 1"},//, descriptor: <CondensedButton onClick={() => navigate("/assignmenttable")}>View Assignment</CondensedButton>},
                      }}

                    defaultExpanded={[1]}
                    rootId={1}
                    onItemClick={handleItemClick}
                />
            </div>
            
        </>
    );
}

export default AssignmentTreeBrowser;