import React, { useState } from 'react';
import { Container, Row, Col, Stack } from "react-bootstrap";
import ToastNotifications from '../components/notifications/ToastNotifications';
import LoginForms from '../components/authentication/LoginForms';

export default function LoginPage() {
    const [showToast, setShowToast] = useState(false);

    return (
        <Stack className='d-flex flex-column min-vh-100'>
            
            <div className='d-flex align-items-center justify-content-center p-3 bg-danger'>NAVBAR</div>
            
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
                            <LoginForms setShowToast={setShowToast} />
                        </div>
                    </Col>
                </Row>
            </div>
            
            <ToastNotifications showToast={showToast} setShowToast={setShowToast} />
        </Stack>
    );
}
