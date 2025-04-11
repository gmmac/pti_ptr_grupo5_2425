import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function EquipmentCardModal({equipment, selectedEquipment, handleEquipmentSelection}) {
    
  return (
    <Card className="mb-3 d-lg-none">
        <Card.Body>
        <Card.Title>{equipment.EquipmentModel.name}</Card.Title>
        <Card.Text>
            <strong>Barcode:</strong> {equipment.barcode}<br />
            <strong>Model:</strong> {equipment.EquipmentModel.name}<br />
            <strong>Release Year:</strong> {equipment.EquipmentModel.releaseYear}<br />
            <strong>Type:</strong> {equipment.EquipmentType.name}
        </Card.Text>
        <Button 
            style={{
              backgroundColor: selectedEquipment === equipment.barcode ? '#708c7e' : '#b5a8c9',
              color: 'white',
              border: 'none'
            }} 
            variant={selectedEquipment === equipment.barcode ? "secondary" : "primary"} 
            onClick={() => handleEquipmentSelection(equipment)}
        >
            {selectedEquipment === equipment.barcode ? "Deselect" : "Select"}
        </Button>
        </Card.Body>
    </Card>
  )
}
