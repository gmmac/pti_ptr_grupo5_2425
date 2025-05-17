import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";

export default function ProjectFilter({ setFilters }) {
  const [localFilters, setLocalFilters] = useState({
    id: "",
    projectName: "",
    status: "Opened",
    warehouse: "",
    organizerName: "",
    startDate: "",
    completionDate: "",
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
      id: "",
      projectName: "",
      status: "Opened",
      warehouse: "",
      organizerName: "",
      startDate: "",
      completionDate: "",
    };
    setLocalFilters(cleared);
    setFilters(cleared);
  };

  return (
    <Container className="my-4">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Show Project Filters</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="gy-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="filterId">
                    <Form.Label>Project ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="id"
                      placeholder="Enter project ID"
                      value={localFilters.id}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="filterName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="projectName"
                      placeholder="Enter project name"
                      value={localFilters.projectName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="filterWarehouse">
                    <Form.Label>Warehouse</Form.Label>
                    <Form.Control
                      type="text"
                      name="warehouse"
                      placeholder="Enter warehouse name"
                      value={localFilters.warehouse}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="filterOrganizer">
                    <Form.Label>Organizer Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="organizerName"
                      placeholder="Enter organizer name"
                      value={localFilters.organizerName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-4 justify-content-center">
                <Col xs={12} md={3} className="mb-2">
                  <Button
                    type="submit"
                    className="w-100 rounded-pill"
                    style={{
                      backgroundColor: "#b5a8c9",
                      border: "none",
                      color: "white",
                    }}
                  >
                    Apply Filters
                  </Button>
                </Col>
                <Col xs={12} md={3}>
                  <Button
                    onClick={handleClear}
                    className="w-100 rounded-pill"
                    style={{
                      backgroundColor: "#708c7e",
                      border: "none",
                      color: "white",
                    }}
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
