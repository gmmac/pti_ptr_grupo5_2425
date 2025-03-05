import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../utils/axios';

export default function StorePurchasePage() {
    // Estado para armazenar os dados do formulário
    const [form, setForm] = useState({
        status: '', price: '', equipmentId: ''
    });
    
    // Estado para armazenar os estados do equipamento
    const [statusList, setStatusList] = useState([]);

    useEffect(() => {
        console.log(form);
    }, [form]);

    useEffect(() => {
        api.get(`/api/equipmentStatus/`, {})
        .then(res => {
            setStatusList(res.data);
        })
        .catch(error => {
            console.error('API error:', error.message);
        });
    },[]);

    // Função para lidar com as mudanças do formulário
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função de submit do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            status: form.status,
            price: form.price,
            equipmentId: form.equipmentId
        });
    };

    return (
        <Container>
            <h2>Registrar Venda de Produto</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEstado">
                    <Form.Label>Estado do Equipamento</Form.Label>
                    <Form.Control
                        as="select"
                        name="status"  // Nome para o estado
                        value={form.status}
                        onChange={handleChange} // Chamada correta da função handleChange
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
                        name="price"  // Nome para o preço
                        value={form.price}
                        onChange={handleChange} // Chamada correta da função handleChange
                        placeholder="Digite o preço"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formIdEquipamento">
                    <Form.Label>ID do Equipamento</Form.Label>
                    <Form.Control
                        type="text"
                        name="equipmentId"  // Nome para o ID do equipamento
                        value={form.equipmentId}
                        onChange={handleChange} // Chamada correta da função handleChange
                        placeholder="Digite o ID do equipamento"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registrar Venda
                </Button>
            </Form>
        </Container>
    );
}
