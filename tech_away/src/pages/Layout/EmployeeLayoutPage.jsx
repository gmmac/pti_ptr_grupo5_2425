import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row, Tab } from 'react-bootstrap';
import SideBar from '../../components/Navbar/SideBar';
import SmSideNavBar from '../../components/Navbar/SmSideNavBar';
import { useAuthEmployee } from '../../contexts/AuthenticationProviders/EmployeeAuthProvider';
import { BarChartLine, CurrencyDollar, HouseDoorFill, PeopleFill, PersonFill, Wrench } from 'react-bootstrap-icons';

export default function EmployeeLayoutPage() {
  const [actualTab, setActualTab] = useState(sessionStorage.getItem('employeeSelectedTab') || 'dashboard');
  const { logOut } = useAuthEmployee();

  const handleChangeTab = (tab) => {
    if (tab) {
      setActualTab(tab);
      sessionStorage.setItem('employeeSelectedTab', tab);
    }
  };

  useEffect(() => {
    handleChangeTab(actualTab)
  }, [actualTab])

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <HouseDoorFill />, path: "/employee" },
    { key: "purchases", label: "Purchases", icon: <CurrencyDollar /> },
    { key: "sales", label: "Sales", icon: <BarChartLine /> },
    { key: "repairs", label: "Repairs", icon: <Wrench /> },
    { key: "charityproject", label: "Charity Projects", icon: <PeopleFill /> },
    { key: "profile", label: "Profile", icon: <PersonFill /> },
  ];
  

  return (
    <Container fluid className="p-0">
      <Tab.Container activeKey={actualTab}>
        {/* Offcanvas para telas pequenas */}
        <SmSideNavBar
          actualTab={actualTab}
          handleChangeTab={setActualTab}
          logOut={logOut}
          menuItems={menuItems}
          title="TechAway"
          basePath="/employee"
        />
        <Container fluid className="vh-100 p-0">
          <Row className="gx-0">
            {/* Sidebar fixa (visível apenas em telas grandes) */}
            <Col
              lg={2}
              className="d-none d-lg-block bg-light border-none position-fixed h-100 overflow-hidden p-0"
              style={{ boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)', zIndex: 1030 }}
            >
              <SideBar 
                title="TechAway"
                menuItems={menuItems}
                actualTab={actualTab}
                handleChangeTab={setActualTab}
                logOut={logOut}
                basePath="/employee"
              />
            </Col>
    
            {/* Conteúdo principal com margem à esquerda */}
            <Col
              xs={12}
              lg={{ span: 10, offset: 2 }}
              className="ms-auto"
              style={{ height: '100vh', overflowY: 'auto', padding: '1.5rem' }}
            >
              <Outlet />
            </Col>
          </Row>
        </Container>
      </Tab.Container>
    </Container>
  );
  
}
