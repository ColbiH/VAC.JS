import {
    IconAdminLine,
    IconGradebookLine,
    IconPrinterLine,
    SideNavBar
} from "@instructure/ui";
import {useLocation, useNavigate} from "react-router-dom";

function Sidebar() {
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
                    label="PDF Printer"
                    onClick={() => navigate('/fetchclassesquizzes', {state: {login: location.state.login, classes : location.state.classes }})}
                />
                <SideNavBar.Item
                    icon={<IconGradebookLine/>}
                    label="Code Grader"
                    onClick={() => navigate('/fetchclassesassignments', {state: {login: location.state.login, classes: location.state.classes }})}
                />
            </SideNavBar>
        </div>

    );
}

export default Sidebar;