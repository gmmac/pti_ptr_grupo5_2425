import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function WarehouseCardModal({ warehouse, selectedWarehouse, handleWarehouseSelection }) {
  return (
    <Card className="mb-3 d-lg-none">
      <Card.Body>
        <Card.Title>{warehouse.name}</Card.Title>
        <Card.Text>
          <strong>ID:</strong> {warehouse.id}<br />
          <strong>Available Slots:</strong> {warehouse.availableSlots} / {warehouse.totalSlots}
        </Card.Text>
        <Button
          variant={selectedWarehouse?.id === warehouse.id ? "secondary" : "primary"}
          onClick={() => handleWarehouseSelection(warehouse)}
        >
          {selectedWarehouse?.id === warehouse.id ? "Deselect" : "Select"}
        </Button>
      </Card.Body>
    </Card>
  );
}
