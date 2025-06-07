import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert, Row, Col } from 'react-bootstrap';
import api from '../../utils/axios';
import ClientCatalogModal from './ClientCatalogModal';
import EquipmentCatalogModal from './EquipmentCatalogModal';

export default function StorePurchaseForms({show, handleClose, setRefreshPurchases}) {
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
            .then(res => setStatusList(res.data.data))
            .catch(error => console.error('Erro ao buscar estados:', error.message));
    }, []);

    useEffect(() => {
        api.get(`/api/model/`)
            .then(res => setModelsList(res.data))
            .catch(error => console.error('Erro ao buscar modelos:', error.message));
    }, []);

    useEffect(() => {
        api.get(`/api/equipmentSheet/teste`)
            .then(res => setEquipmentList(res.data.data.map(e => e.barcode)))
            .catch(error => console.error('Erro ao buscar equipamentos:', error.message));
    }, []);

    useEffect(() => {
        api.get(`/api/client/`)
            .then(res => setClientList(res.data.data.map(e => e.nic)))
            .catch(error => console.error('Erro ao buscar NICs:', error.message));
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

            setForm((prevForm) => ({
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

            setForm((prevForm) => ({
                ...prevForm,
                clientNic: ''
            }));
        }

        setShowModal(false);
    };

    const handleSelectEquipment = (equipment) => {
        if (equipment) {
            setEquipmentData({
                barcode: equipment.barcode,
                model: equipment.model,
                releaseYear: equipment.releaseYear,
                type: equipment.type
            });

            setForm((prevForm) => ({
                ...prevForm,
                equipmentBarcode: equipment.barcode
            }));
        } else {
            setEquipmentData({
                barcode: '',
                model: '',
                releaseYear: '',
                type: ''
            });

            setForm((prevForm) => ({
                ...prevForm,
                equipmentBarcode: ''
            }));
        }

        setShowModalEq(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setClientData({ ...clientData, [name]: value });

        if (name === "equipmentBarcode") {
            if (!/^\d*$/.test(value)) {
                setError("O Código de barras do equipamento deve conter apenas números.");
            } else if (value.length > 20) {
                setError("O Código de barras do equipamento deve ter 20 algarismos.");
            } else {
                setError("");
            }
        }

        if (name === "clientNic") {
            if (!/^\d*$/.test(value)) {
                setError("O NIC do cliente deve conter apenas números.");
            } else if (value.length > 9) {
                setError("O NIC do cliente deve ter 9 algarismos.");
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
            setError("O Código de barras do equipamento deve ter exatamente 20 algarismos.");
            return;
        }

        if (!equipmentList.includes(form.equipmentBarcode)) {
            setError("Não existe nenhum equipamento com o Código de barras fornecido.");
            return;
        }

        if (!clientList.includes(form.clientNic)) {
            setError("Não existe nenhum cliente com o NIC fornecido.");
            return;
        }

        await api.post('/api/storePurchase', form)
            .then(response => {
                setSuccessMessage("Venda registada com sucesso!");
                setError("");

                setRefreshPurchases(prev => {
                    console.log("Valor anterior de refreshPurchases:", prev);
                    return !prev;
                });

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
                    setForm({
                        statusID: '',
                        price: '',
                        clientNic: '',
                        equipmentBarcode: '',
                    });
                }, 1000);
            })
            .catch(error => {
                console.error("Erro ao registrar venda: ", error.response.data);
                setError("Ocorreu um erro ao registar a venda.");
            });

            handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Registar Venda de Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group controlId="formEstado">
                                <Form.Label>Estado do Equipamento</Form.Label>
                                <Form.Control as="select" name="statusID" value={form.statusID} onChange={handleChange} required>
                                    <option value="">Selecione...</option>
                                    {statusList.map((s, idx) => <option key={idx} value={s.id}>{s.state}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group controlId="formPreco">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control type="number" name="price" value={form.price} onChange={handleChange} placeholder="Digite o preço" required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formClientNic">
                                    <Form.Label>NIC do cliente</Form.Label>
                                    <Form.Control type="text" name="clientNic" value={form.clientNic} onChange={handleChange} placeholder="Digite o NIC" required />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="d-flex align-items-end">
                                <Button onClick={() => setShowModal(true)} className="w-100 rounded-pill shadow-sm" variant="outline-secondary">
                                    Procurar cliente
                                </Button>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formBarcodeEquipamento">
                                    <Form.Label>Código de barras do Equipamento</Form.Label>
                                    <Form.Control type="number" name="equipmentBarcode" value={form.equipmentBarcode} onChange={handleChange} placeholder="Digite o código de barras" required />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="d-flex align-items-end">
                                <Button onClick={() => setShowModalEq(true)} className="w-100 rounded-pill shadow-sm" variant="outline-secondary">
                                    Procurar equipamento
                                </Button>
                            </Col>
                        </Row>

                        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                        <Button variant="primary" type="submit" disabled={!!error} className="mt-3 w-100 rounded-pill shadow-lg">
                            Registar Venda
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