import React, { useEffect, useState } from 'react';
import { ListGroup, Container, Button, Row, Col, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../../utils/axios';

export default function RepairStatusCatalog() {
    const [statuses, setStatus] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [statusName, setStatusName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            const response = await api.get("/api/repairStatus");
            setStatus(response.data);
            setErrorMessage(''); 
        } catch (error) {
            setErrorMessage('Error fetching status. Please try again.');
        }
    };

    const handleAddStatus = () => {
        setCurrentStatus(null);
        setStatusName('');
        setErrorMessage('');
        setShowModal(true);
    };

    const handleEditStatus = (status) => {
        setCurrentStatus(status);
        setStatusName(status.status);
        setErrorMessage('');
        setShowModal(true);
    };

    const handleDeleteStatus = async (id) => {
        try {
            await api.delete(`/api/repairStatus/${id}`);
            fetchStatus();
            setErrorMessage('');
        } catch (error) {
            console.error('Error deleting status:', error);
            if (error.response && error.response.data.message) {
                if (error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                }
            }
        }
    };

    const handleSaveStatus = async () => {
        try {
            if (currentStatus) {
                await api.put(`/api/repairStatus/${currentStatus.id}`, { state: statusName });
            } else {
                await api.post("/api/repairStatus", { state: statusName });
            }
            setShowModal(false);
            setErrorMessage('');
            fetchStatus();
        } catch (error) {
            console.error('Error saving status:', error);
            setErrorMessage("Error saving status. Please try again.");
        }
    };

    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col className="text-end">
                    <Button variant="success" onClick={handleAddStatus}>Add Status</Button>
                </Col>
            </Row>

            {errorMessage && (
                <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                    {errorMessage}
                </Alert>
            )}

            <ListGroup>
                {statuses.length > 0 ? (
                    statuses.map((status) => (
                        <ListGroup.Item key={status.id} className="d-flex justify-content-between align-items-center">
                            {status.state}
                            <div>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditStatus(status)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteStatus(status.id)}>Delete</Button>
                            </div>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item className="text-center text-muted">
                        No repair status found.
                    </ListGroup.Item>
                )}
            </ListGroup>

            {/* Modal para adicionar/editar status */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentStatus ? 'Edit Status' : 'Add Status'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="statusName">
                            <Form.Label>Status Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={statusName} 
                                onChange={(e) => setStatusName(e.target.value)} 
                                placeholder="Enter status name"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveStatus}>
                        {currentStatus ? 'Update' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
