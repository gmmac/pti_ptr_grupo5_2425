// src/components/dashboard/DashboardVerticalSection.jsx
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import GenerateReport from '../../reports/GenerateReport';

export default function DashboardVerticalSection() {
  return (
    <Card
      className="shadow-sm h-100"
      style={{
        borderRadius: '2rem',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Card.Header
        className="d-flex align-items-center justify-content-between"
        style={{
          backgroundColor: '#F7F7FA',
          borderBottom: 'none',
          padding: '1rem 1.5rem',
          borderRadius: '2rem 2rem 0 0',
        }}
      >
        <h5 className="mb-0" style={{ fontWeight: 600, fontSize: '1.25rem' }}>
          Reports
        </h5>
      </Card.Header>
      <Card.Body style={{ padding: '1.5rem' }}>
        <Row className="gx-3 gy-3 align-items-center">
            <GenerateReport />
        </Row>
      </Card.Body>
    </Card>
  );
}