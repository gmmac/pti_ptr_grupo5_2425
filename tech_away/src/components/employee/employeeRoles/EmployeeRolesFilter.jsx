// src/components/employee/employeeRoles/EmployeeRolesFilter.jsx
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Accordion, Row, Col } from 'react-bootstrap';

export default function EmployeeRolesFilter({ filters, onFilterChange, resetFilter }) {
  const [localFilters, setLocalFilters] = useState({ role: '' });

  // Sync with parent filters on external change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Reset when resetFilter toggles
  useEffect(() => {
    if (resetFilter) {
      const cleared = { role: '' };
      setLocalFilters(cleared);
      onFilterChange(cleared);
    }
  }, [resetFilter, onFilterChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const handleClear = () => {
    const cleared = { role: '' };
    setLocalFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <Container className="my-4">
      <Accordion className="shadow-sm">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Show Filters</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="gy-3">
                <Col xs={12} md={4}>
                  <Form.Group controlId="filterRole">
                    <Form.Label>Role Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="role"
                      placeholder="Role name"
                      value={localFilters.role}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="d-flex align-items-center justify-content-center">
                <Col xs={12} md={6} lg={4} className="mt-3 mt-md-4">
                  <Button
                    style={{ backgroundColor: '#b5a8c9', color: 'white', border: 'none' }}
                    type="submit"
                    className="w-100 rounded-pill"
                  >
                    Apply Filters
                  </Button>
                </Col>
                <Col xs={12} md={6} lg={4} className="mt-2 mt-md-4">
                  <Button
                    style={{ backgroundColor: '#708c7e', color: 'white', border: 'none' }}
                    className="w-100 rounded-pill"
                    onClick={handleClear}
                  >
                    Clear Filters
                  </Button>
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
