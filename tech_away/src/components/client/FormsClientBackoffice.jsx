import React, { useState } from 'react';
import { Form, Row, Col, Modal, Button } from 'react-bootstrap';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import api from '../../utils/axios';

export default function RegisterClientModal({ showModal, closeModal, refreshTable }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nic: '',
    nif: '',
    email: '',
    phone: '',
    gender: '',
    birthDate: null,
    address: ''
  });

  const [errors, setErrors] = useState({});

  const genderOptions = [
    { label: 'Select gender', value: '' },
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Other', value: 'O' }
  ];

  const handleChange = (field, value) => {
    const updatedForm = { ...form, [field]: value };
    const updatedErrors = { ...errors, [field]: '' };

    if (field === 'address' && value.length > 50) {
      updatedErrors.address = 'Address must not exceed 50 characters';
    }

    if (field === 'nif' && value && value.length !== 9) {
      updatedErrors.nif = 'NIF must have exactly 9 digits';
    }

    setForm(updatedForm);
    setErrors(updatedErrors);
  };

  const validate = () => {
    const required = ['firstName', 'lastName', 'nic', 'nif'];
    const newErrors = {};

    required.forEach(field => {
      if (!form[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    if (form.nif && form.nif.length !== 9) {
      newErrors.nif = 'NIF must have exactly 9 digits';
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email';
    }

    if (form.phone && !/^\d{9}$/.test(form.phone)) {
      newErrors.phone = 'Phone must have 9 digits';
    }

    if (form.address && form.address.length > 50) {
      newErrors.address = 'Address must not exceed 50 characters';
    }

    const birthDate = form.birthDate;
    if (birthDate instanceof Date && !isNaN(birthDate)) {
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      if (age < 16 || (age === 16 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
        newErrors.birthDate = 'The client must be at least 16 years old';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const prepareData = () => {
    const dataToSend = { ...form };

    Object.keys(dataToSend).forEach(key => {
      if (dataToSend[key] === '') {
        dataToSend[key] = null;
      }
    });

    if (dataToSend.birthDate instanceof Date) {
      dataToSend.birthDate = dataToSend.birthDate.toISOString().split('T')[0];
    }

    return dataToSend;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = prepareData();

    try {
      const response = await api.post('/api/client', payload);

      if (response.data?.errorTag) {
        setErrors(prev => ({
          ...prev,
          [response.data.errorTag]: `A client with this ${response.data.errorTag.toUpperCase()} already exists.`
        }));
        return;
      }

      handleRefresh();
      refreshTable();
      closeModal();
    } catch (error) {
      console.error('API error:', error.message);
    }
  };

  const handleRefresh = () => {
    setForm({
      firstName: '',
      lastName: '',
      nic: '',
      nif: '',
      email: '',
      phone: '',
      gender: '',
      birthDate: null,
      address: ''
    });
    setErrors({});
  };

  return (
    <Modal show={showModal} onHide={() => { closeModal(); handleRefresh(); }} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Register New Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="gy-3">
            <Col md={6} className="position-relative" style={{ zIndex: 1 }}>
              <Form.Label><i className="pi pi-user me-2" />First Name</Form.Label>
              <Form.Control
                placeholder="Enter first name"
                value={form.firstName}
                isInvalid={!!errors.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Col>
            <Col md={6} className="position-relative" style={{ zIndex: 1 }}>
              <Form.Label><i className="pi pi-user me-2" />Last Name</Form.Label>
              <Form.Control
                placeholder="Enter last name"
                value={form.lastName}
                isInvalid={!!errors.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Col>

            <Col md={6} className="position-relative" style={{ zIndex: 1 }}>
              <Form.Label><i className="pi pi-id-card me-2" />NIC</Form.Label>
              <Form.Control
                type="text"
                inputMode="numeric"
                pattern="\d{8}"
                maxLength={8}
                value={form.nic}
                placeholder="Enter NIC"
                className={classNames('form-control', { 'is-invalid': errors.nic })}
                onChange={(e) => handleChange('nic', e.target.value.replace(/[^0-9]/g, ''))}
              />
              <div className="invalid-feedback">{errors.nic}</div>
            </Col>
            <Col md={6} className="position-relative" style={{ zIndex: 1 }}>
              <Form.Label><i className="pi pi-id-card me-2" />NIF</Form.Label>
              <Form.Control
                type="text"
                inputMode="numeric"
                pattern="\d{9}"
                maxLength={9}
                value={form.nif}
                placeholder="Enter NIF"
                className={classNames('form-control', { 'is-invalid': errors.nif })}
                onChange={(e) => handleChange('nif', e.target.value.replace(/[^0-9]/g, ''))}
              />
              <div className="invalid-feedback">{errors.nif}</div>
            </Col>

            <Col md={6} className="position-relative" style={{ zIndex: 1 }}>
              <Form.Label><i className="pi pi-envelope me-2" />Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={form.email}
                isInvalid={!!errors.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Col>
            <Col md={6} className="position-relative" style={{ zIndex: 1 }}>
              <Form.Label><i className="pi pi-phone me-2" />Phone Number</Form.Label>
              <Form.Control
                type="text"
                inputMode="numeric"
                maxLength={9}
                placeholder="Enter phone"
                value={form.phone}
                isInvalid={!!errors.phone}
                onChange={(e) => handleChange('phone', e.target.value.replace(/[^0-9]/g, ''))}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Col>

            <Col md={6} className="position-relative" style={{ zIndex: 1065 }}>
              <Form.Label><i className="pi pi-users me-2" />Gender</Form.Label>
              <Dropdown
                value={form.gender}
                options={genderOptions}
                onChange={(e) => handleChange('gender', e.value)}
                className="w-100"
                appendTo="self"
                placeholder="Select gender"
              />
            </Col>
            <Col md={6} className="position-relative" style={{ zIndex: 1065 }}>
              <Form.Label><i className="pi pi-calendar me-2" />Date of Birth</Form.Label>
              <Calendar
                value={form.birthDate}
                onChange={(e) => handleChange('birthDate', e.value)}
                showIcon
                dateFormat="dd/mm/yy"
                className={classNames('w-100', { 'p-invalid': errors.birthDate })}
                placeholder="dd/mm/yyyy"
                mask="99/99/9999"
                appendTo="self"
              />
              {errors.birthDate && <div className="invalid-feedback d-block">{errors.birthDate}</div>}
            </Col>

            <Col md={12} className="position-relative" style={{ zIndex: 1 }}>
              <Form.Label><i className="pi pi-map-marker me-2" />Address</Form.Label>
              <Form.Control
                placeholder="Enter address"
                value={form.address}
                isInvalid={!!errors.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
              <div className="text-end small text-muted">{form.address.length}/50</div>
            </Col>
          </Row>

          <div className="text-end mt-4">
            <Button
              type="submit"
              className="rounded-pill px-4"
              style={{ backgroundColor: 'var(--variant-one)', border: 'none' }}
            >
              Register
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
