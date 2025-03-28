import React, { useState, useEffect, useContext } from 'react';
import { Tab, Nav, Modal, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EmployeeRolesCatalog from '../../components/employee/employeeRoles/EmployeeRolesCatalog';
import EmployeeProfile from '../../components/HomePageEmployee/EmployeeProfile';
import EmployeeCatalog from '../../components/employee/EmployeeCatalog';
import api from '../../utils/axios';
import BottomNavBar from '../../components/Navbar/BottomNavBar';
import EmployeeHomeDashboard from '../../components/HomePageEmployee/EmployeeHomeDashboard';
import EmployeeRepairs from '../../components/HomePageEmployee/EmployeeRepairs';
import { useAuthEmployee } from '../../contexts/AuthenticationProviders/EmployeeAuthProvider';
import { IsMobileContext } from '../../contexts/IsMobileContext';
import "../../styles/pageElements.css"
import EmployeeAdmin from '../../components/HomePageEmployee/EmployeeAdmin';


export default function EmployeeHomePage() {

    const isMobile = useContext(IsMobileContext);

    const { employee, checkPasswordStatus, changePassword, checkIsAdmin, logOut } = useAuthEmployee();

    const [actualTab, setActualTab] = useState(sessionStorage.getItem('selectedTab') || 'dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [emailMessage, setEmailMessage] = useState({ message: "", type: "" });
    const [emailSent, setEmailSent] = useState(false);

    const navigate = useNavigate();
    

    useEffect(() => {

        console.log(employee)
        if(!employee){
            navigate("/employee/login");
        }


        const verifyAdmin = async () => {
            const isADM = await checkIsAdmin();
            setIsAdmin(isADM)
        };

    
        const verifyPassword = async () => {
            const updatedPasswordChanged = await checkPasswordStatus(setPasswordChanged);
            console.log("Senha alterada?", updatedPasswordChanged);

            if (!updatedPasswordChanged) {
                setShowPasswordModal(true);

            }
        }


        verifyAdmin();
        verifyPassword();


    }, [navigate, employee]);



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


    const handleIsPasswordChanged = async () => {
        const updatedPasswordChanged = await checkPasswordStatus(setPasswordChanged);
    
        if (updatedPasswordChanged) {
            setPasswordChanged(true);
            setShowPasswordModal(false);
        } else {
            setEmailMessage({ message: "Employee has not changed password. Please check your email.", type: "danger" });
        }
    };

    const handleChangePassword = () => {
        changePassword(setEmailMessage, setEmailSent);
    }   
    


    return (
        <>
            <Container fluid className="vh-100">
                <Tab.Container activeKey={actualTab} onSelect={handleChangeTab}>
                    <Container fluid className="vh-100">
                        <Row className="h-100">
                            <Col
                                xs={isMobile ? 12 : 2}
                                md={isMobile ? 12 : 2}
                                lg={isMobile ? 12 : 2}
                                className="bg-light border-end p-0"
                                style={{ boxShadow: '2px 0 5px rgba(0, 0, 0, 0.3)', zIndex: 1 }}
                            >
                                <h2 className="mb-4 p-3 fs-2" style={{fontWeight: "bold"}}>TechAway</h2>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item className="custom-tabs fs-5">
                                        <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="custom-tabs fs-5">
                                        <Nav.Link eventKey="purchases">Purchases</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="custom-tabs fs-5">
                                        <Nav.Link eventKey="repairs">Repairs</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="custom-tabs fs-5">
                                        <Nav.Link eventKey="sales">Sales</Nav.Link>
                                    </Nav.Item>
                                    {isAdmin && <Nav.Item className="custom-tabs fs-5">
                                        <Nav.Link eventKey="admin">Admin</Nav.Link>
                                    </Nav.Item>}
                                    <Nav.Item className="custom-tabs fs-5">
                                        <Nav.Link eventKey="profile">Profile</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="mt-3 custom-tabs fs-5">
                                        <Nav.Link className="text-danger" onClick={logOut}>Logout</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>

                            <Col
                                xs={isMobile ? 12 : 10}
                                md={isMobile ? 12 : 10}
                                lg={isMobile ? 12 : 10}
                                className="p-3 overflow-auto"
                            >
                                <Tab.Content className="custom-tab-content">
                                    <Tab.Pane eventKey="dashboard" className='p-4'>
                                        <EmployeeHomeDashboard />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="purchases" className='p-4'>
                                        <h5>Purchases Content</h5>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="repairs" className='p-4'>
                                        <h5>Repairs Content</h5>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="sales" className='p-4'>
                                        <h5>Sales Content</h5>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="profile" className='p-4'>
                                        <EmployeeProfile />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="admin" className='p-4'>
                                        <EmployeeAdmin />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Container>
                </Tab.Container>
            </Container>

            
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
                                {emailSent ? "Resend Email" : "Change Password"}
                            </Button>

                            {emailSent && (
                                <Button variant="primary" onClick={handleIsPasswordChanged}>
                                    Next
                                </Button>
                            )}
                        </>
                    )}
                </Modal.Footer>

            </Modal>

        </>
    );
}
