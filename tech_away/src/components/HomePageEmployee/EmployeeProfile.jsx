import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Stack, Accordion } from 'react-bootstrap';
import api from '../../utils/axios';
import { formatDate } from '../../utils/dateTime';
import { getLoggedUser } from '../../utils/auth';
import "../../styles/pageElements.css";

export default function EmployeeProfile() {
    // const user = getLoggedUser();
    // const [formData, setFormData] = useState(user);
    // const [userRole, setUserRole] = useState("");
    // const [employeeStore, setEmployeeStore] = useState({});
    // const [isEditable, setIsEditable] = useState(false);

    // useEffect(() => {
    //     if (user?.role) {
    //         api.get(`/api/employeeRole/${user.role}`)
    //             .then(res => setUserRole(res.data.role))
    //             .catch(error => console.error(error.message));
    //     }

    //     if (user?.storeNIPC) {
    //         api.get(`/api/store/${user.storeNIPC}`)
    //             .then(res => setEmployeeStore(res.data))
    //             .catch(error => console.error(error.message));
    //     }
    // }, [user?.role, user?.storeNIPC]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await api.put(`/api/employee/${user.internNum}`, formData);
    //         alert("Profile updated successfully!");
    //         sessionStorage.setItem("user", JSON.stringify(response.data));
    //         setFormData(response.data);
    //         setIsEditable(false);
    //     } catch (error) {
    //         console.error("Error updating profile:", error);
    //     }
    // };

    // const handleEdit = () => {
    //     setIsEditable(!isEditable);
    // };

    return (
        <Container>
            <h2 className="my-4 text-center">Employee Profile</h2>
            {/* <Form onSubmit={handleSubmit}>
                
                <Accordion defaultActiveKey="0" className="mb-3 custom-accordion">
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
                                        <Form.Control className="auth-input" type="text" name="lastName" value={formData.lastName} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Birth Date</Form.Label>
                                        <Form.Control className="auth-input" type="date" name="birthDate" value={formatDate(formData.birthDate)} disabled />
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
                                        <Form.Control className="auth-input" type="text" name="address" value={formData.address || ""} disabled={!isEditable} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Accordion defaultActiveKey="0" className="mb-3 custom-accordion">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Professional Information</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Intern Number</Form.Label>
                                        <Form.Control className="auth-input" type="text" name="internNum" value={formData.internNum} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control className="auth-input" type="text" name="role" value={userRole} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="border-top my-3"></div>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Store Name</Form.Label>
                                        <Form.Control className="auth-input" type="text" value={employeeStore.name || "N/A"} disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Store Address</Form.Label>
                                        <Form.Control className="auth-input" type="text" value={employeeStore.address || "N/A"} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Stack direction='horizontal' gap={3} className="mt-3">
                    <Button variant="secondary" onClick={handleEdit}>
                        {isEditable ? "Lock" : "Edit"}
                    </Button>
                    <Button variant="primary" type="submit" disabled={!isEditable}>Submit</Button>
                </Stack>

            </Form> */}
        </Container>
    );
}
