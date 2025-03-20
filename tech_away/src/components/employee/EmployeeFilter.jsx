import React, { useState } from 'react';
import { Form, Button, Container, Accordion, Row, Col } from 'react-bootstrap';

export default function EmployeeFilter({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [errors, setErrors] = useState({}); // Estado para armazenar erros

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validações
    let newErrors = { ...errors };

    if (name === "internNum") {
      if (!/^\d*$/.test(value)) {
        newErrors[name] = "Intern Number must contain only numbers.";
      } else {
        delete newErrors[name];
      }
    }

    setLocalFilters((prev) => ({ ...prev, [name]: value }));
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verifica se há erros antes de aplicar os filtros
    if (Object.keys(errors).length === 0) {
      onFilterChange(localFilters);
    }
  };

  const handleClear = () => {
    const clearedFilters = {
      name: "",
      nic: "",
      nif: "",
      internNum: "",
      storeNIPC: "",
      email: "",
      phone: "",
      role: "",
      gender: ""
    };
    setLocalFilters(clearedFilters);
    setErrors({});
    onFilterChange(clearedFilters);
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
                  <Form.Group controlId="filterName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name" 
                      value={localFilters.name} 
                      onChange={handleChange} 
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="filterInternNum">
                    <Form.Label>Intern Number</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="internNum" 
                      value={localFilters.internNum} 
                      onChange={handleChange} 
                      isInvalid={!!errors.internNum}
                    />
                    <Form.Control.Feedback type="invalid">{errors.internNum}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="filterStoreNIPC">
                    <Form.Label>Store NIPC</Form.Label>
                    <Form.Control type="text" name="storeNIPC" value={localFilters.storeNIPC} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="filterEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" value={localFilters.email} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="filterPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" value={localFilters.phone} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row className='d-flex align-items-center justify-content-center mt-3'>
                <Col xs={12} md={6} lg={4}>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 rounded-pill" 
                    disabled={Object.keys(errors).length > 0} // Desabilita se houver erros
                  >
                    Apply Filters
                  </Button>
                </Col>
                <Col xs={12} md={6} lg={4} className="mt-2 mt-md-0">
                  <Button 
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
