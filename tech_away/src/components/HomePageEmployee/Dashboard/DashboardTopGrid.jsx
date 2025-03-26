import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DashboardStatCard from './DashboardStatCard';

export default function DashboardTopGrid() {
  return (
    <Row className="mb-4 justify-content-center g-4">
      <Col xs={12} sm={10} md={6} lg={4} className="mb-3">
        <DashboardStatCard value="54" label="Saved Products" />
      </Col>
      <Col xs={12} sm={10} md={6} lg={4} className="mb-3">
        <DashboardStatCard value="472" label="Products in Stock" />
      </Col>
      <Col xs={12} sm={10} md={6} lg={4} className="mb-3">
        <DashboardStatCard value="324" label="Sales" />
      </Col>
    </Row>
  );
}
