import React, { useState, useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EmployeeRolesCatalog from '../components/employee/employeeRoles/EmployeeRolesCatalog';
import EmployeeProfile from '../components/employee/EmployeeProfile';
import { checkIfAdmin, getLoggedUser } from '../utils/auth';
import EmployeeCatalog from '../components/employee/EmployeeCatalog';

export default function EmployeeHomePage() {
    const [actualTab, setActualTab] = useState(sessionStorage.getItem('selectedTab') || 'home');
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = getLoggedUser();
        setIsAuthenticated(user);

        if (!user) {
            navigate("/employee/login");
        }

        setIsAdmin(checkIfAdmin());

    }, [navigate]);

    useEffect(() => {
        sessionStorage.setItem('selectedTab', actualTab);
    }, [actualTab]);

    const handleChangeTab = (tab) => {
        if (tab) {
            setActualTab(tab);
        }
    };

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <Tab.Container activeKey={actualTab} onSelect={handleChangeTab}>
            {/* Navegação das Abas */}
            <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                    <Nav.Link eventKey="home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="sells">Sells</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="purchases">Purchases</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="repairs">Repairs</Nav.Link>
                </Nav.Item>

                {isAdmin && (
                    <>
                        <Nav.Item>
                            <Nav.Link eventKey="roles">Roles</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="manage">Manage Employees</Nav.Link>
                        </Nav.Item>
                    </>
                )}

                <Nav.Item>
                    <Nav.Link eventKey="profile">Profile</Nav.Link>
                </Nav.Item>
            </Nav>

            <Tab.Content>
                <Tab.Pane eventKey="home">
                    <p>Tab content for Home</p>
                </Tab.Pane>
                <Tab.Pane eventKey="sells">
                    <p>Tab content for Sells</p>
                </Tab.Pane>
                <Tab.Pane eventKey="purchases">
                    <p>Tab content for Purchases</p>
                </Tab.Pane>
                <Tab.Pane eventKey="repairs">
                    <p>Tab content for Repairs</p>
                </Tab.Pane>

                {isAdmin && (
                    <>
                        <Tab.Pane eventKey="roles">
                            <EmployeeRolesCatalog />
                        </Tab.Pane>
                        <Tab.Pane eventKey="manage">
                            <EmployeeCatalog />
                        </Tab.Pane>
                    </>
                )}

                <Tab.Pane eventKey="profile">
                    <EmployeeProfile />
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    );
}
