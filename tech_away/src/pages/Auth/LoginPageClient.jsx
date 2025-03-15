import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Stack } from "react-bootstrap";
import LoginForms from '../../components/authentication/LoginForms';

const mobileSize = 768;

export default function LoginPageClient() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < mobileSize);

    useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < mobileSize);
		};

		window.addEventListener("resize", handleResize);

        //getLoggedUser() ? setUserLoggedIn(true) : setUserLoggedIn(false);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

    return (
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
                    <LoginForms/>
                </Col>
            </Row>
        </div>
    );
}
