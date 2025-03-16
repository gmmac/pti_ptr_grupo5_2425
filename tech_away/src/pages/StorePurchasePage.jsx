import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import api from '../utils/axios';
import ClientCatalogModal from '../components/store/clientCatalogModal'
;

export default function StorePurchasePage() {
    const [form, setForm] = useState({
        statusID: '',
        price: '',
        clientNic:'',
        equipmentId: '',
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
        name: '',
        email: '',
        phone: '',
      });

    const [showModal, setShowModal] = useState(false);

    // Buscar estados do equipamento
    useEffect(() => {
        api.get(`/api/equipmentStatus/`)
            .then(res => setStatusList(res.data))
            .catch(error => console.error('Erro ao buscar estados:', error.message));
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

    const handleSelectClient = (client) => {
        setClientData(prev => ({
          ...prev,
          clientNIC: client ? client.nic : ''
        }));
        setShowModal(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setClientData({ ...clientData, [name]: value });

        if (name === "equipmentId") {
            if (!/^\d*$/.test(value)) {
                setError("O ID do equipamento deve conter apenas números.");
            } else if (value.length > 12) {
                setError("O ID do equipamento deve ter 12 algarismos.");
            } else {
                setError("");
            }
        }

        if (name === "clientNic") {
            if (!/^\d*$/.test(value)) {
                setError("O NIC do cliente deve conter apenas números.");
            } else if (value.length > 12) {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica se o ID do equipamento é válido
        if (form.equipmentId.length !== 12) {
            setError("O ID do equipamento deve ter exatamente 12 algarismos.");
            return;
        }

        // Verifica se o equipamento existe
        if (!equipmentList.includes(form.equipmentId)) {
            setError("Não existe nenhum equipamento com o ID fornecido.");
            return;
        }

        // Verifica se o cliente existe
        if (!clientList.includes(form.clientNic)) {
            setError("Não existe nenhum cliente com o NIC fornecido.");
            return;
        }
        
        api.post('/api/storePurchase', form)
        .then(response => {
            setSuccessMessage("Venda registada com sucesso!");
            setError("");

            setTimeout(() => {
                setSuccessMessage("");
                setForm({
                    statusID: '',
                    price: '',
                    clientNic: '',
                    equipmentId: '',
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
                        <Form.Group controlId="formIdEquipamento">
                            <Form.Label>ID do Equipamento</Form.Label>
                            <Form.Control
                                type="text"
                                name="equipmentId"
                                value={form.equipmentId}
                                onChange={handleChange}
                                placeholder="Digite o ID do equipamento"
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={12} md={6} className='d-flex align-items-end justify-content-start'>
                        <Button 
                        onClick={() => setShowModal(true)}
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
        </Container>
    );
    
}
