import React, { useEffect, useState } from 'react';
import { ListGroup, Container, Button, Row, Col, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../../utils/axios';

export default function EmployeeRolesCatalog() {
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);
    const [roleName, setRoleName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await api.get("/api/employeeRole");
            setRoles(response.data);
            setErrorMessage(''); 
        } catch (error) {
            console.error('Error fetching employee roles:', error);
            setErrorMessage('Error fetching roles. Please try again.');
        }
    };

    const handleAddRole = () => {
        setCurrentRole(null);
        setRoleName('');
        setErrorMessage('');
        setShowModal(true);
    };

    const handleEditRole = (role) => {
        setCurrentRole(role);
        setRoleName(role.role);
        setErrorMessage('');
        setShowModal(true);
    };

    const handleDeleteRole = async (id) => {
        try {
            await api.delete(`/api/employeeRole/${id}`);
            fetchRoles();
            setErrorMessage('');
        } catch (error) {
            console.error('Error deleting role:', error);
            if (error.response && error.response.data.message) {
                if (error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                }
            }
        }
    };

    const handleSaveRole = async () => {
        try {
            if (currentRole) {
                await api.put(`/api/employeeRole/${currentRole.id}`, { role: roleName });
            } else {
                await api.post("/api/employeeRole", { role: roleName });
            }
            setShowModal(false);
            setErrorMessage('');
            fetchRoles();
        } catch (error) {
            console.error('Error saving role:', error);
            setErrorMessage("Error saving role. Please try again.");
        }
    };

    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col className="text-end">
                    <Button variant="success" onClick={handleAddRole}>Add Role</Button>
                </Col>
            </Row>

            {errorMessage && (
                <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                    {errorMessage}
                </Alert>
            )}

            <ListGroup>
                {roles.length > 0 ? (
                    roles.map((role) => (
                        <ListGroup.Item key={role.id} className="d-flex justify-content-between align-items-center">
                            {role.role}
                            <div>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditRole(role)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteRole(role.id)}>Delete</Button>
                            </div>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item className="text-center text-muted">
                        No employee roles found.
                    </ListGroup.Item>
                )}
            </ListGroup>

            {/* Modal para adicionar/editar roles */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentRole ? 'Edit Role' : 'Add Role'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="roleName">
                            <Form.Label>Role Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={roleName} 
                                onChange={(e) => setRoleName(e.target.value)} 
                                placeholder="Enter role name"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveRole}>
                        {currentRole ? 'Update' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
