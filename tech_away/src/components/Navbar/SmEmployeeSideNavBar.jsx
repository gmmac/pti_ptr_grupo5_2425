import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import EmployeeSideBar from './EmployeeSideNavbar';

export default function SmEmployeeSideNavBar({ actualTab, handleChangeTab, logOut }) {
  const [show, setShow] = useState(false);

  const toggleMenu = () => setShow(!show);
  const closeMenu = () => setShow(false);

  return (
    <>
      {/* Botão do menu hambúrguer */}
      <Button variant="light" onClick={toggleMenu} className="m-2">
        <List size={30} />
      </Button>

      <Offcanvas show={show} onHide={closeMenu} responsive="md">

        <Offcanvas.Header closeButton>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <EmployeeSideBar
            actualTab={actualTab}
            handleChangeTab={(selected) => {
              handleChangeTab(selected);
              closeMenu(); // fecha o menu após clique
            }}
            logOut={() => {
              logOut();
              closeMenu(); // fecha o menu ao deslogar
            }}
            isMobile={true}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
