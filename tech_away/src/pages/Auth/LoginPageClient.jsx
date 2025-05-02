import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForms from "../../components/authentication/LoginForms";
import WelcomeBackLg from "../../components/decoration/welcomeBackLg";

export default function LoginPageClient() {
  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <Row className="w-100 mt-4 g-5">
        <Col
          sm={12}
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <WelcomeBackLg />
        </Col>
        <Col
          sm={12}
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <LoginForms />
        </Col>
      </Row>
    </Container>
  );
}
