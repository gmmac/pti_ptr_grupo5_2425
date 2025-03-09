import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Stack } from "react-bootstrap";
import ToastNotifications from '../components/notifications/ToastNotifications';
import LoginForms from '../components/authentication/LoginForms';
import RegisterForms from '../components/authentication/RegisterForms';
import SmNavbar from "../components/Navbar/SmNavbar";
import InitialNavBar from "../components/Navbar/InitialNavBar";
import { getLoggedUser } from '../utils/auth';


export default function AuthPage() {
    const [showToast, setShowToast] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {

        getLoggedUser() ? setUserLoggedIn(true) : setUserLoggedIn(false);

	}, []);

    return (
        <Stack className='d-flex flex-grow-1 align-items-center justify-content-center'> 

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
                            {!userLoggedIn ? <RegisterForms setShowToast={setShowToast} /> : <LoginForms setShowToast={setShowToast}/>}
                        </div>
                    </Col>
                </Row>
                
        </Stack>

    );
}
