import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import '../../styles/index.css';
import '../../styles/AuthPage.css';

export default function LoginForms() {
    const [formData, setFormData] = useState({
        email: '',
    });

    const [errors, setErrors] = useState({
        email: '',
    });

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const ChangeToLogin = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Verificar campos vazios
        let newErrors = { ...errors };
        let hasError = false;
    
        Object.keys(formData).forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'Este campo é obrigatório';
                hasError = true;
            } else {
                newErrors[field] = ''; // Limpa o erro
            }
        });
    
        setErrors(newErrors);
    
        if (hasError) {
            return; // Impede o envio do formulário se houver erros
        }

        verifyData();
    };

    const verifyData = async () => {
        await api.post('/api/auth/changePassword', {
            email: formData.email,
        })
        .then(async response => {
            setShowModal(true);
        })
        .catch(error => {
            console.log(error)
        })
    };

    const handleChange = (e) => {
        // Guarda o valor do input
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Avalia se o valor do input está válido
        let newErrors = { ...errors };

        // Verifica campos se os campos estão vazios ou inválidos
        if (!value) {
            newErrors[name] = 'Este campo é obrigatório';
        } else if (name == 'email') {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
                newErrors[name] = 'O email deve ser válido';
            }else{
                newErrors[name] = '';
            }
        } else {
            newErrors[name] = ''; // Limpa erro se o campo não estiver vazio
        }

        setErrors(newErrors);
    };

    // Função para fechar o modal
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className='bg-white w-100 p-md-5 p-3 rounded-lg shadow-lg'>
            <h1 className='mb-3'>Reset Password</h1>
            <h5 className='mb-5'>If the email exists you will receive an email</h5>

            <Form onSubmit={handleSubmit}>
                {/* Email */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='fw-bold'>Email</Form.Label>
                    <Form.Control
                        className='auth-input'
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    {errors.invalidCredentials && <p className='text-danger'>{errors.invalidCredentials}</p>}
                    <Button type="submit" className='w-100 rounded-pill forms-btn shadow-lg'>Confirm</Button>
                </Form.Group>
            </Form>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Password Reset Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    An email has been sent to you. Please check your inbox and follow the instructions to reset your password.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ChangeToLogin}>
                        Go to login
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
