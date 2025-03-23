import React from 'react'
import { Form, Button, Container, Row, Col, Accordion } from 'react-bootstrap';
export default function ClientProfile() {
    const [formData, setFormData] = useState(user);

    return (
        <Container>
            <h2 className="my-4 text-center">Client Information</h2>
            <Form>
                {/* Informações Pessoais */}
                <Accordion className="mb-3 custom-accordion">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Personal Information</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control className="auth-input" type="text" name="firstName" disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control className="auth-input" type="text" name="lastName" disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Birth Date</Form.Label>
                                        <Form.Control className="auth-input" type="date" name="birthDate" disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control className="auth-input" type="tel" name="phone" disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control className="auth-input" type="email" name="email" disabled />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>NIC</Form.Label>
                                        <Form.Control className="auth-input" type="text" name="nic" disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>NIF</Form.Label>
                                        <Form.Control className="auth-input" type="text" name="nif" disabled />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control className="auth-input" type="text" name="address"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Form>
        </Container>
    )
}
