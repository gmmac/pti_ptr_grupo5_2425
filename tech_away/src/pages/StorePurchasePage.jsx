import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import api from '../utils/axios';

export default function StorePurchasePage() {
    const [form, setForm] = useState({
        statusID: '',
        price: '',
        equipmentId: '',
    });

    const [statusList, setStatusList] = useState([]);
    const [equipmentList, setEquipmentList] = useState([]); // Lista de IDs válidos
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "equipmentId") {
            if (!/^\d*$/.test(value)) {
                setError("O ID do equipamento deve conter apenas números.");
            } else if (value.length > 12) {
                setError("O ID do equipamento deve ter no máximo 12 algarismos.");
            } else {
                setError("");
            }
        }

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

        // // Enviar dados para o backend
        // const formData = {
        //     statusID: form.status,
        //     price: form.price,
        //     equipmentId: form.equipmentId,
        // };

        // console.log("Dados enviados: ", formData);

        
        api.post('/api/storePurchase', form)
        .then(response => {
            setSuccessMessage("Venda registada com sucesso!");
            setError("");

            setTimeout(() => {
                setSuccessMessage("");
                setForm({
                    statusID: '',
                    price: '',
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

                {error && (
                    <Alert variant="danger" className="mt-2 text-center">
                        {error}
                    </Alert>
                )}

                <Button variant="primary" type="submit" disabled={!!error}>
                    Registar Venda
                </Button>
            </Form>
        </Container>
    );
    
}
