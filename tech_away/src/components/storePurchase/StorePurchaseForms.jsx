import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert, Row, Col } from 'react-bootstrap';
import api from '../../utils/axios';
import ClientCatalogModal from './ClientCatalogModal';
import EquipmentCatalogModal from './EquipmentCatalogModal';

export default function StorePurchaseForms({  show, handleClose, setRefreshPurchases, setRefreshCounter  , purchaseID }) {
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

    // Preencher formulário em modo edição
    useEffect(() => {
    if (purchaseID != null) {
        api.get(`/api/storePurchase/${purchaseID}`)
            .then(res => {
                const data = res.data;

                setForm({
                    statusID: data.statusID || '',
                    price: data.purchasePrice || '',
                    clientNic: data.clientNIC || '',
                    equipmentBarcode: data.equipmentID || '',
                });

                // Opcional: preencher clientData e equipmentData com mais detalhes, se desejar
            })
            .catch(err => {
                console.error("Erro ao buscar dados da compra:", err.message);
                setError("Erro ao carregar os dados da compra.");
            });
        }
    }, [purchaseID, successMessage]);


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
                nic: '', nif: '', birthDate: '', gender: '',
                firstName: '', lastName: '', email: '', phone: ''
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

        // try {
            if (purchaseID) {
                await api.put(`/api/storePurchase/${purchaseID}`, form);
                setSuccessMessage("Venda atualizada com sucesso!");
            } else {
                await api.post('/api/storePurchase', form);
                setSuccessMessage("Venda registada com sucesso!");
            }

            setError("");
            setRefreshPurchases(prev => !prev);

            setClientData({
                nic: '', nif: '', birthDate: '', gender: '',
                firstName: '', lastName: '', email: '', phone: ''
            });

            setEquipmentData({
                barcode: '', releaseYear: '', type: ''
            });

            setForm({
                statusID: '', price: '', clientNic: '', equipmentBarcode: ''
            });

                setTimeout(() => {
                    setSuccessMessage("");
                }, 1000);
            // })
            // .catch(error => {
            //     console.error("Error registering purchase: ", error.response?.data);
            //     setError("An error occurred while registering the purchase.");
            // });

        handleClose();
            setTimeout(() => setSuccessMessage(""), 1000);
            handleClose();
        // } catch (error) {
        //     console.error("Error saving sale: ", error.response?.data || error.message);
        //     setError("An error occurred while saving the sale.");
        // }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{purchaseID ? "Edit purchase" : "New purchase"}</Modal.Title>
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
                                    <Form.Control type="text" name="clientNic" value={form.clientNic} onChange={handleChange} placeholder="Insert NIC" required />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="d-flex align-items-end">
                                <Button onClick={() => setShowModal(true)} className="w-100 rounded-pill shadow-sm" variant="outline-secondary">
                                    Search client
                                </Button>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formBarcodeEquipamento">
                                    <Form.Label>Equipment barcode</Form.Label>
                                    <Form.Control type="number" name="equipmentBarcode" value={form.equipmentBarcode} onChange={handleChange} placeholder="Insert Barcode" required />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="d-flex align-items-end">
                                <Button onClick={() => setShowModalEq(true)} className="w-100 rounded-pill shadow-sm" variant="outline-secondary">
                                    Search equipment
                                </Button>
                            </Col>
                        </Row>
                        {/* <Row className="mb-3">
                            <Form.Group controlId="formEstado">
                                <Form.Label>Equipment status</Form.Label>
                                <Form.Control as="select" name="statusID" value={form.statusID} onChange={handleChange} required>
                                    <option value="">Select...</option>
                                    {statusList.map((s, idx) => <option key={idx} value={s.id}>{s.state}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group controlId="formPreco">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name="price" value={form.price} onChange={handleChange} placeholder="Insert price" required />
                            </Form.Group>
                        </Row> */}

                        

                        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                        <Button variant="primary" type="submit" disabled={!!error} className="mt-3 w-100 rounded-pill shadow-lg" style={{ backgroundColor: '#b5a8c9', borderColor: '#b5a8c9', color: 'white' }}>
                            {purchaseID ? "Salvar Alterações" : "Registar Venda"}
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
