import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import api from '../../utils/axios';
import { formatDate } from '../../utils/dateTime';
import { getLoggedUser } from '../../utils/auth';

export default function EmployeeProfile() {
    const user = getLoggedUser();
    const [formData, setFormData] = useState(user);
    const [userRole, setUserRole] = useState("");
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        if (user?.role) {
            api.get(`/api/employeeRole/${user.role}`)
                .then(res => setUserRole(res.data.role))
                .catch(error => console.error(error.message));
        }
    }, [user?.role]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put("/api/employee/" + user.internNum, formData);
            
            alert("Profile updated successfully!");
            sessionStorage.setItem("user", JSON.stringify(response.data));
            setFormData(response.data);
            setIsEditable(false)
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleEdit = () => {
        setIsEditable(!isEditable);
    };

    return (
        <Container>
            <h2 className="my-4">User Details</h2>
            <Button variant="secondary" onClick={handleEdit} className="mb-3">
                {isEditable ? "Lock" : "Edit"}
            </Button>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} disabled />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control type="date" name="birthDate" value={formatDate(formData.birthDate)} onChange={handleChange} disabled />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>NIC</Form.Label>
                            <Form.Control type="text" name="nic" value={formData.nic} onChange={handleChange} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>NIF</Form.Label>
                            <Form.Control type="text" name="nif" value={formData.nif} onChange={handleChange} disabled />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Store NIPC</Form.Label>
                            <Form.Control type="text" name="storeNIPC" value={formData.storeNIPC} onChange={handleChange} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" name="role" value={userRole} onChange={handleChange} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" value={formData.address || ""} onChange={handleChange} disabled={!isEditable} />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Button variant="primary" type="submit" disabled={!isEditable}>Submit</Button>
            </Form>
        </Container>
    );
}
