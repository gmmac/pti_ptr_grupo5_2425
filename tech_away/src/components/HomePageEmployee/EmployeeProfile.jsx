import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Stack, Accordion, Card } from 'react-bootstrap';
import api from '../../utils/axios';
import { formatDate } from '../../utils/dateTime';
import { getLoggedUser } from '../../utils/auth';
import "../../styles/pageElements.css";
import { PencilSquare, XCircleFill } from 'react-bootstrap-icons';

export default function EmployeeProfile() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        phone: "",
        email: "",
        nic: "",
        nif: "",
        internNum: "",
        role: "",
        storeNIPC: "",
        address: "",
        gender: ""
    });

    const [roleName, setRoleName] = useState("");
    const [storeName, setStoreName] = useState("");


    const [originalData, setOriginalData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [changedFields, setChangedFields] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function fetchUserData() {
            try {
                const res = await api.get("/api/auth/user-info?userType=employee");
                const userInfo = res.data.userInfo;
                setFormData(userInfo);
                setOriginalData(userInfo); // Armazena os dados originais
            } catch (error) {
                console.error("Erro ao buscar os dados do Employeee:", error.message);
            }
        }


        fetchUserData();
    }, []);

    useEffect(() => {
        async function fetchEmployeeData() {
            try{
                await api.get(`/api/employeeRole/${formData?.role}`).then((res) => {
                    setRoleName(res.data.role)
                })

                await api.get(`/api/store/${formData?.storeNIPC}`).then((res) => {
                    setStoreName(res.data.name)
                })



            }catch (error) {
                console.error("Erro ao buscar dados do Employee:", error.message);
            }
        }


        fetchEmployeeData();

    }, [formData])

    useEffect(() => {
        console.log(errors)
    }, [errors])

    const handleEditClick = () => {
        if (isEditing) {
            setFormData({ ...originalData });
            setChangedFields([]);
            setErrors({}); 
        }
        setIsEditing(!isEditing);
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

        validateErros(e);
    };
    
    const handleSaveChanges = (e) => {
        e.preventDefault();


        let newErrors = { ...errors };
        let hasError = false;
    
        setErrors(newErrors);
        
        console.log(hasError)
        console.log(errors);
        
        if (hasError) {
            return;
        }

        api.put(`/api/employee/${formData.internNum}`, changedFields)
            .then((res) => {
                setOriginalData({ ...originalData, ...changedFields });
                setChangedFields([]);
            })
            .catch((error) => {
                console.error("Erro ao atualizar os dados:", error.message);
        });
    
        
        setIsEditing(false);
    };

    const validateErros = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        let newErrors = { ...errors };

        if (['phone', 'nif', 'nic'].includes(name)) {
            const nineDigitPattern = /^\d{9}$/;
            newErrors[name] = nineDigitPattern.test(value) ? '' : 'Value must have exactly 9 digits';
        } else {
            newErrors[name] = '';
        }

        setErrors(newErrors);
    }

    return (
        <Container>
            <h2 className="my-4 text-center">Employee Information</h2>
            <Form>
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
                            <Col md={12}>
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
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="tel" 
                                        name="phone" 
                                        value={formData.phone || ""} 
                                        disabled={!isEditing} 
                                        onChange={handleInputChange}
                                        isInvalid={!!errors?.phone}
                                    />
                                <Form.Control.Feedback type="invalid">{errors?.phone}</Form.Control.Feedback>

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
                                    <Form.Label>NIC</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="number" 
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
                                    type="number" 
                                    name="nif" 
                                    value={formData.nif || ""} 
                                    disabled={!isEditing} 
                                    onChange={handleInputChange}
                                    isInvalid={!!errors?.nif}
                                />
                                <Form.Control.Feedback type="invalid">{errors?.nif}</Form.Control.Feedback>
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

                <div className="text-center p-3">
                {isEditing && <Button
                    type="button" 
                    className="btn btn-success"
                    onClick={handleSaveChanges}
                    disabled={Object.keys(changedFields).length === 0 || Object.values(errors).some(error => error)}
                >
                    Save Changes
                </Button>}

                </div>

                <Card className="my-3 custom-card shadow-sm">
                    <Card.Header className="fw-bold card-header">
                        <span>Employee Information</span>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Intern Number</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="text" 
                                        name="interNum" 
                                        value={formData.internNum || ""}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="text" 
                                        name="roleName" 
                                        value={roleName || ""} 
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Store NIPC</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="text" 
                                        name="storeNipc" 
                                        value={formData.storeNIPC || ""} 
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Store Name</Form.Label>
                                    <Form.Control 
                                        className="profile-input" 
                                        type="text" 
                                        name="storeName" 
                                        value={storeName || ""} 
                                        disabled 
                                    />
                                </Form.Group>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Form>
        </Container>
    );
}
