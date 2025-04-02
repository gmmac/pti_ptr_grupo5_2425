import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import EmployeeSideBar from './EmployeeSideNavbar';

export default function SmEmployeeSideNavBar({ actualTab, handleChangeTab, logOut }) {
  const [show, setShow] = useState(false);

  // Handlers
  const handleToggleMenu = () => setShow(prev => !prev);
  
  const handleCloseMenu = () => setShow(false);

  const handleTabChange = (selectedTab) => {
    handleChangeTab(selectedTab);
    handleCloseMenu();
  };
  const handleLogout = () => {
    logOut();
    handleCloseMenu();
  };

  return (
    <>
      <div className="d-lg-none">
        <Button variant="light" onClick={handleToggleMenu} className="m-2">
          <List size={30} />
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleCloseMenu} placement="start">
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <EmployeeSideBar
            actualTab={actualTab}
            handleChangeTab={handleTabChange}
            logOut={handleLogout}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
