import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function RegisterForms({setShowToast}) {

    const [formData, setFormData] = useState({
        nic: '',
        nif: '',
        phone: '',
        birthDate: '',
        gender: '',
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        nic: '',
        nif: '',
        phone: '',
        birthDate: '',
        gender: '',
        name: '',
        email: '',
        password: ''
    });


    const validatePassword = (password) => {
        const errors = [];
        const minLength = 8;
        const specialChars = /[!@#$%^&*]/;
        const lowerCase = /[a-z]/;
        const upperCase = /[A-Z]/;
        const numbers = /[0-9]/;
    
        if (password.length < minLength) {
            errors.push('ter pelo menos 8 caracteres');
        }
        if (!specialChars.test(password)) {
            errors.push('conter pelo menos um caractere especial (@#$%^&*)');
        }
        if (!lowerCase.test(password)) {
            errors.push('conter pelo menos uma letra minúscula');
        }
        if (!upperCase.test(password)) {
            errors.push('conter pelo menos uma letra maiúscula');
        }
        if (!numbers.test(password)) {
            errors.push('conter pelo menos um número');
        }
    
        return errors.length > 0 ? `A senha deve ${errors.join(', ')}.` : '';
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
                newErrors[field] = ''; // Limpa erro se o campo não estiver vazio
            }
        });
    
        setErrors(newErrors);
    
        if (hasError) {
            return; // Impede o envio do formulário se houver erros
        }

        verifyData();
    };

    const verifyData = async () => {
        //const response = await api.put('/api/auth/generateAuthToken');
        await api.post('/api/client/', {
            nic: formData.nic, 
            nif: formData.nif, 
            birthDate: formData.birthDate, 
            gender: formData.gender, 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone, 
            adress: null,
            latitude: null,
            longitude: null,
        })
        .then(async response => {
            if(response.data.errorTag){
                let newErrors = { ...errors };
                newErrors[response.data.errorTag] = 'Já existe um utilizador com este ' + response.data.errorTag;
                setErrors(newErrors);
            }

            await api.post('/api/auth/register', {email: formData.email, password: formData.password});
            setShowToast(true);
        })
        .catch(error => {})
    }


    const handleChange = (e) => {
        // Guarda o valor do input
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Avalia se o valor do input está válido
        let newErrors = { ...errors };

        // Verifica campos se os campos estão vazios ou inválidos
        if (!value) {
            newErrors[name] = 'Este campo é obrigatório';
        } else if (name === 'email') {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
                newErrors[name] = 'O email deve ser válido';
            }else{
                newErrors[name] = '';
            }
        } else if (name === 'password') {
            newErrors[name] = validatePassword(value);
        } else {
            newErrors[name] = ''; // Limpa erro se o campo não estiver vazio
        }

        setErrors(newErrors);
    };

    
  return (
    <div className='bg-success w-100 p-md-5 p-3 rounded' >
        <h1>
            Register
        </h1>
        <Form onSubmit={handleSubmit} >

            {/* Name */}
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter your full name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>

            <Row>
                <Col>
                    {/* Gender */}
                    <Form.Group className="mb-3" controlId="formBasicGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control 
                            as="select" 
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            isInvalid={!!errors.gender}
                        >
                            <option value="">Choose your gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.gender}
                        </Form.Control.Feedback>
                    </Form.Group>

                </Col>

                <Col>
                    {/* Date of Birth */}
                    <Form.Group className="mb-3" controlId="formBasicbirthDate">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control 
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            isInvalid={!!errors.birthDate}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.birthDate}
                        </Form.Control.Feedback>
                    </Form.Group>

                </Col>
            </Row>




            <Row>
                <Col md={6} xs={12}>
                    {/* NIC (City Card Number) */}
                    <Form.Group className="mb-3" controlId="formBasicNIC">
                        <Form.Label>NIC (City Card Number)</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter your NIC" 
                            name="nic" 
                            value={formData.nic} 
                            onChange={handleChange} 
                            isInvalid={!!errors.nic}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.nic}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>


                <Col md={6} xs={12}>
                    {/* NIF */}
                    <Form.Group className="mb-3" controlId="formBasicNIF">
                        <Form.Label>NIF</Form.Label>
                        <Form.Control 
                            type="number" 
                            maxLength="9"
                            placeholder="Enter your NIF" 
                            name="nif" 
                            value={formData.nif} 
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setFormData({ ...formData, nif: value });
                                if (value.length < 9) {
                                    errors[e.target.name] = 'Este campo deve ter 9 dígitos!';
                                }else{
                                    errors[e.target.name] = '';
                                }
                            }}  
                            isInvalid={!!errors.nif}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.nif}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

            </Row>




            {/* Phone Number */}
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                    type="text" 
                    maxLength="9"
                    placeholder="Enter your phone number" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, phone: value });
                        if (value.length < 9) {
                            errors[e.target.name] = 'Este campo deve ter 9 dígitos!';
                        }else{
                            errors[e.target.name] = '';
                        }
                    }} 
                    isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.phone}
                </Form.Control.Feedback>
            </Form.Group>


            {/* Email */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
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

            {/* Password */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter your password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>
                    
            <Button 
            type="submit"
            className='w-100 bg-warning rounded-pill'
            >
                Register
            </Button>

        </Form>
        <div className='d-flex flex-align-items justify-content-end m-2'>
            <p>Already a member? </p>
            <Link to='/login'>Sign in</Link>
        </div>

    </div>
   
  )
}
