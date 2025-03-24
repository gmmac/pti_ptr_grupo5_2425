import React from 'react';
import { Card } from 'react-bootstrap';

export default function DashboardStatCard({ value, label }) {
  return (
    <Card className="shadow-sm text-center py-3" style={{ borderRadius: "25px" }}>
      <Card.Body>
        <Card.Title className="fs-2"><strong>{value}</strong></Card.Title>
        <Card.Text className="fs-6">{label}</Card.Text>
      </Card.Body>
    </Card>
  );
}
