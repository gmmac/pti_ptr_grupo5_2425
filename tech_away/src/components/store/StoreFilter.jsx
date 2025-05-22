import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Accordion, Row, Col } from 'react-bootstrap';

export default function StoreFilter({ filters, onFilterChange, resetFilter }) {
  const [localFilters, setLocalFilters] = useState({
    nipc: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    if (resetFilter) {
      const reset = {
        nipc: '',
        name: '',
        email: '',
        phone: '',
        address: ''
      };
      setLocalFilters(reset);
      onFilterChange(reset);
    }
  }, [resetFilter, onFilterChange]);

  const handleChange = e => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const handleClear = () => {
    const reset = {
      nipc: '',
      name: '',
      email: '',
      phone: '',
      address: ''
    };
    setLocalFilters(reset);
    onFilterChange(reset);
  };

  return (
    <Container className="my-4">
      <Accordion className="shadow-sm">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Show Filters</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="gy-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="filterNipc">
                    <Form.Label>NIPC</Form.Label>
                    <Form.Control
                      type="text"
                      name="nipc"
                      placeholder="NIPC"
                      value={localFilters.nipc}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="filterName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Store name"
                      value={localFilters.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
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
                <Col xs={12} md={6}>
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
                <Col xs={12}>
                  <Form.Group controlId="filterAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={localFilters.address}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="d-flex align-items-center justify-content-center">
                <Col xs={12} md={6} lg={4} className="mt-4">
                  <Button type="submit" className="w-100 rounded-pill" style={{ backgroundColor: '#b5a8c9', color: 'white', border: 'none' }}>
                    Apply Filters
                  </Button>
                </Col>
                <Col xs={12} md={6} lg={4} className="mt-2 mt-md-4">
                  <Button className="w-100 rounded-pill" style={{ backgroundColor: '#708c7e', color: 'white', border: 'none' }} onClick={handleClear}>
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
