import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { Row, Col, Container, Form, Stack } from 'react-bootstrap';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import api from '../../utils/axios';

export default function ClientManageDetailsModal({ clientNIC, showModal, closeModal, refreshTable}) {
  const [client, setClient] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedClient, setEditedClient] = useState({});

  const [errors, setErrors] = useState({});

  const genderOptions = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Other', value: 'O' }
  ];

  const fetchClient = async () => {
    try {
      const response = await api.get(`/api/client/${clientNIC}`);
      setClient(response.data);
      setEditedClient(response.data);
    } catch (error) {
      console.error('Error fetching client:', error);
    }
  };

  useEffect(() => {
    if (showModal) {
        fetchClient();
        setEditMode(false);
        setErrors({});
    }
  }, [clientNIC, showModal]);

  const formatDate = (date) => date ? new Date(date).toLocaleDateString('pt-PT') : '-';

  const handleChange = (field, value) => {
    setEditedClient(prev => ({ ...prev, [field]: value }));

    let newErrors = { ...errors };

    if (!value) {
        newErrors[field] = "This field is required";
    } else if (field === 'birthDate') {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const isBirthdayPassed =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (age < 16 || (age === 16 && !isBirthdayPassed)) {
            newErrors[field] = "The client must be at least 16 years old.";
        } else {
            newErrors[field] = '';
        }
    } else if (field === 'phone' && value.length !==9) {
        newErrors[field] = "Phone number must be 9 digits.";
    }
    else {
        newErrors[field] = null;
    }

    setErrors(newErrors);

  };

  const handleSave = async (e) => {
    e.preventDefault();

    let hasError = false;
    let newErrors = {};

    Object.keys(editedClient).forEach((field) => {
        if (!editedClient[field]) {
            newErrors[field] = "This field is required";
            hasError = true;
        }
        if (field === 'birthDate') {
            const birthDate = new Date(editedClient[field]);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const isBirthdayPassed =
                today.getMonth() > birthDate.getMonth() ||
                (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
    
            if (age < 16 || (age === 16 && !isBirthdayPassed)) {
                newErrors[field] = "The client must be at least 16 years old.";
                hasError = true;
            } else {
                newErrors[field] = null;
            }
        }
        if (field === "phone" && editedClient[field].length !== 9) {
            newErrors[field] = "Phone number must be 9 digits.";
            hasError = true;
        }
    });

    setErrors(newErrors);
    if (hasError) return;

    try {
      await api.put(`/api/client/${clientNIC}`, {
        phone: editedClient.phone,
        birthDate: editedClient.birthDate,
        gender: editedClient.gender,
        address: editedClient.address,
        latitude: editedClient.latitude,
        longitude: editedClient.longitude
      });
      setClient(editedClient);
      setEditMode(false);
      setErrors({});
      refreshTable();
    } catch (err) {
      console.error('Error updating client:', err);
    }
  };

  return (
    <Dialog
      header="Client Details"
      visible={showModal}
      style={{ width: '55vw', minWidth: '360px' }}
      onHide={() => {
        closeModal();
        setEditMode(false);
      }}
      modal
      draggable={false}
      className="p-fluid"
    >
      <Container style={{ padding: '1rem 1.5rem' }}>
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap text-center text-md-start">
            <h5 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                <i className="pi pi-user" style={{ marginRight: 8 }}></i>
                {client.firstName || ''} {client.lastName || ''}
            </h5>
            <Tag
                severity={client.isActive === '1' ? 'success' : 'danger'}
                className="mt-2 mt-md-0"
            >
                {client.isActive === '1' ? 'Active' : 'Inactive'}
            </Tag>
        </div>

        <Divider />

        <Row className="mb-3">
          {/* Left Column */}
          <Col md={6}>
            <div className="mb-3">
              <strong><i className="pi pi-id-card" /> NIC:</strong><br />
              {client.nic}
            </div>
            <div className="mb-3">
              <strong><i className="pi pi-id-card" /> NIF:</strong><br />
              {client.nif || '-'}
            </div>
            <div className="mb-3">
              <strong><i className="pi pi-envelope" /> Email:</strong><br />
              {client.email || '-'}
            </div>
            <div className="mb-3">
              <strong><i className="pi pi-phone" /> Phone Number:</strong><br />
              {!editMode ? (
                client.phone || '-'
              ) : (
                <>
                <Form.Control
                  value={editedClient.phone || ''}
                  isInvalid={!!errors.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </>
              )}
            </div>
            <div className="mb-3">
              <strong><i className="pi pi-calendar" /> Birthdate:</strong><br />
              {!editMode ? (
                formatDate(client.birthDate)
              ) : (
                <>
                <Calendar
                  value={editedClient.birthDate ? new Date(editedClient.birthDate) : null}
                  onChange={(e) => handleChange('birthDate', e.value)}
                  dateFormat="dd/mm/yy"
                  showIcon
                />
                {errors.birthDate && (
                    <div className="invalid-feedback" style={{ display: 'block' }}>
                    {errors.birthDate}
                    </div>
                )}
                </>
              )}
            </div>
          </Col>

          {/* Right Column */}
          <Col md={6}>
          <div className="mb-3">
              <strong><i className="pi pi-user-plus" /> Gender:</strong><br />
              {!editMode ? (
                client.gender === 'M' ? 'Male' : client.gender === 'F' ? 'Female' : client.gender === 'O' ? 'Other' : '-'
              ) : (
                <Dropdown
                  value={editedClient.gender}
                  options={genderOptions}
                  onChange={(e) => handleChange('gender', e.value)}
                  placeholder="Select"
                />
              )}
            </div>
            <div className="mb-3">
              <strong><i className="pi pi-map-marker" /> Address:</strong><br />
              {!editMode ? (
                client.address || '-'
              ) : (
                <>
                <Form.Control
                  value={editedClient.address || ''}
                  isInvalid={!!errors.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </>
              )}
            </div>
            <div className="mb-3">
              <strong><i className="pi pi-compass" /> Latitude:</strong><br />
              {!editMode ? (
                client.latitude || '-'
              ) : (
                <>
                <Form.Control
                  value={editedClient.latitude || ''}
                  isInvalid={!!errors.latitude}
                  onChange={(e) => handleChange('latitude', e.target.value)}
                />
                <Form.Control.Feedback type="invalid">{errors.latitude}</Form.Control.Feedback>
                </>
              )}
            </div>
            <div className="mb-3">
              <strong><i className="pi pi-compass" /> Longitude:</strong><br />
              {!editMode ? (
                client.longitude || '-'
              ) : (
                <>
                <Form.Control
                  value={editedClient.longitude || ''}
                  isInvalid={!!errors.longitude}
                  onChange={(e) => handleChange('longitude', e.target.value)}
                />
                <Form.Control.Feedback type="invalid">{errors.longitude}</Form.Control.Feedback>
                </>
              )}
            </div>
          </Col>
        </Row>
        <div className="mt-2 mt-md-0">
            {!editMode ? (
                    <Button
                        className="rounded-pill ms-auto"
                        label="Edit"
                        icon="pi pi-user-edit"
                        iconPos="right"
                        style={{ backgroundColor: "var(--variant-one)", border: "none" }}
                        onClick={() => setEditMode(true)}
                    />
            ) : (
                <Stack gap={2} direction="horizontal">
                    <Button className="rounded-pill" label="Cancel" severity="secondary" icon="pi pi-times" 
                    onClick={() => {setEditMode(false); setEditedClient(client); setErrors({})}}/>
                    <Button icon="pi pi-save" className="rounded-pill ms-auto" label="Save changes" style={{ backgroundColor: "var(--variant-one)", border: "none" }} onClick={handleSave}></Button>
                </Stack>
            )}
          </div>
      </Container>
    </Dialog>
  );
}
