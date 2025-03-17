import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import api from '../../utils/axios';
// import { useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginFormsEmployee() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        invalidCredentials: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const user = getLoggedUser();
        if (user) {
            navigate("/employee")
        } else{
            sessionStorage.removeItem('selectedTab'); // dá reset da tab atual
            sessionStorage.setItem("selectedTab",'profile'); // dá set por default da tab profile
        }
    }, [])


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
        let newErrors = { ...errors };
        await api.post('/api/auth/login', {
            email: formData.email,
            password: formData.password,
            userType: "employee"
        })
        .then(async response => {
            console.log(response);
            sessionStorage.setItem('user', JSON.stringify(response.data))
            navigate("/employee")
        })
        .catch(error => {
            if(error.status == 403){
                newErrors.invalidCredentials = "Invalid credentials!";
                setErrors(newErrors);
            }else if(error.status == 429){
                newErrors.invalidCredentials = "Too many attempts. Try again later!";
                setErrors(newErrors);
            }
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

    
  return (
    <div className='bg-success w-100 p-md-5 p-3 rounded' >
        <h1>Login</h1>
        <h6>Login to acess your account</h6>

        <Form onSubmit={handleSubmit} >
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

            <Form.Group>
                {errors.invalidCredentials && <p>{errors.invalidCredentials}</p>}
                <Button type="submit"className='w-100 bg-warning rounded-pill'>Login</Button>
            </Form.Group>
        </Form>

    </div>
   
  )
}
