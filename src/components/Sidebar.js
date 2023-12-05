import {
    IconAdminLine,
    IconGradebookLine,
    IconPrinterLine, ScreenReaderContent,
    SideNavBar
} from "@instructure/ui";
import {useLocation, useNavigate} from "react-router-dom";
import logo from './images/vacjs-high-resolution-logo-white-transparent.png';
import "./Sidebar.css";

function Sidebar() {
    //const { state: { login } = {} } = useLocation();
    const navigate = useNavigate();
    const location = useLocation();
    //const viewHeight = window.outerHeight;

    return (
        <div className = "sidebar">
            <SideNavBar
                label="Main navigation"
                toggleLabel={{
                    expandedLabel: 'Minimize SideNavBar',
                    minimizedLabel: 'Expand SideNavBar'


                }}
                themeOverride={{
                    backgroundColor: '#0374B5',
                    minimizedWidth: '4rem',
                    overflow: 'hidden'
                }}

            >
                <SideNavBar.Item
                    icon={ <img
                        src={logo}
                        alt="Logo"
                        style={{ width: '50px', height: '50px', }}
                    />}
                    onClick={() => navigate('/printvsgrade', {state: {login: location.state.login, classes : location.state.classes }})}
                    themeOverride={{
                        backgroundColor: '#0374B5'
                    }}

                 label={<ScreenReaderContent>Home</ScreenReaderContent>}/>

                <SideNavBar.Item
                    icon={<IconAdminLine/>}
                    label="Login"
                    href = '/login'
                    themeOverride={{
                        backgroundColor: '#0374B5'
                    }}

                />
                <SideNavBar.Item
                    icon={<IconPrinterLine/>}
                    label="PDF Printer"
                    onClick={() => navigate('/fetchclassesquizzes', {state: {login: location.state.login, classes : location.state.classes }})}
                    themeOverride={{
                        backgroundColor: '#0374B5'
                    }}

                />
                <SideNavBar.Item
                    icon={<IconGradebookLine/>}
                    label="Code Grader"
                    onClick={() => navigate('/fetchclassesassignments', {state: {login: location.state.login, classes: location.state.classes }})}
                    themeOverride={{
                        backgroundColor: '#0374B5'
                    }}

                />
            </SideNavBar>
        </div>

    );
}

export default Sidebar;