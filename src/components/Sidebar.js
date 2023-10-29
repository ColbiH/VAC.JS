import {
    Avatar,
    Badge,
    IconAdminLine,
    IconGradebookLine, IconInboxLine, IconPrinterLine,
    IconUserLine,
    ScreenReaderContent,
    SideNavBar
} from "@instructure/ui";
//import changePage from "./PrintVsGrade";
import React, {useState} from "react";
import Login from "./Login.js"
import Jenny from "./Jenny";
import Sam from "./Sam";
import {useLocation, useNavigate} from "react-router-dom";

function Sidebar() {
    const [currentPage, setCurrentPage] = useState(null);
    const changePage = (page) => {
        setCurrentPage(page);
    };
    const { state: { login } = {} } = useLocation();
    const navigate = useNavigate();

    return (
        <div style={{height: '35rem'}}>
            <SideNavBar
                label="Main navigation"
                toggleLabel={{
                    expandedLabel: 'Minimize SideNavBar',
                    minimizedLabel: 'Expand SideNavBar'
                }}
            >
                <SideNavBar.Item
                    icon={<IconAdminLine/>}
                    label="Login"
                    //onclick={() => {changePage('login')}}
                    href = '/login'
                />
                {/*<SideNavBar.Item*/}
                {/*    icon={<IconAdminLine/>}*/}
                {/*    label="Login"*/}
                {/*    onClick={() => {changePage('login')}}*/}
                {/*/>*/}
                <SideNavBar.Item
                    icon={<IconPrinterLine/>}
                    label="Pdf printer"
                    // onClick={() => {changePage('sam')}}
                    onClick={() => navigate('/sam', {state: {login: login }})}
                    //href = '/sam'
                />
                {/*<SideNavBar.Item*/}
                {/*    icon={<IconPrinterLine/>}*/}
                {/*    label="Pdf printer"*/}
                {/*    onClick={() => {changePage('sam')}}*/}
                {/*/>*/}
                <SideNavBar.Item
                    icon={<IconGradebookLine/>}
                    label="Code Grader"
                    onClick={() => {changePage(null)}}
                />
            </SideNavBar>
            {/*{currentPage === 'login' && <Login />}*/}
            {/*{currentPage === 'sam' && <Sam />}*/}
        </div>

    );
}

export default Sidebar;