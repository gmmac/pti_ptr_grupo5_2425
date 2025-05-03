import React, { useEffect, useState } from 'react';
import { ListGroup, Container, Button, Row, Col, Modal, Form, Alert } from 'react-bootstrap';
import ConfirmationModal from '../modals/ConfirmationModal';
import api from '../../utils/axios';

export default function WarehouseCatalog() {
  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState(null);
  const [warehouseData, setWarehouseData] = useState({ name: '', totalSlots: '', availableSlots: '' });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationData, setConfirmationData] = useState({
    show: false,
    action: null,
    title: '',
    message: '',
  });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await api.get("/api/warehouse");
      setWarehouses(response.data.data || response.data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Error fetching warehouses. Please try again.');
    }
  };

  const confirmAction = (action, title, message) => {
    setConfirmationData({ show: true, action, title, message });
  };

  const handleAddWarehouse = () => {
    setCurrentWarehouse(null);
    setWarehouseData({ name: '', totalSlots: '', availableSlots: '' });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleEditWarehouse = (warehouse) => {
    confirmAction(
      () => {
        setCurrentWarehouse(warehouse);
        setWarehouseData({
          name: warehouse.name,
          totalSlots: warehouse.totalSlots,
          availableSlots: warehouse.availableSlots
        });
        setErrorMessage('');
        setShowModal(true);
      },
      'Confirm Edit',
      `Do you want to edit the warehouse "${warehouse.name}"?`
    );
  };

  const handleDeleteWarehouse = (id, name) => {
    confirmAction(
      () => deleteWarehouse(id, name),
      'Confirm Delete',
      `Are you sure you want to delete the warehouse "${name}"?`
    );
  };

  const deleteWarehouse = async (id, name) => {
    try {
      await api.delete(`/api/warehouse/${id}`);
      fetchWarehouses();
      setSuccessMessage(`Warehouse "${name}" deleted successfully.`);
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error deleting warehouse.');
      }
    }
  };

  const handleSaveWarehouse = async () => {
    try {
      const payload = {
        name: warehouseData.name,
        totalSlots: parseInt(warehouseData.totalSlots),
        availableSlots: parseInt(warehouseData.availableSlots),
      };

      if (currentWarehouse) {
        await api.put(`/api/warehouse/${currentWarehouse.id}`, payload);
        setSuccessMessage('Warehouse updated successfully.');
      } else {
        await api.post("/api/warehouse", payload);
        setSuccessMessage('Warehouse created successfully.');
      }

      setShowModal(false);
      fetchWarehouses();
    } catch (error) {
      console.error('Error saving warehouse:', error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error saving warehouse. Please check the data.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWarehouseData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col className="text-end">
          <Button variant="success" onClick={handleAddWarehouse}>Add Warehouse</Button>
        </Col>
      </Row>

      {errorMessage && (
        <Alert variant="danger" dismissible onClose={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      <ListGroup>
        {warehouses.length > 0 ? (
          warehouses.map((warehouse) => (
            <ListGroup.Item key={warehouse.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{warehouse.name}</strong><br />
                Total Slots: {warehouse.totalSlots} | Available: {warehouse.availableSlots}
              </div>
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditWarehouse(warehouse)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteWarehouse(warehouse.id, warehouse.name)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="text-center text-muted">No warehouses found.</ListGroup.Item>
        )}
      </ListGroup>

      {/* Modal for Create/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentWarehouse ? 'Edit Warehouse' : 'New Warehouse'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Warehouse Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={warehouseData.name}
                onChange={handleChange}
                placeholder="Enter warehouse name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Slots</Form.Label>
              <Form.Control
                type="number"
                name="totalSlots"
                value={warehouseData.totalSlots}
                onChange={handleChange}
                placeholder="Enter total slots"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Available Slots</Form.Label>
              <Form.Control
                type="number"
                name="availableSlots"
                value={warehouseData.availableSlots}
                onChange={handleChange}
                placeholder="Enter available slots"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveWarehouse}>
            {currentWarehouse ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={confirmationData.show}
        onHide={() => setConfirmationData({ ...confirmationData, show: false })}
        onConfirm={() => {
          confirmationData.action?.();
          setConfirmationData({ ...confirmationData, show: false });
        }}
        title={confirmationData.title}
        message={confirmationData.message}
      />
    </Container>
  );
}
