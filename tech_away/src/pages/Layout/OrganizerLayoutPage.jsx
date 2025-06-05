import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row, Tab } from 'react-bootstrap';
import SideBar from '../../components/Navbar/SideBar';
import SmSideNavBar from '../../components/Navbar/SmSideNavBar';
import {
  HouseDoorFill,
  PeopleFill,
  BoxSeamFill,
  PersonFill
} from 'react-bootstrap-icons';
import { useOrganizerAuth } from '../../contexts/AuthenticationProviders/OrganizerAuthProvider';

export default function OrganizerLayoutPage() {
  const [actualTab, setActualTab] = useState(sessionStorage.getItem('organizerSelectedTab') || 'charityproject');
  const { logOut } = useOrganizerAuth();

  const handleChangeTab = (tab) => {
    if (tab) {
      setActualTab(tab);
      sessionStorage.setItem('organizerSelectedTab', tab);
    }
  };

  useEffect(() => {
    handleChangeTab(actualTab);
  }, [actualTab]);

  const menuItems = [
    { key: 'charityproject', label: 'Charity Projects', icon: <PeopleFill /> },
    { key: 'warehouses', label: 'Warehouses', icon: <BoxSeamFill /> },
    { key: 'profile', label: 'Profile', icon: <PersonFill /> }
  ];

  return (
    <Container fluid className="p-0">
      <Tab.Container activeKey={actualTab}>
        {/* Mobile sidebar */}
        <SmSideNavBar
          actualTab={actualTab}
          handleChangeTab={setActualTab}
          logOut={logOut}
          menuItems={menuItems}
          title="TechAway"
          basePath="/organizer"
        />

        <Row className="gx-0">
          {/* Sidebar fixa em telas grandes */}
          <Col
            lg={2}
            className="d-none d-lg-block bg-light border-end position-fixed h-100 p-0"
            style={{ boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)', zIndex: 1030 }}
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

          {/* Conteúdo principal */}
          <Col
            xs={12}
            lg={{ span: 10, offset: 2 }}
            className="ms-auto"
            style={{ height: '100vh', overflowY: 'auto', padding: '1.5rem' }}
          >
            <Outlet />
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
