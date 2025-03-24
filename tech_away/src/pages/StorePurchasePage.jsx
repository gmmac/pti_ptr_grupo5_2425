import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import api from '../utils/axios';
import ClientCatalogModal from '../components/storePurchase/clientCatalogModal';
import EquipmentCatalogModal from '../components/storePurchase/EquipmentCatalogModal';

export default function StorePurchasePage() {
    const [form, setForm] = useState({
        statusID: '',
        price: '',
        clientNic:'',
        equipmentBarcode: '',
    });

    const [statusList, setStatusList] = useState([]);
    const [equipmentList, setEquipmentList] = useState([]); // Lista de IDs de equipamentos válidos
    const [clientList, setClientList] = useState([]); // Lista de NICs de clientes válidos
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

    // Buscar estados do equipamento
    useEffect(() => {
        api.get(`/api/equipmentStatus/`)
            .then(res => setStatusList(res.data))
            .catch(error => console.error('Erro ao buscar estados:', error.message));
    }, []);

    // Buscar modelos do equipamento
    useEffect(() => {
        api.get(`/api/model/`)
            .then(res => setModelsList(res.data))
            .catch(error => console.error('Erro ao buscar modelos:', error.message));
    }, []);

    // Buscar IDs válidos de equipamentos
    useEffect(() => {
        api.get(`/api/equipmentSheet/`)
            .then(res => setEquipmentList(res.data.map(e => e.barcode)))
            .catch(error => console.error('Erro ao buscar equipamentos:', error.message));
    }, []);

    // Buscar NICs válidos de clientes
    useEffect(() => {
        api.get(`/api/client/`)
            .then(res => setClientList(res.data.map(e => e.nic)))
            .catch(error => console.error('Erro ao buscar NICs:', error.message));
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseModalEq = () => {
        setShowModalEq(false);
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
                phone: client.phone
            });
    
            setForm((prevForm) => ({
                ...prevForm,
                clientNic: client.nic // <-- Atualiza o campo clientNic do form
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
                equipmentBarcode: equipment.barcode // <-- Atualiza o campo equipmentBarcode do form
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

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica se o Código de barras do equipamento é válido
        if (form.equipmentBarcode.length !== 20) {
            setError("O Código de barras do equipamento deve ter exatamente 20 algarismos.");
            return;
        }

        // Verifica se o equipamento existe
        if (!equipmentList.includes(form.equipmentBarcode)) {
            setError("Não existe nenhum equipamento com o Código de barras fornecido.");
            return;
        }

        // Verifica se o cliente existe
        if (!clientList.includes(form.clientNic)) {
            setError("Não existe nenhum cliente com o NIC fornecido.");
            return;
        }

        console.log(form);
        
        await api.post('/api/storePurchase', form)
        .then(response => {
            setSuccessMessage("Venda registada com sucesso!");
            setError("");

            setTimeout(() => {
                setSuccessMessage("");
                setForm({
                    statusID: '',
                    price: '',
                    clientNic: '',
                    equipmentBarcode: '',
                });
            }, 3000);
        })
        .catch(error => {
            console.error("Erro ao registrar venda: ", error.response.data); 
            setError("Ocorreu um erro ao registar a venda.");
        });
    };

    return (
        <Container>
            <h2>Registar Venda de Produto</h2>

            {successMessage && (
                <Alert variant="success" className="mt-3 text-center">
                    {successMessage}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>

                <Row className="mb-3">
                    <Form.Group controlId="formEstado">
                        <Form.Label>Estado do Equipamento</Form.Label>
                        <Form.Control
                            as="select"
                            name="statusID"
                            value={form.statusID}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione...</option>
                            {statusList.map((s, index) => (
                                <option key={index} value={s.id}>
                                    {s.state}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group controlId="formPreco">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Digite o preço"
                            required
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Col sm={12} md={6}>
                        <Form.Group controlId="formClientNic">
                            <Form.Label>NIC do cliente</Form.Label>
                            <Form.Control
                                type="text"
                                name="clientNic"
                                value={form.clientNic}
                                onChange={handleChange}
                                placeholder="Digite o NIC do cliente"
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={12} md={6} className='d-flex align-items-end justify-content-start'>
                        <Button 
                        onClick={() => setShowModal(true)}
                        className='w-100 rounded-pill forms-btn shadow-lg'
                        >
                        Procurar cliente
                        </Button>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={12} md={6}>
                        <Form.Group controlId="formBarcodeEquipamento">
                            <Form.Label>Código de barras do Equipamento</Form.Label>
                            <Form.Control
                                type="number"
                                name="equipmentBarcode"
                                value={form.equipmentBarcode}
                                onChange={handleChange}
                                placeholder="Digite o Código de barras do equipamento"
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={12} md={6} className='d-flex align-items-end justify-content-start'>
                        <Button 
                        onClick={() => setShowModalEq(true)}
                        className='w-100 rounded-pill forms-btn shadow-lg'
                        >
                        Procurar equipamento
                        </Button>
                    </Col>
                </Row>


                {error && (
                    <Alert variant="danger" className="mt-2 text-center">
                        {error}
                    </Alert>
                )}

                <Button variant="primary" type="submit" disabled={!!error}>
                    Registar Venda
                </Button>
            </Form>

            <ClientCatalogModal show={showModal} handleClose={handleCloseModal} handleSelectClient={handleSelectClient} selectedClient={clientData.nic} />
            <EquipmentCatalogModal show={showModalEq} handleClose={handleCloseModalEq} handleSelectEquipment={handleSelectEquipment} selectedEquipment={equipmentData.barcode} />
        </Container>
    );
    
}
