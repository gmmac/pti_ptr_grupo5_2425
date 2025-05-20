import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Accordion, Row, Col } from 'react-bootstrap';

export default function EquipmentStatusFilter({ filters, onFilterChange, resetFilter }) {
  const [localFilters, setLocalFilters] = useState({ state: '' });

  useEffect(() => { setLocalFilters(filters); }, [filters]);
  useEffect(() => { if (resetFilter) { setLocalFilters({ state: '' }); onFilterChange({ state: '' }); } }, [resetFilter, onFilterChange]);

  const handleChange = e => setLocalFilters({ ...localFilters, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); onFilterChange(localFilters); };
  const handleClear = () => { setLocalFilters({ state: '' }); onFilterChange({ state: '' }); };

  return (
    <Container className="my-4">
      <Accordion className="shadow-sm">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Show Filters</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="gy-3">
                <Col xs={12} md={4}>
                  <Form.Group controlId="filterState">
                    <Form.Label>Status Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      placeholder="Status name"
                      value={localFilters.state}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="d-flex align-items-center justify-content-center">
                <Col xs={12} md={6} lg={4} className="mt-3 mt-md-4">
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