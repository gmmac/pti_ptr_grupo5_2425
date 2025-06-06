import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";

export default function UsedEquipmentFilter({ filters, onFilterChange, resetFilter }) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, resetFilter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const handleClear = () => {
    const cleared = {
      usedEquipmentId: '',
      BrandModel: '',
      EquipmentType: '',
      Store: '',
      Status: '',
      sortField: 'id',
      sortOrder: 'ASC'
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
                <Col xs={12} md={6}>
                  <Form.Group controlId="usedEquipmentId">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="number"
                      name="usedEquipmentId"
                      value={localFilters?.usedEquipmentId}
                      onChange={handleChange}
                      placeholder="Enter ID"
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="BrandModel">
                    <Form.Label>Brand & Model</Form.Label>
                    <Form.Control
                      type="text"
                      name="BrandModel"
                      value={localFilters?.BrandModel}
                      onChange={handleChange}
                      placeholder="Ex: Apple iPhone 15"
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="EquipmentType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="EquipmentType"
                      value={localFilters?.EquipmentType}
                      onChange={handleChange}
                      placeholder="Ex: Smartphone"
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="Store">
                    <Form.Label>Store</Form.Label>
                    <Form.Control
                      type="text"
                      name="Store"
                      value={localFilters?.Store}
                      onChange={handleChange}
                      placeholder="Ex: Loja Lisboa"
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="Status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      type="text"
                      name="Status"
                      value={localFilters?.Status}
                      onChange={handleChange}
                      placeholder="Ex: New"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col xs={12} md={6}>
                  <Button
                    style={{ backgroundColor: '#b5a8c9', border: 'none' }}
                    type="submit"
                    className="w-100 rounded-pill"
                  >
                    Apply Filters
                  </Button>
                </Col>
                <Col xs={12} md={6} className="mt-2 mt-md-0">
                  <Button
                    variant="secondary"
                    className="w-100 rounded-pill"
                    style={{ backgroundColor: '#708c7e', border: 'none' }}
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