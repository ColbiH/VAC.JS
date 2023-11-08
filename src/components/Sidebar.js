import {
    IconAdminLine,
    IconGradebookLine,
    IconPrinterLine,
    SideNavBar
} from "@instructure/ui";
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

function Sidebar() {
    const [currentPage, setCurrentPage] = useState(null);
    const changePage = (page) => {
        setCurrentPage(page);
    };
    //const { state: { login } = {} } = useLocation();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div style={{height: '100vh'}}>
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
                    href = '/login'
                />
                <SideNavBar.Item
                    icon={<IconPrinterLine/>}
                    label="Pdf printer"
                    onClick={() => navigate('/fetchclassesquizzes', {state: {login: location.state.login, classes : location.state.classes }})}
                />
                <SideNavBar.Item
                    icon={<IconGradebookLine/>}
                    label="Code Grader"
                    onClick={() => {changePage(null)}}
                    // onClick={() => navigate('/printvsgrade', {state: {login: location.state.login, classes: location.state.classes }})}
                />
            </SideNavBar>
        </div>

    );
}

export default Sidebar;