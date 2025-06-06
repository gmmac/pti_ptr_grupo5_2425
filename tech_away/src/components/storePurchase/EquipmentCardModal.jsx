import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function EquipmentCardModal({equipment, selectedEquipment, handleEquipmentSelection}) {
  return (
    <Card className="mb-3 d-lg-none">
      <Card.Body>
        <Card.Title>{equipment.EquipmentModel.name}</Card.Title>
        <Card.Text>
          <strong>Barcode:</strong> {equipment.Barcode}<br />
          <strong>Model:</strong> {equipment.Brand.name} {equipment.EquipmentModel.name}<br />
          <strong>Type:</strong> {equipment.EquipmentType.name}<br />
          <strong>Fixed Price:</strong> {equipment.EquipmentModel.sheetPrice} €
        </Card.Text>
        <Button
          style={{
            backgroundColor: selectedEquipment === equipment.Barcode ? '#708c7e' : '#b5a8c9',
            color: 'white',
            border: 'none'
          }}
          onClick={() => handleEquipmentSelection(equipment)}
        >
          {selectedEquipment === equipment.Barcode ? "Deselect" : "Select"}
        </Button>
      </Card.Body>
    </Card>
  );
}
