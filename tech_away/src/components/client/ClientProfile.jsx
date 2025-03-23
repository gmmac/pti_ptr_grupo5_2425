import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, Accordion } from 'react-bootstrap';
import api from '../../utils/axios';
export default function ClientProfile() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        phone: "",
        email: "",
        nic: "",
        nif: "",
        address: "",
        gender: "",
        adress: ""
    });

    useEffect(() => {
        async function fetchClientData() {
            try {
                const res = await api.get("/api/auth/user-info");
                setFormData(res.data.userInfo);
            } catch (error) {
                console.error("Erro ao buscar os dados do cliente:", error.message);
            }
        }

        fetchClientData();
    }, []);

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
                                        <Form.Control className="auth-input" type="text" name="firstName" value={formData.firstName} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control className="auth-input" type="text" name="lastName" value={formData.lastname} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Birth Date</Form.Label>
                                        <Form.Control className="auth-input" type="date" name="birthDate" value={formData.birthDate} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control className="auth-input" type="tel" name="phone" value={formData.phone} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control className="auth-input" type="email" name="email" value={formData.email} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>NIC</Form.Label>
                                        <Form.Control className="auth-input" type="text" name="nic" value={formData.nic} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>NIF</Form.Label>
                                        <Form.Control className="auth-input" type="text" name="nif" value={formData.nif} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control className="auth-input" type="text" value={formData.address} name="address"/>
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
