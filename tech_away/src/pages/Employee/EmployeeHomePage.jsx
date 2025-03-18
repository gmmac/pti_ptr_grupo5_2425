import React, { useState, useEffect } from 'react';
import { Tab, Nav, Modal, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EmployeeRolesCatalog from '../../components/employee/employeeRoles/EmployeeRolesCatalog';
import EmployeeProfile from '../../components/employee/EmployeeProfile';
import { checkIfAdmin, getLoggedUser } from '../../utils/auth';
import EmployeeCatalog from '../../components/employee/EmployeeCatalog';
import api from '../../utils/axios';
import BottomNavBar from '../../components/Navbar/BottomNavBar';
import EmployeeHomeDashboard from '../../components/employee/EmployeeHomeDashboard';

export default function EmployeeHomePage() {
    const [actualTab, setActualTab] = useState(sessionStorage.getItem('selectedTab') || 'home');
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [emailMessage, setEmailMessage] = useState({ message: "", type: "" });
    const navigate = useNavigate();

    // veridies is user changed password
    const checkPasswordStatus = async () => {
        try {
            const response = await api.get(`/api/auth/getUserByEmail/${getLoggedUser().email}`);
            
            const passwordReset = !!response.data.last_password_reset;
            setPasswordChanged(passwordReset);
    
            return passwordReset;
        } catch (error) {
            console.error("Error verifying password:", error.response?.data || error.message);
            return false;
        }
    };
    


    useEffect(() => {
        console.log("MUDOU PASS " + passwordChanged)
    }, [passwordChanged])

    useEffect(() => {
        const checkUser = async () => {
            const user = getLoggedUser();
            setIsAuthenticated(user);

            if (!user) {
                navigate("/employee/login");
                return;
            }

            console.log("ULoggedUser:", user);

            const updatedPasswordChanged = await checkPasswordStatus();
            console.log("Senha alterada?", updatedPasswordChanged);

            if (!updatedPasswordChanged) {
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

    const handleChangePassword = async () => {
        try {
            const user = getLoggedUser();
            if (!user) {
                console.error("Usuário não encontrado.");
                return;
            }
    
            await api.post("/api/auth/changePassword", { email: user.email });
    
            setEmailMessage({ message: "Password reset email sent. Please check your email.", type: "success" });
    
        } catch (error) {
            console.error("Error changing password:", error.response?.data || error.message);
            setEmailMessage({ message: "Error sending password reset email. Try again later.", type: "danger" });
        }
    };
    
    const handleIsPasswordChanged = async () => {
        const updatedPasswordChanged = await checkPasswordStatus();
    
        if (updatedPasswordChanged) {
            setPasswordChanged(true);
            setShowPasswordModal(false);
        } else {
            setEmailMessage({ message: "Employee has not changed password. Please check your email.", type: "danger" });
        }
    };
    


    return (
        <>
            <Tab.Container activeKey={actualTab} onSelect={handleChangeTab}>
                <Nav variant="tabs" className="mb-3 nav-fill">
                    <Nav.Item className='custom-tabs'>
                        <Nav.Link eventKey="home">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='custom-tabs'>
                        <Nav.Link eventKey="sales">Sales</Nav.Link>
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
                        <EmployeeHomeDashboard />
                    </Tab.Pane>
                    <Tab.Pane eventKey="sales">
                        <p>Tab content for Sales</p>
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
                    <Modal.Title>Welcome</Modal.Title>
                </Modal.Header>

                {emailMessage.message && (
                    <Alert variant={emailMessage.type} onClose={() => setEmailMessage({ message: "", type: "" })} className='text-center'>
                        {emailMessage.message}
                    </Alert>
                )}


                {!passwordChanged && (
                    <Modal.Body>
                        <p>You need to change your password before proceeding.</p>
                    </Modal.Body>
                )}

                <Modal.Footer>
                    {!passwordChanged && (
                        <>
                            <Button variant="primary" onClick={handleChangePassword}>
                                Change Password
                            </Button>

                            <Button variant="primary" onClick={handleIsPasswordChanged}>
                                Next
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>

        </>
    );
}
