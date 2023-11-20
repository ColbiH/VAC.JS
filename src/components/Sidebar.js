import {
    IconAdminLine,
    IconGradebookLine,
    IconPrinterLine,
    SideNavBar
} from "@instructure/ui";
import {useLocation, useNavigate} from "react-router-dom";
import logo from './images/logo-color.png';

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
                themeOverride={{
                    backgroundColor: '#0374B5'
                }}

            >
                <SideNavBar.Item
                    icon={ <img
                        src={logo}
                        label="VAC.JS"
                        alt="Logo"
                        style={{ width: '50px', height: '50px', }}
                    />}
                    href = '/logo'
                    themeOverride={{
                        backgroundColor: '#0374B5'
                    }}

                />
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