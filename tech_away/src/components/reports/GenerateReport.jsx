// src/components/reports/GenerateReport.jsx
import React, { useEffect, useState } from "react";
import { Card, Form, Button, Spinner, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import toCamelCase from "../../utils/camelCaseString";

export default function GenerateReport() {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/reportType")
      .then(({ data }) => {
        setTypes(data);
        if (data.length) setSelectedType(data[0]);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load report types.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleView = () => {
    if (!selectedType) return;
    navigate(`reports/${toCamelCase(selectedType)}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="grow" role="status" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-3">{error}</Alert>;
  }

  return (
        <Form>
          <Row className="g-3">
            <Col xs={12} md={8} lg={12} >
              <Form.Label className="fw-medium">Select a Report Type</Form.Label>
              <Form.Select
                size="lg"
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="rounded-pill w-100"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={4} lg={12} className="d-grid">
              <Button
                size="lg"
                style={{backgroundColor: "#708c7e", border: "0px"}}
                className=""
                onClick={handleView}
                disabled={!selectedType}
              >
                Generate Report
              </Button>
            </Col>
          </Row>
         </Form>
  );
}