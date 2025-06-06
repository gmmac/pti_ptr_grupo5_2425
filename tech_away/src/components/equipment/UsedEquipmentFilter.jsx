import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";

export default function UsedEquipmentFilter({ setFilters }) {
  const [localFilters, setLocalFilters] = useState({
    usedEquipmentId: '',
    Barcode: '',
    BrandModel: '',
    EquipmentType: '',
    sortField: 'id',
    sortOrder: 'ASC'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters(localFilters);
  };

  const handleClear = () => {
    const cleared = {
      usedEquipmentId: '',
      Barcode: '',
      BrandModel: '',
      EquipmentType: '',
      sortField: 'id',
      sortOrder: 'ASC'
    };
    setLocalFilters(cleared);
    setFilters(cleared);
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
                    <Form.Label>Used Equipment ID</Form.Label>
                    <Form.Control
                      type="number"
                      name="usedEquipmentId"
                      value={localFilters.usedEquipmentId}
                      onChange={handleChange}
                      placeholder="Enter ID"
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="Barcode">
                    <Form.Label>Barcode</Form.Label>
                    <Form.Control
                      type="text"
                      name="Barcode"
                      value={localFilters.Barcode}
                      onChange={handleChange}
                      placeholder="Enter Barcode"
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="BrandModel">
                    <Form.Label>Model (Brand + Model)</Form.Label>
                    <Form.Control
                      type="text"
                      name="BrandModel"
                      value={localFilters.BrandModel}
                      onChange={handleChange}
                      placeholder="Enter Brand Model"
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="EquipmentType">
                    <Form.Label>Equipment Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="EquipmentType"
                      value={localFilters.EquipmentType}
                      onChange={handleChange}
                      placeholder="Enter Type"
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
