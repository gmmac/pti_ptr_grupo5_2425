import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row, Tab } from 'react-bootstrap';
import EmployeeSideBar from '../../components/Navbar/EmployeeSideNavbar';
import SmEmployeeSideNavBar from '../../components/Navbar/SmEmployeeSideNavBar';
import { useAuthEmployee } from '../../contexts/AuthenticationProviders/EmployeeAuthProvider';

export default function EmployeeLayoutPage() {
  const [actualTab, setActualTab] = useState(sessionStorage.getItem('selectedTab') || 'dashboard');
  const { logOut } = useAuthEmployee();

  const handleChangeTab = (tab) => {
    if (tab) {
      setActualTab(tab);
      sessionStorage.setItem('selectedTab', tab);
    }
  };

  return (
    <Container fluid className="vh-100">
      <Tab.Container activeKey={actualTab} onSelect={handleChangeTab}>
        {/* Sempre renderiza o componente com Offcanvas controlado internamente */}
        <SmEmployeeSideNavBar
          actualTab={actualTab}
          handleChangeTab={handleChangeTab}
          logOut={logOut}
        />

        <Container fluid className="vh-100">
          <Row className="h-100">
            {/* Sidebar fixa apenas para telas lg+ */}
            <Col
              md={4}
              lg={2}
              className="bg-light border-end d-none d-lg-block p-0"
              style={{ boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)', zIndex: 1 }}
            >
              <EmployeeSideBar
                actualTab={actualTab}
                handleChangeTab={handleChangeTab}
                logOut={logOut}
              />
            </Col>

            <Col
              md={8}
              lg={10}
            >
              <Outlet />
            </Col>
            
          </Row>
        </Container>
      </Tab.Container>
    </Container>
  );
}
