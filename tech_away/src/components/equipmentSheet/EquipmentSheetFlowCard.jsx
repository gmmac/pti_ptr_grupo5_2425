import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

export default function EquipmentSheetFlowCard({ element, isSelected, isEditing, onToggle }) {
  return (
    <Card
      onClick={() => isEditing && onToggle(element)}
      className={`shadow-sm border ${isSelected ? 'border-success' : 'border-light'} rounded-sm m-1`}
      style={{ cursor: isEditing ? 'pointer' : 'default', transform: 'none', transition: 'none', }}
    >
    <Card.Body className="d-flex justify-content-between align-items-start p-3">
      <div>
        <Card.Title className="mb-1 fs-6 fw-semibold">
          {element.Brand?.name} {element.EquipmentModel?.name}
        </Card.Title>
        <small className="text-muted d-block">
          {element.EquipmentType?.name}
        </small>
        <div className="small text-muted">{element.Barcode}</div>
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
