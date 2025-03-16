import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/variables.css";
import { getLoggedUser,  removeLoggedUser} from "../../utils/auth";

const navItems = [
  { name: "About Us", path: "/about" },
  { name: "Our Services", path: "/services" },
  { name: "Store", path: "/store" },
];

export default function LoggedInNavBar({handle}) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = getLoggedUser();
  const userName = user ? user.name : "Utilizador";

  // Função para logout
  const handleLogout = () => {
    handle(false);
    removeLoggedUser();
    navigate("/login");
  };

  return (
    <Navbar
      style={{
        backgroundColor: "var(--light-grey)",
      }}
    >
      <Container>
        <Navbar.Brand
          style={{
            color: "var(--dark-grey)",
            fontFamily: "var(--title-font)",
            fontWeight: "bold",
          }}
          className="fs-3"
        >
          TechAway
        </Navbar.Brand>

        {/* Navegação principal */}
        <Nav
          style={{
            backgroundColor: "var(--white)",
            boxShadow: "var(--shadow-default)",
          }}
          className="rounded-pill px-2"
        >
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Nav.Item
                key={index}
                style={{
                  fontFamily: "var(--body-font)",
                  color: "var(--dark-grey)",
                  fontWeight: "bold",
                }}
                className="px-2 py-0 mx-2 fs-6"
              >
                <Nav.Link
                  as={Link}
                  to={item.path}
                  className="py-1 px-3 my-1 rounded-pill"
                  style={{
                    backgroundColor: isActive ? "var(--variant-one)" : "transparent",
                  }}
                >
                  {item.name}
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>

        {/* Dropdown com nome do usuário e logout */}
        <Nav>
          <NavDropdown title={<span style={{ marginRight: '20px' }}>{userName}</span>} className="rounded-pill px-3 fs-6" style={{ backgroundColor: "var(--variant-two)", fontWeight: "bold" }}>
            <NavDropdown.Item >Perfil</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}