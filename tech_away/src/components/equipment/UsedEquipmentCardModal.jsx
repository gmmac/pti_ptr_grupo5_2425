import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function UsedEquipmentCardModal({ equipment, selectedEquipmentID, handleEquipmentSelection }) {
  return (
    <Card className="mb-3 d-lg-none">
      <Card.Body>
        <Card.Title>ID: {equipment.id}</Card.Title>
        <Card.Text>
          <strong>Barcode:</strong> {equipment.EquipmentSheet.barcode}<br />
          <strong>Model:</strong> {equipment.EquipmentSheet.EquipmentModel.name}<br />
          <strong>Type:</strong> {equipment.EquipmentSheet.EquipmentType.name}
        </Card.Text>
        <Button
          style={{
            backgroundColor: selectedEquipmentID === equipment.id ? '#708c7e' : '#b5a8c9',
            color: 'white',
            border: 'none'
          }}
          variant={selectedEquipmentID === equipment.id ? 'secondary' : 'primary'}
          onClick={() => handleEquipmentSelection(equipment)}
        >
          {selectedEquipmentID === equipment.id ? 'Deselect' : 'Select'}
        </Button>
      </Card.Body>
    </Card>
  );
}
