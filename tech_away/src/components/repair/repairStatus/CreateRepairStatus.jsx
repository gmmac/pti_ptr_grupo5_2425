import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../utils/axios';

export default function CreateRepairStatus() {
  const [formData, setFormData] = useState({ state: '' });
  const [errors, setErrors] = useState({ state: '' });

  const handleSubmit = e => {
    e.preventDefault();
    let newErrors = { ...errors };
    let hasError = false;

    if (!formData.state) {
      newErrors.state = 'This field is required';
      hasError = true;
    } else newErrors.state = '';

    setErrors(newErrors);
    if (hasError) return;
    saveStatus();
  };

  const saveStatus = async () => {
    let newErrors = { ...errors };
    try {
      await api.post('/api/repairStatus', { state: formData.state });
      alert('Status created Sucessfully!');
      setFormData({ state: '' });
    } catch (error) {
      if (error.response?.status === 400) {
        newErrors.state = 'Repair Status already Exists!';
        setErrors(newErrors);
      } else {
        alert('Error. Try Again.');
      }
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: value ? '' : 'This field is required' });
  };

  return (
    <div className="bg-primary w-100 p-md-5 p-3 rounded">
      <h1>Create Repair Status</h1>
      <h6>Define a new repair status</h6>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicState">
          <Form.Label>State Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter status name"
            name="state"
            value={formData.state}
            onChange={handleChange}
            isInvalid={!!errors.state}
          />
          <Form.Control.Feedback type="invalid">
            {errors.state}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="w-100 bg-success rounded-pill">
          Create Status
        </Button>
      </Form>
    </div>
  );
}