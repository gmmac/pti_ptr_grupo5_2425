import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Stack } from "react-bootstrap";
import ToastNotifications from '../components/notifications/ToastNotifications';
import LoginForms from '../components/authentication/LoginForms';
import RegisterForms from '../components/authentication/RegisterForms';
import SmNavbar from "../components/Navbar/SmNavbar";
import InitialNavBar from "../components/Navbar/InitialNavBar";
import { getLoggedUser } from '../utils/auth';

const mobileSize = 768;

export default function AuthPage() {
    const [showToast, setShowToast] = useState(false);
    const [authAction, setAuthAction] = useState("login");
    const [isMobile, setIsMobile] = useState(window.innerWidth < mobileSize);

    const handleChangeLoginRegister = () => {
        authAction === "login" ? setAuthAction("register") : setAuthAction("login")
    }

    useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < mobileSize);
		};

		window.addEventListener("resize", handleResize);

        //getLoggedUser() ? setUserLoggedIn(true) : setUserLoggedIn(false);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

    return (
        <Stack className='d-flex flex-column min-vh-100' style={{backgroundColor: "var(--light-grey)"}}>
            
            <div style={{backgroundColor: "var(--light-grey)", color: "var(--dark-grey)",}}>
                {isMobile ? <SmNavbar /> : <InitialNavBar />}
            </div>
            
            {/* Div principal cresce para ocupar espaço disponível */}
            <div className='d-flex flex-grow-1 align-items-center justify-content-center'>
                <Row className='w-100 d-flex justify-content-center'>
                    <Col xs={12} md={4} className='bg-warning d-flex align-items-center justify-content-center m-3 h-100'>
                        <Container>
                            IMAGE
                        </Container>
                    </Col>

                    <Col xs={12} md={1}>

                    </Col>

                    <Col xs={12} md={4} className='m-3 h-100 pt-3'>
                        <div>
                            {authAction === "register" ? <RegisterForms setShowToast={setShowToast} handleFormAction={handleChangeLoginRegister}/> : <LoginForms setShowToast={setShowToast} handleFormAction={handleChangeLoginRegister}/>}
                        </div>
                    </Col>
                </Row>
            </div>
            
            <ToastNotifications showToast={showToast} setShowToast={setShowToast} />
        </Stack>
    );
}
