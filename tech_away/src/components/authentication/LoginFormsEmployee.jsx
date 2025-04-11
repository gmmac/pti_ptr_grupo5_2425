import { useNavigate } from 'react-router-dom';
import { useAuthEmployee } from '../../contexts/AuthenticationProviders/EmployeeAuthProvider';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function LoginFormsEmployee() {
    const { isEmployeeLoggedIn, loginAction, employee } = useAuthEmployee();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '', invalidCredentials: '' });

    const navigate = useNavigate();

    useEffect(() => {
        if (isEmployeeLoggedIn()) {
            navigate("/employee");
        }
    }, [employee]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = { ...errors };
        let hasError = false;

        Object.keys(formData).forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'Este campo é obrigatório';
                hasError = true;
            } else {
                newErrors[field] = '';
            }
        });

        setErrors(newErrors);

        if (hasError) return;

        await loginAction(formData, setErrors, newErrors);

        sessionStorage.removeItem('employeeSelectedTab');
        sessionStorage.setItem("employeeSelectedTab", 'dashboard');

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        let newErrors = { ...errors };
        if (!value) {
            newErrors[name] = 'Este campo é obrigatório';
        } else if (name === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            newErrors[name] = emailPattern.test(value) ? '' : 'O email deve ser válido';
        } else {
            newErrors[name] = '';
        }

        setErrors(newErrors);
    };

    return (
        <div className='bg-white w-100 p-md-5 p-3 rounded-lg shadow-lg'>
            <h1>Employee Login</h1>
            <h6>Login to access your account</h6>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className='auth-input'
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className='auth-input'
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    {errors.invalidCredentials && <p className="text-danger">{errors.invalidCredentials}</p>}
                    <Button type="submit" className='w-100 forms-btn rounded-pill'>Login</Button>
                </Form.Group>
            </Form>
        </div>
    );
}
