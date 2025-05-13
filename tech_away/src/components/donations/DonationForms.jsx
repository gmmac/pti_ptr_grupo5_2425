import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert, Row, Col } from 'react-bootstrap';
import api from '../../utils/axios';
import ClientCatalogModal from '../storePurchase/ClientCatalogModal';
import UsedEquipmentCatalogModal from './../equipment/UsedEquipmentCatalogModal';
import CharityProjectCatalogModal from '../charityProject/CharityProjectCatalogModal';

export default function DonationForms({ show, handleClose }) {
  const [form, setForm] = useState({
    statusID: '',
    clientNic: '',
    usedEquipmentID: '',
    charityProjectId: '',
  });

  const [statusList, setStatusList] = useState([]);
  const [modelsList, setModelsList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [clientData, setClientData] = useState({});
  const [equipmentData, setEquipmentData] = useState({});
  const [charityProject, setCharityProject] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showModalEq, setShowModalEq] = useState(false);
  const [showModalCharity, setShowModalCharity] = useState(false);

  useEffect(() => {
    api.get('/api/equipmentStatus/')
      .then(res => setStatusList(res.data))
      .catch(console.error);
    api.get('/api/model/')
      .then(res => setModelsList(res.data))
      .catch(console.error);
    api.get('/api/usedEquipment')
      .then(res => setEquipmentList(res.data.data.map(e => e.id)))
      .catch(console.error);
    api.get('/api/client/')
      .then(res => setClientList(res.data.data.map(e => e.nic)))
      .catch(console.error);
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!equipmentList.includes(form.usedEquipmentID)) {
      setError('No equipment found with the provided barcode.');
      return;
    }

    if (!clientList.includes(form.clientNic)) {
      setError('No client found with the provided NIC.');
      return;
    }

    if (!form.charityProjectId) {
      setError('Please select a charity project.');
      return;
    }

    try {
      await api.post('/api/storePurchase/donate', form);
      setSuccessMessage('Donation registered successfully!');
      setForm({ statusID: '', clientNic: '', usedEquipmentID: '', charityProjectId: '' });
     
      setCharityProject(null);
      setEquipmentData(null);
      setClientData(null);

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      const backendMsg = err.response?.data?.error;
      if (backendMsg) {
        setError(backendMsg);
      } else {
        console.error('Error registering donation:', err);
        setError('An error occurred while registering the donation.');
      }
    }
  };

  const handleSelectClient = (client) => {
    if (client) {
      setClientData({
        nic: client.nic,
        nif: client.nif,
        birthDate: client.birthDate,
        gender: client.gender,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: client.phone,
      });
      setForm(prev => ({ ...prev, clientNic: client.nic }));
      setError('');
    } else {
      setClientData({ nic: '', nif: '', birthDate: '', gender: '', firstName: '', lastName: '', email: '', phone: '' });
      setForm(prev => ({ ...prev, clientNic: '' }));
    }
    setShowModal(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClientData(prev => ({ ...prev, [name]: value }));
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'usedEquipmentID' && !/^[0-9]*$/.test(value)) {
      setError('The equipment barcode must contain only numbers.');
    }
    if (name === 'clientNic') {
      if (!/^[0-9]*$/.test(value)) setError('The client NIC must contain only numbers.');
      else if (value.length > 9) setError('The client NIC must be 9 digits long.');
    }
  };

  const handleSelectEquipment = (equipment) => {
    if (equipment) {
      setEquipmentData({
        barcode: equipment.id,
        model: equipment.EquipmentSheet.EquipmentModel.name,
      });
      setForm(prev => ({ ...prev, usedEquipmentID: equipment.id }));
      setError('');
    } else {
      setEquipmentData({ barcode: '', model: '' });
      setForm(prev => ({ ...prev, usedEquipmentID: '' }));
    }
    setShowModalEq(false);
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
                <Form.Group controlId="formClientNic">
                  <Form.Label>Client NIC</Form.Label>
                  <Form.Control type="text" name="clientNic" value={form.clientNic} onChange={handleChange} placeholder="Enter NIC" required />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Button variant="outline-secondary" className="w-100 rounded-pill shadow-sm" onClick={() => setShowModal(true)}>
                  Search Client
                </Button>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formusedEquipmentID">
                  <Form.Label>Equipment Barcode</Form.Label>
                  <Form.Control type="text" name="usedEquipmentID" value={form.usedEquipmentID} onChange={handleChange} placeholder="Enter barcode" required />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Button variant="outline-secondary" className="w-100 rounded-pill shadow-sm" onClick={() => setShowModalEq(true)}>
                  Search Equipment
                </Button>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formCharityProject">
                  <Form.Label>Charity Project</Form.Label>
                  <Form.Control type="text" readOnly value={charityProject?.name || ''} placeholder="Select a project" />
                </Form.Group>
              </Col>
              <Col className="d-flex align-items-end">
                <Button variant="outline-secondary" className="w-100 rounded-pill shadow-sm" onClick={() => setShowModalCharity(true)}>
                  Select Project
                </Button>
              </Col>
            </Row>
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <Button variant="primary" type="submit" disabled={!!error} className="mt-3 w-100 rounded-pill shadow-lg">
              Register Donation
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ClientCatalogModal show={showModal} handleClose={() => setShowModal(false)} handleSelectClient={handleSelectClient} selectedClient={clientData?.nic} />
      <UsedEquipmentCatalogModal show={showModalEq} handleClose={() => setShowModalEq(false)} handleSelectEquipment={handleSelectEquipment} selectedEquipmentID={equipmentData?.barcode} />
      <CharityProjectCatalogModal show={showModalCharity} handleClose={() => setShowModalCharity(false)} handleSelectCharity={handleSelectCharity} selectedCharityID={charityProject?.id} />
    </>
  );
}
