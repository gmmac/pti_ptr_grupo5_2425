import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import EmployeeSideBar from '../../components/Navbar/EmployeeSideNavbar'
import { Col, Container, Row, Tab } from 'react-bootstrap'
import { IsMobileContext } from '../../contexts/IsMobileContext';
import { useAuthEmployee } from '../../contexts/AuthenticationProviders/EmployeeAuthProvider';

export default function EmployeeLayoutPage() {
    const isMobile = useContext(IsMobileContext);
    const [actualTab, setActualTab] = useState(sessionStorage.getItem('selectedTab') || 'dashboard');
    const { employee, checkPasswordStatus, changePassword, checkIsAdmin, logOut } = useAuthEmployee();
    

    const handleChangeTab = (tab) => {
        if (tab) {
            setActualTab(tab);
        }
    };


  return (
    <>
        <Container fluid className="vh-100">
            <Tab.Container activeKey={actualTab} onSelect={handleChangeTab}>
                <Container fluid className="vh-100">
                    <Row className="h-100">
                        <EmployeeSideBar 
                            actualTab={actualTab}
                            handleChangeTab={handleChangeTab}
                            logOut={logOut}
                            isMobile={isMobile}
                        />
                        <Col
                            // xs={isMobile ? 12 : 2}
                            // md={isMobile ? 12 : 2}
                            // lg={isMobile ? 12 : 2}
                        >
                        <Outlet />

                        </Col>


                    </Row>
                </Container>
            </Tab.Container>
        </Container>    
    </>
  )
}
