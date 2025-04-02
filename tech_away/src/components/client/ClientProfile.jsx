import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Card } from 'react-bootstrap';
import { PencilSquare, XCircleFill } from 'react-bootstrap-icons';
import api from '../../utils/axios';
import "../../styles/ClientProfilePage.css"

export default function ClientProfile() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        phone: "",
        email: "",
        nic: "",
        nif: "",
        address: "",
        gender: ""
    });

    const [originalData, setOriginalData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [changedFields, setChangedFields] = useState([]);

    useEffect(() => {
        async function fetchClientData() {
            try {
                const res = await api.get("/api/auth/user-info");
                const userInfo = res.data.userInfo;
                setFormData(userInfo);
                setOriginalData(userInfo); // Armazena os dados originais
            } catch (error) {
                console.error("Erro ao buscar os dados do cliente:", error.message);
            }
        }

        fetchClientData();
    }, []);

    const handleEditClick = () => {
        if (isEditing) {
            // Se o usuário clicar no check enquanto estiver editando, as alterações são descartadas
            setFormData({ ...originalData });  // Reseta os campos para os dados originais
            setChangedFields([]); // Limpa a lista de campos alterados
        }
        setIsEditing(!isEditing);  // Alterna o estado de edição
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
        // Verifica se o valor alterado é diferente do original
        if (value !== originalData[name]) {
            setChangedFields({ ...changedFields, [name]: value }); // Armazena campo e valor
        } else {
            // Remove o campo se voltar ao valor original
            const updatedFields = { ...changedFields };
            delete updatedFields[name];
            setChangedFields(updatedFields);
        }
    };
    
    const handleSaveChanges = () => {
        api.put(`/api/client/${formData.nic}`, changedFields)
            .then((res) => {
                setOriginalData({ ...originalData, ...changedFields });
                setChangedFields([]);
            })
            .catch((error) => {
                console.error("Erro ao atualizar os dados:", error.message);
            });
    
        setIsEditing(false);
    };

    return (
        <Container>
            <h2 className="my-4 text-center">Client Information</h2>
            <Form>
                {/* Personal Information Card */}
                <Card className="mb-3 custom-card shadow-sm">
                    <Card.Header className="fw-bold card-header">
                        <span>Personal Information</span>
                        <span 
                            className="ms-2" 
                            style={{ cursor: 'pointer', fontSize: '1.5rem' }} // Aumenta o tamanho do ícone
                            onClick={handleEditClick}
                        >
                            {isEditing ? (
                                <XCircleFill  
                                    style={{ color: 'red', fontWeight: 'bold', fontSize: '1.5rem' }} // Ícone de check maior e com cor verde
                                />  
                            ) : (
                                <PencilSquare 
                                    style={{ fontSize: '1.5rem' }} // Tamanho do ícone de lápis
                                />
                            )}
                        </span>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="text" 
                                        name="firstName" 
                                        value={formData.firstName || ""} 
                                        disabled={!isEditing}  // Controla se o campo é editável
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="text" 
                                        name="lastName" 
                                        value={formData.lastName || ""} 
                                        disabled={!isEditing} 
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Birth Date</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="date" 
                                        name="birthDate" 
                                        value={formData.birthDate ? formData.birthDate.split('T')[0] : ""} 
                                        disabled={!isEditing} 
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="tel" 
                                        name="phone" 
                                        value={formData.phone || ""} 
                                        disabled={!isEditing} 
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="email" 
                                        name="email" 
                                        value={formData.email || ""} 
                                        disabled
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>NIC</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="text" 
                                        name="nic" 
                                        value={formData.nic || ""} 
                                        disabled
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>NIF</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="text" 
                                        name="nif" 
                                        value={formData.nif || ""} 
                                        disabled={!isEditing} 
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="text" 
                                        name="address" 
                                        value={formData.address || ""} 
                                        disabled={!isEditing} 
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <div className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-success"
                        onClick={handleSaveChanges}
                        disabled={changedFields.length == 0} // Desativa o botão se não houver mudanças
                    >
                        Save Changes
                    </button>
                </div>
            </Form>
        </Container>
    );
}
