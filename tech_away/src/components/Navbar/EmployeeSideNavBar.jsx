import React from 'react';
import { Nav } from 'react-bootstrap';
import {
  HouseDoorFill,
  CurrencyDollar,
  Wrench,
  BarChartLine,
  PersonFill,
  BoxArrowRight,
  PeopleFill
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

export default function EmployeeSideBar({ actualTab, handleChangeTab, logOut }) {
  const navigate = useNavigate();

  const handleTabClick = (tab, path) => {
    handleChangeTab(tab);
    navigate("/employee");
  };

  const handleLogOut = () => {
    logOut();
    navigate("/employee/login", { replace: true });
  };

  return (
    <>
      <h2 className="mb-4 p-3 fs-2" style={{ fontWeight: "bold" }}>TechAway</h2>
      <Nav className="flex-column">

        <Nav.Item className="employee-custom-tabs fs-5">
          <Nav.Link
            onClick={() => handleTabClick('dashboard')}
            className={actualTab === 'dashboard' ? 'active-manual' : ''}
          >
            <HouseDoorFill className="me-2" /> Dashboard
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="employee-custom-tabs fs-5">
          <Nav.Link
            onClick={() => handleTabClick('purchases')}
            className={actualTab === 'purchases' ? 'active-manual' : ''}
          >
            <CurrencyDollar className="me-2" /> Purchases
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="employee-custom-tabs fs-5">
          <Nav.Link
            onClick={() => handleTabClick('sales')}
            className={actualTab === 'sales' ? 'active-manual' : ''}
          >
            <BarChartLine className="me-2" /> Sales
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="employee-custom-tabs fs-5">
          <Nav.Link
            onClick={() => handleTabClick('repairs')}
            className={actualTab === 'repairs' ? 'active-manual' : ''}
          >
            <Wrench className="me-2" /> Repairs
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="employee-custom-tabs fs-5">
          <Nav.Link
            onClick={() => handleTabClick('charityproject')}
            className={actualTab === 'charityproject' ? 'active-manual' : ''}
          >
            <PeopleFill className="me-2" /> Charity Projects
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="employee-custom-tabs fs-5">
          <Nav.Link
            onClick={() => handleTabClick('profile')}
            className={actualTab === 'profile' ? 'active-manual' : ''}
          >
            <PersonFill className="me-2" /> Profile
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="mt-3 employee-custom-tabs fs-5">
          <Nav.Link className="text-danger" onClick={handleLogOut}>
            <BoxArrowRight className="me-2" /> Logout
          </Nav.Link>
        </Nav.Item>

      </Nav>
    </>
  );
}
