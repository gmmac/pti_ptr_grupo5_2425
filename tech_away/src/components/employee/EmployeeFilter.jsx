// src/components/EmployeeFilter.jsx
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Accordion, Row, Col } from 'react-bootstrap';

export default function EmployeeFilter({ filters, onFilterChange, resetFilter }) {
  // Local state mirrors filters prop
  const [localFilters, setLocalFilters] = useState({
    internNum: '',
    employeeName: '',
    email: '',
    phone: '',
    store: '',
    role: ''
  });

  // Reset when resetFilter toggles
  useEffect(() => {
    if (resetFilter) {
      const cleared = {
        internNum: '',
        employeeName: '',
        email: '',
        phone: '',
        store: '',
        role: ''
      };
      setLocalFilters(cleared);
      onFilterChange(cleared);
    }
  }, [resetFilter, onFilterChange]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };

  // Submit filters
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  // Clear all fields
  const handleClear = () => {
    const cleared = {
      internNum: '',
      employeeName: '',
      email: '',
      phone: '',
      store: '',
      role: ''
    };
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
                  <Form.Group controlId="filterInternNum">
                    <Form.Label>Intern Number</Form.Label>
                    <Form.Control
                      type="number"
                      name="internNum"
                      placeholder="Intern Number"
                      value={localFilters.internNum}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId="filterEmployeeName">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="employeeName"
                      placeholder="Employee Name"
                      value={localFilters.employeeName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId="filterEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={localFilters.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId="filterPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={localFilters.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId="filterstore">
                    <Form.Label>Store Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="store"
                      placeholder="Store Name"
                      value={localFilters.store}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId="filterrole">
                    <Form.Label>Role Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="role"
                      placeholder="Role Name"
                      value={localFilters.role}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className='d-flex align-items-center justify-content-center'>
                  <Col xs={12} md={6} lg={4} className="mt-3 mt-md-4">
                      <Button
                          style={{
                              backgroundColor:'#b5a8c9',
                              color: 'white',
                              border: 'none'
                          }} 
                          variant="primary" type="submit" className="w-100 rounded-pill">
                          Apply Filters
                      </Button>
                  </Col>
                  <Col xs={12} md={6} lg={4} className="mt-2 mt-md-4">
                      <Button 
                          style={{
                              backgroundColor: '#708c7e',
                              color: 'white',
                              border: 'none'
                          }} 
                          variant="secondary" 
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
