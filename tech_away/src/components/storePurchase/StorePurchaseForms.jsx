import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert, Row, Col } from 'react-bootstrap';
import api from '../../utils/axios';
import ClientCatalogModal from './ClientCatalogModal';
import EquipmentCatalogModal from './EquipmentCatalogModal';

export default function StorePurchaseForms({ show, handleClose, setRefreshPurchases }) {
    const [form, setForm] = useState({
        statusID: '',
        price: '',
        clientNic: '',
        equipmentBarcode: '',
    });

    const [statusList, setStatusList] = useState([]);
    const [equipmentList, setEquipmentList] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [clientData, setClientData] = useState({
        nic: '',
        nif: '',
        birthDate: '',
        gender: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const [equipmentData, setEquipmentData] = useState({
        barcode: '',
        releaseYear: '',
        type: ''
    });

    const [modelsList, setModelsList] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showModalEq, setShowModalEq] = useState(false);
    
    useEffect(() => {
        api.get(`/api/equipmentStatus/`)
            .then(res => setStatusList(res.data))
            .catch(error => console.error('Error fetching statuses:', error.message));
    }, []);

    useEffect(() => {
        api.get(`/api/model/`)
            .then(res => setModelsList(res.data))
            .catch(error => console.error('Error fetching models:', error.message));
    }, []);

    useEffect(() => {
    api.get(`/api/equipmentSheet`)
        .then(res => setEquipmentList(res.data.data.map(e => e.Barcode)))
        .catch(error => console.error('Error fetching equipment:', error.message));
        console.log(equipmentList)

    }, []);


    useEffect(() => {
        console.log(form)
    }, [form])

    useEffect(() => {
        api.get(`/api/client/`)
            .then(res => setClientList(res.data.data.map(e => e.nic)))
            .catch(error => console.error('Error fetching clients:', error.message));
    }, []);

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
                phone: client.phone
            });

            setForm(prevForm => ({
                ...prevForm,
                clientNic: client.nic
            }));
        } else {
            setClientData({
                nic: '',
                nif: '',
                birthDate: '',
                gender: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            });

            setForm(prevForm => ({
                ...prevForm,
                clientNic: ''
            }));
        }

        setShowModal(false);
         setError("");
    };

    const handleSelectEquipment = (equipment) => {
        if (equipment) {
            setEquipmentData({
                barcode: equipment.Barcode,
                model: equipment.model,
                releaseYear: equipment.releaseYear,
                type: equipment.type
            });

            setForm(prevForm => ({
                ...prevForm,
                equipmentBarcode: equipment.Barcode
            }));
        } else {
            setEquipmentData({
                barcode: '',
                model: '',
                releaseYear: '',
                type: ''
            });

            setForm(prevForm => ({
                ...prevForm,
                equipmentBarcode: ''
            }));
        }

        setShowModalEq(false);
         setError("");
    };


    const handleChange = (event) => {
        const { name, value } = event.target;

        setClientData({ ...clientData, [name]: value });

        if (name === "equipmentBarcode") {
            if (!/^\d*$/.test(value)) {
                setError("Equipment barcode must contain only digits.");
            } else if (value.length > 20) {
                setError("Equipment barcode must be exactly 20 digits long.");
            } else {
                setError("");
            }
        }

        if (name === "clientNic") {
            if (!/^\d*$/.test(value)) {
                setError("Client NIC must contain only digits.");
            } else if (value.length > 9) {
                setError("Client NIC must be exactly 9 digits long.");
            } else {
                setError("");
            }
        }

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.equipmentBarcode.length !== 20) {
            setError("Equipment barcode must be exactly 20 digits long.");
            return;
        }
        // if (!equipmentList.includes(form.equipmentBarcode)) {
        //     setError("No equipment found with the provided barcode.");
        //     return;
        // }

        // if (!clientList.includes(form.clientNic)) {
        //     setError("No client found with the provided NIC.");
        //     return;
        // }

        await api.post('/api/storePurchase', form)
            .then(response => {
                setSuccessMessage("Purchase registered successfully!");
                setError("");

                setRefreshPurchases(prev => !prev);

                setClientData({
                    nic: '',
                    nif: '',
                    birthDate: '',
                    gender: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: ''
                });

                setEquipmentData({
                    barcode: '',
                    model: '',
                    releaseYear: '',
                    type: ''
                });

                setForm({
                    statusID: '',
                    price: '',
                    clientNic: '',
                    equipmentBarcode: '',
                });

                setTimeout(() => {
                    setSuccessMessage("");
                }, 1000);
            })
            .catch(error => {
                console.error("Error registering purchase: ", error.response?.data);
                setError("An error occurred while registering the purchase.");
            });

        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Register Product Sale</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group controlId="formStatus">
                                <Form.Label>Equipment Status</Form.Label>
                                <Form.Control as="select" name="statusID" value={form.statusID} onChange={handleChange} required>
                                    <option value="">Select...</option>
                                    {statusList.map((s, idx) => <option key={idx} value={s.id}>{s.state}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group controlId="formPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name="price" value={form.price} onChange={handleChange} placeholder="Enter price" required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formClientNic">
                                    <Form.Label>Client NIC</Form.Label>
                                    <Form.Control type="text" name="clientNic" value={form.clientNic} onChange={handleChange} placeholder="Enter NIC" required disabled />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="d-flex align-items-end">
                                <Button onClick={() => setShowModal(true)} className="w-100 rounded-pill shadow-sm" variant="outline-secondary">
                                    Browse Clients
                                </Button>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formEquipmentBarcode">
                                    <Form.Label>Equipment Barcode</Form.Label>
                                    <Form.Control type="number" name="equipmentBarcode" value={form.equipmentBarcode} onChange={handleChange} placeholder="Enter barcode" required disabled />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="d-flex align-items-end">
                                <Button onClick={() => setShowModalEq(true)} className="w-100 rounded-pill shadow-sm" variant="outline-secondary">
                                    Browse Equipment
                                </Button>
                            </Col>
                        </Row>

                        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                        <Button variant="primary" type="submit" disabled={!!error} className="mt-3 w-100 rounded-pill shadow-lg">
                            Register Sale
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <ClientCatalogModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSelectClient={handleSelectClient}
                selectedClient={clientData.nic}
            />
            <EquipmentCatalogModal
                show={showModalEq}
                handleClose={() => setShowModalEq(false)}
                handleSelectEquipment={handleSelectEquipment}
                selectedEquipment={equipmentData.barcode}
            />
        </>
    );
}
