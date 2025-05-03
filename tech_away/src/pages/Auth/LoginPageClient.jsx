import React, { useContext } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import LoginForms from "../../components/authentication/LoginForms";
import WelcomeBackLg from "../../components/decoration/welcomeBackLg";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import WelcomeBackSm from "../../components/decoration/WelcomeBackSm";
export default function LoginPageClient() {
  const isMobile = useContext(IsMobileContext);

  return isMobile ? (
    <Container>
      <Stack
        gap={5}
        className="d-flex align-items-center justify-content-center mb-5"
      >
        <WelcomeBackSm />
        <LoginForms />
      </Stack>
    </Container>
  ) : (
    <Container className="d-flex align-items-center justify-content-center my-4">
      <Row className="w-100 my-5 g-5">
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
