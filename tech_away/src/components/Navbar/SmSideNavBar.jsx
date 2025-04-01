import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import SideBar from './SideBar'; // a versão generalizada da barra lateral

export default function SmSideNavBar({
  actualTab,
  handleChangeTab,
  logOut,
  menuItems,
  title = "App",
  basePath = "/"
}) {
  const [show, setShow] = useState(false);

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
          <SideBar
            actualTab={actualTab}
            handleChangeTab={handleTabChange}
            logOut={handleLogout}
            menuItems={menuItems}
            title={title}
            basePath={basePath}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
