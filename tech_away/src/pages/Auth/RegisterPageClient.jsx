import React, { useContext } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import RegisterForms from "../../components/authentication/RegisterForms";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import WelcomeLG from "../../components/decoration/WelcomeLG";
import WelcomeSM from "../../components/decoration/WelcomeSM";

export default function RegisterPageClient() {
  const isMobile = useContext(IsMobileContext);

  return isMobile ? (
    <Container>
      <Stack
        gap={5}
        className="d-flex align-items-center justify-content-center mb-5 pb-5"
      >
        <WelcomeSM />
        <RegisterForms />
      </Stack>
    </Container>
  ) : (
    <Container className="d-flex align-items-center justify-content-center mb-4 ">
      <Row className="w-100 mt-0 g-5">
        <Col
          sm={12}
          md={6}
          className="d-flex justify-content-center align-items-center ps-0"
        >
          <WelcomeLG />
        </Col>
        <Col
          sm={12}
          md={6}
          className="d-flex justify-content-center align-items-center pe-0"
        >
          <RegisterForms />
        </Col>
      </Row>
    </Container>
  );
}
