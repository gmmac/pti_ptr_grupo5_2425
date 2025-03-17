import React, { useState, useEffect } from 'react';
import { Tab, Nav, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EmployeeRolesCatalog from '../components/employee/employeeRoles/EmployeeRolesCatalog';
import EmployeeProfile from '../components/employee/EmployeeProfile';
import { checkIfAdmin, employeeChangedPassword, getLoggedUser } from '../utils/auth';
import EmployeeCatalog from '../components/employee/EmployeeCatalog';

export default function EmployeeHomePage() {
    const [actualTab, setActualTab] = useState(sessionStorage.getItem('selectedTab') || 'home');
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const user = getLoggedUser();
            setIsAuthenticated(user);
    
            if (!user) {
                navigate("/employee/login");
                return;
            }
    
            console.log("Usuário logado:", user);
    
            const changedPassword = await employeeChangedPassword();
            console.log("Senha alterada?", changedPassword);
    
            if (!changedPassword) {
                setShowPasswordModal(true);
            }
    
            const adminStatus = await checkIfAdmin();
            setIsAdmin(adminStatus);
        };
    
        checkUser();
    }, [navigate]);
    

    useEffect(() => {
        sessionStorage.setItem('selectedTab', actualTab);
    }, [actualTab]);

    const handleChangeTab = (tab) => {
        if (tab) {
            setActualTab(tab);
        }
    };

    const handleClosePasswordModal = () => {
        setShowPasswordModal(false);
    };

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Tab.Container activeKey={actualTab} onSelect={handleChangeTab}> 
                <Nav variant="tabs" className="mb-3 nav-fill">
                    <Nav.Item className='custom-tabs'>
                        <Nav.Link eventKey="home">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='custom-tabs'>
                        <Nav.Link eventKey="sells">Sells</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='custom-tabs'> 
                        <Nav.Link eventKey="purchases">Purchases</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='custom-tabs'>
                        <Nav.Link eventKey="repairs">Repairs</Nav.Link>
                    </Nav.Item>

                    {isAdmin && (
                        <>
                            <Nav.Item className='custom-tabs'>
                                <Nav.Link eventKey="roles">Manage Roles</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='custom-tabs'>
                                <Nav.Link eventKey="manage">Manage Employees</Nav.Link>
                            </Nav.Item>
                        </>
                    )}

                    <Nav.Item className='custom-tabs'>
                        <Nav.Link eventKey="profile">Profile</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className='custom-tab-content'>
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

            {/* Modal para alterar senha */}
            <Modal show={showPasswordModal} onHide={handleClosePasswordModal} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Welcome </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You need to change your password before proceeding.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => navigate('/employee/change-password')}>
                        Change Password
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
