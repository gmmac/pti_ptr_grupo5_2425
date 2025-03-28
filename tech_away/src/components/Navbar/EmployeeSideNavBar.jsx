// src/components/Navbar/EmployeeSidebar.js

import React from 'react';
import { Col, Nav } from 'react-bootstrap';

export default function EmployeeSideBar({ actualTab, handleChangeTab, isAdmin, logOut, isMobile }) {
    return (
        <Col
            xs={isMobile ? 12 : 2}
            md={isMobile ? 12 : 2}
            lg={isMobile ? 12 : 2}
            className="bg-light border-end p-0"
            style={{ boxShadow: '2px 0 5px rgba(0, 0, 0, 0.3)', zIndex: 1 }}
        >
            <h2 className="mb-4 p-3 fs-2" style={{ fontWeight: "bold" }}>TechAway</h2>
            <Nav variant="pills" className="flex-column" activeKey={actualTab} onSelect={handleChangeTab}>
                <Nav.Item className="custom-tabs fs-5">
                    <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item className="custom-tabs fs-5">
                    <Nav.Link eventKey="purchases">Purchases</Nav.Link>
                </Nav.Item>
                <Nav.Item className="custom-tabs fs-5">
                    <Nav.Link eventKey="sales">Sales</Nav.Link>
                </Nav.Item>
                <Nav.Item className="custom-tabs fs-5">
                    <Nav.Link eventKey="repairs">Repairs</Nav.Link>
                </Nav.Item>
                <Nav.Item className="custom-tabs fs-5">
                    <Nav.Link eventKey="charityproject">Charity Projects</Nav.Link>
                </Nav.Item>
                {isAdmin && (
                    <Nav.Item className="custom-tabs fs-5">
                        <Nav.Link eventKey="admin">Admin</Nav.Link>
                    </Nav.Item>
                )}
                <Nav.Item className="custom-tabs fs-5">
                    <Nav.Link eventKey="profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mt-3 custom-tabs fs-5">
                    <Nav.Link className="text-danger" onClick={logOut}>Logout</Nav.Link>
                </Nav.Item>
            </Nav>
        </Col>
    );
}
