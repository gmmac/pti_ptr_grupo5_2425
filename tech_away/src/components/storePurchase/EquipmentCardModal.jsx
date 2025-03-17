import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function EquipmentCardModal({equipment, selectedEquipment, handleEquipmentSelection}) {
  return (
    <Card className="mb-3 d-lg-none">
        <Card.Body>
        <Card.Title>{equipment.model}</Card.Title>
        <Card.Text>
            <strong>Barcode:</strong> {equipment.barcode}<br />
            <strong>Model:</strong> {equipment.model}<br />
            <strong>Release Year:</strong> {equipment.releaseYear}<br />
            <strong>Type:</strong> {equipment.type}
        </Card.Text>
        <Button 
            variant={selectedEquipment === equipment.barcode ? "secondary" : "primary"} 
            onClick={() => handleEquipmentSelection(equipment)}
        >
            {selectedEquipment === equipment.barcode ? "Deselect" : "Select"}
        </Button>
        </Card.Body>
    </Card>
  )
}
