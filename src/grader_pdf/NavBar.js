
import React from "react"; 
import {SideNavBar, IconUserLine, IconCoursesLine, ScreenReaderContent, Avatar, IconDashboardLine} from "@instructure/ui"

import { useNavigate } from "react-router-dom";

function Navbar() { 
    /*const navigate = useNavigate();

    const handleHome = () => {
      navigate('/home');
    }; */

    return ( 
        <div style={{height: '40rem'}}>
            <SideNavBar
                label="Main navigation"
                toggleLabel={{
                    expandedLabel: 'Minimize SideNavBar',
                    minimizedLabel: 'Expand SideNavBar'
                }}
            >
            <SideNavBar.Item
                icon={<IconUserLine />}
                label={<ScreenReaderContent>Home</ScreenReaderContent>}
                href="#"
            />
            <SideNavBar.Item
                icon={<Avatar name=" " size="x-small"/>}
                label="Account"
                //onClick={() => { this.loadSubNav('account') }}
            />
            <SideNavBar.Item selected
                icon={<IconDashboardLine />}
                label="Dashboard"
                href="/home"
            />
            <SideNavBar.Item
                icon={<IconCoursesLine />}
                label="Courses"
                href="#"
            />

            </SideNavBar>
        </div>


    ); 
} 
  
export default Navbar; 