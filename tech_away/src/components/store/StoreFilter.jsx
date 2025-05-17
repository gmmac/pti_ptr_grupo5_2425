import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";

export default function StoreFilter({ setFilters }) {
  const [local, setLocal] = useState({ nipc: "", name: "", email: "", address: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, ...local }));
  };

  const handleClear = () => {
    const cleared = { nipc: "", name: "", email: "", address: "" };
    setLocal(cleared);
    setFilters((prev) => ({ ...prev, ...cleared }));
  };

  return (
    <Container className="my-3">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Show Filters</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="gy-3">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>NIPC</Form.Label>
                    <Form.Control
                      type="text"
                      name="nipc"
                      value={local.nipc}
                      onChange={handleChange}
                      placeholder="Search by NIPC"
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Store Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={local.name}
                      onChange={handleChange}
                      placeholder="Search by Name"
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={local.email}
                      onChange={handleChange}
                      placeholder="Search by Email"
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={local.address}
                      onChange={handleChange}
                      placeholder="Search by Address"
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
