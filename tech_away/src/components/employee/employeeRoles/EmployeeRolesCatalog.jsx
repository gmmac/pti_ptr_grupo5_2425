import React, { useEffect, useState } from 'react';
import { ListGroup, Container } from 'react-bootstrap';
import api from '../../../utils/axios';

export default function EmployeeRolesCatalog() {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await api.get("/api/employeeRole");
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching employee roles:', error);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-3 text-center">Employee Roles</h2>
            <ListGroup>
                {roles.length > 0 ? (
                    roles.map((role) => (
                        <ListGroup.Item key={role.id} className="text-center">
                            {role.role}
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item className="text-center text-muted">
                        No employee roles found.
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    );
}