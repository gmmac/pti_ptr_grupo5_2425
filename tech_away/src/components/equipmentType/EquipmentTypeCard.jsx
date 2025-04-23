import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

export default function EquipmentTypeCard({ element, isSelected, isEditing, onToggle }) {
  return (
<Card
  onClick={() => isEditing && onToggle(element)}
  className={`border-0 shadow-sm ${isSelected ? 'ring ring-success' : ''} rounded-3`}
  style={{
    cursor: isEditing ? 'pointer' : 'default',
    transition: '0.3s',
    backgroundColor: isSelected ? '#e6f4ea' : '#fff',
  }}
>
  <Card.Body className="d-flex justify-content-between align-items-start p-3">
    <div>
      <Card.Title className="mb-1 fs-6 fw-semibold text-capitalize">
        {element.name} - {element.quantity}
      </Card.Title>
      <small className="text-muted">ID: {element.id}</small>
    </div>
    {isEditing && isSelected && (
      <Button
        size="sm"
        variant="light"
        className="text-danger fw-bold p-1"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(element);
        }}
      >
        ✕
      </Button>
    )}
  </Card.Body>
</Card>

  );
}
