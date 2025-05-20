import React, { useState, useEffect, useContext } from 'react';
import { Tab, Nav, Modal, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EmployeeRolesCatalog from '../../components/employee/employeeRoles/EmployeeRolesCatalog';
import EmployeeProfile from '../../components/HomePageEmployee/EmployeeProfile';
import EmployeeCatalog from '../../components/employee/EmployeeCatalog';
import api from '../../utils/axios';
import BottomNavBar from '../../components/Navbar/BottomNavBar';
import EmployeeHomeDashboard from '../../components/HomePageEmployee/EmployeeHomeDashboard';
import EmployeeCharityProjects from '../../components/HomePageEmployee/EmployeeCharityProjects';
import EmployeeRepairs from '../../components/HomePageEmployee/EmployeeRepairs';
import { useAuthEmployee } from '../../contexts/AuthenticationProviders/EmployeeAuthProvider';
// import PurchasesTable from '../../components/storePurchase/DisplayTablePurchases';
import { IsMobileContext } from '../../contexts/IsMobileContext';
import "../../styles/pageElements.css"
import EmployeeStorePurchase from '../../components/HomePageEmployee/EmployeeStorePurchase';


export default function EmployeeHomePage() {

    // const isMobile = useContext(IsMobileContext);

    const { employee, checkPasswordStatus, changePassword, checkIsAdmin } = useAuthEmployee();

    const [actualTab, setActualTab] = useState(sessionStorage.getItem('employeeSelectedTab') || 'dashboard');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [emailMessage, setEmailMessage] = useState({ message: "", type: "" });
    const [emailSent, setEmailSent] = useState(false);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const verifyAdmin = async () => {
            const isADM = await checkIsAdmin();
            setIsAdmin(isADM)
        };

    
        const verifyPassword = async () => {
            const updatedPasswordChanged = await checkPasswordStatus(setPasswordChanged);

            if (!updatedPasswordChanged) {
                setLoading(false)
                setShowPasswordModal(true);
            }
        }


        verifyAdmin();
        // verifyPassword(); // comentar para n verificar a password -> gastar tokens

        

    }, [navigate, employee]);



    useEffect(() => {
        sessionStorage.setItem('employeeSelectedTab', actualTab);
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

            <Tab.Content className="custom-tab-content">
                <Tab.Pane eventKey="dashboard" className='p-4'>
                    <EmployeeHomeDashboard />
                </Tab.Pane>
                <Tab.Pane eventKey="purchases" className='p-4'>
                    <h3>Store Purchases</h3>
                    <EmployeeStorePurchase/>
                </Tab.Pane>
                <Tab.Pane eventKey="repairs" className='p-4'>
                    <h3>Repairs</h3>
                        <EmployeeRepairs />
                </Tab.Pane>
                <Tab.Pane eventKey="sales" className='p-4'>
                    <h3>Sales Content</h3>
                </Tab.Pane>
                <Tab.Pane eventKey="charityproject" className='p-4'>
                    <h3>Charity Project</h3>
                    <EmployeeCharityProjects />
                </Tab.Pane>
                <Tab.Pane eventKey="profile" className='p-4'>
                    <EmployeeProfile />
                </Tab.Pane>
            </Tab.Content>


            
            {!loading && <Modal show={showPasswordModal} onHide={handleClosePasswordModal} backdrop="static" keyboard={false}>
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

            </Modal>}

        </>
    );
}
