import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert, Row, Col } from 'react-bootstrap';
import api from '../../utils/axios';
import ClientCatalogModal from '../storePurchase/ClientCatalogModal';
import UsedEquipmentCatalogModal from './../equipment/UsedEquipmentCatalogModal';
import CharityProjectCatalogModal from '../charityProject/CharityProjectCatalogModal';

export default function DonationForms({ show, handleClose, equipment, handleDonationComplete }) {
  const [form, setForm] = useState({
    statusID: '',
    clientNic: '',
    usedEquipmentID: '',
    charityProjectId: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [clientData, setClientData] = useState({});
  const [equipmentData, setEquipmentData] = useState({});
  const [charityProject, setCharityProject] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showModalEq, setShowModalEq] = useState(false);
  const [showModalCharity, setShowModalCharity] = useState(false);

  useEffect(() => {
    if (equipment) {
      setEquipmentData({
        barcode: equipment.id,
        model: equipment.EquipmentSheet?.EquipmentModel?.name || '',
      });
      setForm((prev) => ({ ...prev, usedEquipmentID: equipment.id }));
    } else {
      setEquipmentData({});
      setForm((prev) => ({ ...prev, usedEquipmentID: '' }));
    }
  }, [equipment]);

  const handleSelectCharity = (project) => {
    if (project) {
      setCharityProject(project);
      setForm(prev => ({ ...prev, charityProjectId: project.id }));
      setError('');
    } else {
      setCharityProject(null);
      setForm(prev => ({ ...prev, charityProjectId: '' }));
    }
    setShowModalCharity(false);
  };

  const handleSelectClient = (client) => {
    if (client) {
      setClientData(client);
      setForm(prev => ({ ...prev, clientNic: client.nic }));
      setError('');
    } else {
      setClientData({});
      setForm(prev => ({ ...prev, clientNic: '' }));
    }
    setShowModal(false);
  };

  const handleSelectEquipment = (selected) => {
    if (selected) {
      setEquipmentData({
        barcode: selected.id,
        model: selected.EquipmentSheet?.EquipmentModel?.name || '',
      });
      setForm(prev => ({ ...prev, usedEquipmentID: selected.id }));
      setError('');
    } else {
      setEquipmentData({});
      setForm(prev => ({ ...prev, usedEquipmentID: '' }));
    }
    setShowModalEq(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'clientNic') {
      if (!/^\d*$/.test(value)) setError('NIC must contain only numbers.');
      else if (value.length > 9) setError('NIC must be 9 digits long.');
      else setError('');
    }

    if (name === 'usedEquipmentID' && !/^\d*$/.test(value)) {
      setError('Equipment ID must contain only numbers.');
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!form.charityProjectId) {
    setError('Please select a charity project.');
    return;
  }

  try {
    await api.post('/api/storePurchase/donate', form);
    setSuccessMessage('Donation registered successfully!');

    setForm({ statusID: '', clientNic: '', usedEquipmentID: '', charityProjectId: '' });
    setClientData({});
    setEquipmentData({});
    setCharityProject(null);

    // Fecha o modal automaticamente se for doação direta de um equipamento
    if (equipment) {
      handleClose();
      if (typeof handleDonationComplete === 'function') {
        handleDonationComplete();
      }
    } else {
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  } catch (err) {
    const backendMsg = err.response?.data?.error;
    setError(backendMsg || 'An error occurred while registering the donation.');
  }
};


  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Register Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Client NIC</Form.Label>
                  <Form.Control
                    type="text"
                    name="clientNic"
                    value={form.clientNic}
                    onChange={handleChange}
                    placeholder="Enter NIC"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Button
                  variant="outline-secondary"
                  className="w-100 rounded-pill shadow-sm"
                  onClick={() => setShowModal(true)}
                >
                  Search Client
                </Button>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Equipment ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="usedEquipmentID"
                    value={form.usedEquipmentID}
                    onChange={handleChange}
                    placeholder="Enter Equipment ID"
                    required
                    readOnly={!!equipment}
                  />
                </Form.Group>
              </Col>
              {!equipment && (
                <Col md={6} className="d-flex align-items-end">
                  <Button
                    variant="outline-secondary"
                    className="w-100 rounded-pill shadow-sm"
                    onClick={() => setShowModalEq(true)}
                  >
                    Search Equipment
                  </Button>
                </Col>
              )}
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Charity Project</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={charityProject?.name || ''}
                    placeholder="Select a project"
                  />
                </Form.Group>
              </Col>
              <Col className="d-flex align-items-end">
                <Button
                  variant="outline-secondary"
                  className="w-100 rounded-pill shadow-sm"
                  onClick={() => setShowModalCharity(true)}
                >
                  Select Project
                </Button>
              </Col>
            </Row>

            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

            <Button
              variant="primary"
              type="submit"
              disabled={!!error}
              className="mt-3 w-100 rounded-pill shadow-lg"
            >
              Register Donation
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ClientCatalogModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSelectClient={handleSelectClient}
        selectedClient={clientData?.nic}
      />

      <UsedEquipmentCatalogModal
        show={showModalEq}
        handleClose={() => setShowModalEq(false)}
        handleSelectEquipment={handleSelectEquipment}
        selectedEquipmentID={equipmentData?.barcode}
      />

      <CharityProjectCatalogModal
        show={showModalCharity}
        handleClose={() => setShowModalCharity(false)}
        handleSelectCharity={handleSelectCharity}
        selectedCharityID={charityProject?.id}
      />
    </>
  );
}
