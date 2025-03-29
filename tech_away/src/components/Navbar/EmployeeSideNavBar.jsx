import React from 'react';
import { Col, Nav } from 'react-bootstrap';
import {
  HouseDoorFill,
  CurrencyDollar,
  Wrench,
  BarChartLine,
  PersonFill,
  BoxArrowRight,
  PeopleFill,
  GearFill
} from 'react-bootstrap-icons';

export default function EmployeeSideBar({ actualTab, handleChangeTab, logOut, isMobile }) {
    return (
        <
            // xs={isMobile ? 12 : 2}
            // md={isMobile ? 12 : 2}
            // lg={isMobile ? 12 : 2}
            // className="bg-light border-end p-0"
            // style={{ boxShadow: '2px 0 5px rgba(0, 0, 0, 0.3)', zIndex: 1 }}
        >
            <h2 className="mb-4 p-3 fs-2" style={{ fontWeight: "bold" }}>TechAway</h2>
            <Nav variant="pills" className="flex-column" activeKey={actualTab} onSelect={handleChangeTab}>
                
                <Nav.Item className="employee-custom-tabs fs-5">
                    <Nav.Link eventKey="dashboard">
                        <HouseDoorFill className="me-2" /> Dashboard
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="employee-custom-tabs fs-5">
                    <Nav.Link eventKey="purchases">
                        <CurrencyDollar className="me-2" /> Purchases
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="employee-custom-tabs fs-5">
                    <Nav.Link eventKey="sales">
                        <BarChartLine className="me-2" /> Sales
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="employee-custom-tabs fs-5">
                    <Nav.Link eventKey="repairs">
                        <Wrench className="me-2" /> Repairs
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="employee-custom-tabs fs-5">
                    <Nav.Link eventKey="charityproject">
                        <PeopleFill className="me-2" /> Charity Projects
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="employee-custom-tabs fs-5">
                    <Nav.Link eventKey="profile">
                        <PersonFill className="me-2" /> Profile
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="mt-3 employee-custom-tabs fs-5">
                    <Nav.Link className="text-danger" onClick={logOut}>
                        <BoxArrowRight className="me-2" /> Logout
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}
