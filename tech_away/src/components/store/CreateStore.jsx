import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { confirmDialog } from 'primereact/confirmdialog';
import api from '../../utils/axios';

export default function CreateStore({ show, onClose, storeToEdit, onSuccess }) {
  const [formData, setFormData] = useState({
    nipc: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    openTime: '',
    closeTime: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (storeToEdit) {
      setFormData({ ...storeToEdit });
    } else {
      setFormData({
        nipc: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        openTime: '',
        closeTime: ''
      });
    }
    setErrors({});
  }, [storeToEdit, show]);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'nipc' && !/^\d{9}$/.test(value)) {
      error = 'NIPC must have exactly 9 digits';
    } else if (name === 'name' && !value.trim()) {
      error = 'Name is required';
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Valid email is required';
    } else if (name === 'phone' && !/^\d{9}$/.test(value)) {
      error = 'Phone must have exactly 9 digits';
    } else if (name === 'address' && !value.trim()) {
      error = 'Address is required';
    } else if (name === 'openTime' && !value) {
      error = 'Open time is required';
    } else if (name === 'closeTime') {
      if (!value) {
        error = 'Close time is required';
      } else if (formData.openTime && value <= formData.openTime) {
        error = 'Close time must be after open time';
      }
    }
    return error;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    let hasError = false;

    for (const field in formData) {
      const err = validateField(field, formData[field]);
      if (err) hasError = true;
      newErrors[field] = err;
    }

    setErrors(newErrors);
    if (hasError) return;

    // Mostrar confirmação antes de salvar
    confirmDialog({
      message: `Are you sure you want to ${storeToEdit ? 'update' : 'create'} this store?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: saveStore
    });
  };

    const saveStore = async () => {
    try {
        if (storeToEdit) {
        await api.put(`/api/store/${storeToEdit.nipc}`, formData);
        } else {
        await api.post('/api/store', { ...formData, isActive: '1' });
        }
        onSuccess();
    } catch (error) {
        const msg = error.response?.data?.message || '';

        const newErrors = {};

        if (msg.includes('NIPC')) {
        newErrors.nipc = msg;
        } else if (msg.includes('Email')) {
        newErrors.email = msg;
        } else if (msg.includes('Phone')) {
        newErrors.phone = msg;
        } else {
        alert(msg || 'Error saving store.');
        }

        setErrors(prev => ({ ...prev, ...newErrors }));
    }
    };


  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{storeToEdit ? 'Edit Store' : 'Add Store'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>NIPC</Form.Label>
            <Form.Control
              type="text"
              name="nipc"
              value={formData.nipc}
              onChange={handleChange}
              disabled={!!storeToEdit}
              isInvalid={!!errors.nipc}
            />
            <Form.Control.Feedback type="invalid">{errors.nipc}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!!storeToEdit}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!!storeToEdit}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Open Time</Form.Label>
            <Form.Control
              type="time"
              name="openTime"
              value={formData.openTime}
              onChange={handleChange}
              isInvalid={!!errors.openTime}
            />
            <Form.Control.Feedback type="invalid">{errors.openTime}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Close Time</Form.Label>
            <Form.Control
              type="time"
              name="closeTime"
              value={formData.closeTime}
              onChange={handleChange}
              isInvalid={!!errors.closeTime}
            />
            <Form.Control.Feedback type="invalid">{errors.closeTime}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {storeToEdit ? 'Update' : 'Save'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
