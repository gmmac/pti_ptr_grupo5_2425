import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function EquipmentTypeCard({ element, isSelected, isEditing, onToggle }) {
  return (
    <Card
      onClick={() => isEditing && onToggle(element)}
      className={`shadow-sm border ${isSelected ? 'border-success' : 'border-light'} rounded-sm`}
      style={{ cursor: isEditing ? 'pointer' : 'default', transition: '0.2s' }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center px-3 py-2">
        <div>
          <Card.Title className="mb-0 fs-6 fw-semibold">{element.name}</Card.Title>
          <small className="text-muted">ID: {element.id}</small>
        </div>
        {isEditing && isSelected && (
          <Button
            size="sm"
            variant="light"
            className="text-danger fw-bold"
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
