import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row, Tab } from 'react-bootstrap';
import SideBar from '../../components/Navbar/SideBar';
import SmSideNavBar from '../../components/Navbar/SmSideNavBar';
import { BarChartLine, BoxSeam, BoxSeamFill, CurrencyDollar, HouseDoorFill, PeopleFill, PersonFill, Wrench } from 'react-bootstrap-icons';
import { useOrganizerAuth } from '../../contexts/AuthenticationProviders/OrganizerAuthProvider';

export default function OrganizerLayoutPage() {
  const [actualTab, setActualTab] = useState(sessionStorage.getItem('organizerSelectedTab') || 'dashboard');
  const { logOut } = useOrganizerAuth();

  const handleChangeTab = (tab) => {
    if (tab) {
      setActualTab(tab);
      sessionStorage.setItem('organizerSelectedTab', tab);
    }
  };

  useEffect(() => {
    handleChangeTab(actualTab)
  }, [actualTab])

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <HouseDoorFill />, path: "/organizer" },
    { key: "charityproject", label: "Charity Projects", icon: <PeopleFill /> },
    { key: "warehouses", label: "Warehouses", icon: <BoxSeamFill /> },
    { key: "profile", label: "Profile", icon: <PersonFill /> },
  ];
  

  return (
    <Container fluid className="vh-100">
      <Tab.Container activeKey={actualTab}>
        {/* Sempre renderiza o componente com Offcanvas controlado internamente */}
        <SmSideNavBar
          actualTab={actualTab}
          handleChangeTab={setActualTab}
          logOut={logOut}
          menuItems={menuItems}
          title="TechAway"
          basePath="/organizer"
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

              <SideBar 
                title="TechAway"
                menuItems={menuItems}
                actualTab={actualTab}
                handleChangeTab={setActualTab}
                logOut={logOut}
                basePath="/organizer"
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
