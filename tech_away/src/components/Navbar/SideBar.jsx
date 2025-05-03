import React from 'react';
import { Nav } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

export default function SideBar({ 
  title = "App Name", 
  actualTab, 
  handleChangeTab, 
  logOut, 
  menuItems = [], 
  basePath = "/" 
}) {
  const navigate = useNavigate();

  const handleTabClick = (tabKey, path) => {
    handleChangeTab(tabKey);
    navigate(path || basePath);
  };

  const handleLogOut = () => {
    logOut();
    navigate(`${basePath}/login`, { replace: true });
  };

  return (
    <>
      <h2 className="mb-4 p-3 fs-2" style={{ fontWeight: "bold" }}>{title}</h2>
      <Nav className="flex-column">
        {menuItems.map(({ key, label, icon, path }) => (
          <Nav.Item key={key} className="employee-custom-tabs fs-5 m-0">
            <Nav.Link
              onClick={() => handleTabClick(key, path)}
              className={actualTab === key ? 'active-manual py-3' : 'py-3'}
            >
              {icon && <span className="me-2">{icon}</span>} {label}
            </Nav.Link>
          </Nav.Item>
        ))}

        <Nav.Item className="employee-custom-tabs fs-5 m-0">
          <Nav.Link className="text-danger py-3" onClick={handleLogOut}>
            <BoxArrowRight className="me-2" /> Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}
