import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../utils/axios';

export default function CreateEmployeeRole() {
    const [formData, setFormData] = useState({
        role: ''
    });

    const [errors, setErrors] = useState({
        role: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = { ...errors };
        let hasError = false;

        if (!formData.role) {
            newErrors.role = 'Este campo é obrigatório';
            hasError = true;
        } else {
            newErrors.role = '';
        }

        setErrors(newErrors);

        if (hasError) {
            return;
        }

        saveRole();
    };

    const saveRole = async () => {
        let newErrors = { ...errors };
        await api.post('/api/employee-roles', { role: formData.role })
            .then(response => {
                console.log(response);
                alert('Role created successfully!');
                setFormData({ role: '' });
            })
            .catch(error => {
                if (error.response?.status === 400) {
                    newErrors.role = 'Role already exists!';
                    setErrors(newErrors);
                } else {
                    alert('An error occurred! Please try again.');
                }
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        let newErrors = { ...errors };
        newErrors[name] = value ? '' : 'Este campo é obrigatório';
        setErrors(newErrors);
    };

    return (
        <div className='bg-primary w-100 p-md-5 p-3 rounded'>
            <h1>Create Employee Role</h1>
            <h6>Define a new role for employees</h6>

            <Form onSubmit={handleSubmit}>
                {/* Role */}
                <Form.Group className="mb-3" controlId="formBasicRole">
                    <Form.Label>Role Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter role name" 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange} 
                        isInvalid={!!errors.role}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.role}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className='w-100 bg-success rounded-pill'>Create Role</Button>
            </Form>
        </div>
    );
}
