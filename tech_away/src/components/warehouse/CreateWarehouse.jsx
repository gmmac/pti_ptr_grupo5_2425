import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../utils/axios';

export default function CreateWarehouse() {
  const [formData, setFormData] = useState({ name: '', totalSlots: '', availableSlots: '' });
  const [errors, setErrors] = useState({ name: '', totalSlots: '', availableSlots: '' });

  const handleSubmit = e => {
    e.preventDefault();
    let errs = { ...errors };
    let hasError = false;

    if (!formData.name) { errs.name = 'Name is required'; hasError = true; } else errs.name = '';
    if (!formData.totalSlots) { errs.totalSlots = 'Total slots required'; hasError = true; } else errs.totalSlots = '';
    if (!formData.availableSlots) { errs.availableSlots = 'Available slots required'; hasError = true; } else errs.availableSlots = '';

    const total = parseInt(formData.totalSlots, 10);
    const avail = parseInt(formData.availableSlots, 10);
    if (!hasError && avail > total) {
        errs.availableSlots = 'Available slots cannot exceed total slots';
        hasError = true;
    }

    setErrors(errs);
    if (hasError) return;
    saveWarehouse();
  };

  const saveWarehouse = async () => {
    try {
      await api.post('/api/warehouse', {
        name: formData.name,
        totalSlots: parseInt(formData.totalSlots, 10),
        availableSlots: parseInt(formData.availableSlots, 10)
      });
      alert('Warehouse created successfully!');
      setFormData({ name: '', totalSlots: '', availableSlots: '' });
    } catch (error) {
      alert('Error creating warehouse.');
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: value ? '' : `${name} is required` });
  };

  return (
    <div className="bg-primary w-100 p-md-5 p-3 rounded">
      <h1>Create Warehouse</h1>
      <h6>Define a new warehouse</h6>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTotalSlots">
          <Form.Label>Total Slots</Form.Label>
          <Form.Control type="number" name="totalSlots" value={formData.totalSlots} onChange={handleChange} isInvalid={!!errors.totalSlots} />
          <Form.Control.Feedback type="invalid">{errors.totalSlots}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAvailableSlots">
          <Form.Label>Available Slots</Form.Label>
          <Form.Control type="number" name="availableSlots" value={formData.availableSlots} onChange={handleChange} isInvalid={!!errors.availableSlots} />
          <Form.Control.Feedback type="invalid">{errors.availableSlots}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="w-100 bg-success rounded-pill">Create Warehouse</Button>
      </Form>
    </div>
)}