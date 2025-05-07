import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function UsedEquipmentCardModal({equipment, selectedEquipment, handleEquipmentSelection}) {
    
  return (
    <Card className="mb-3 d-lg-none">
        <Card.Body>
        <Card.Title>{equipment.EquipmentSheet.EquipmentModel.name}</Card.Title>
        <Card.Text>
            <strong>Barcode:</strong> {equipment.EquipmentSheet.barcode}<br />
            <strong>Model:</strong> {equipment.EquipmentSheet.EquipmentModel.name}<br />
            <strong>Release Year:</strong> {equipment.EquipmentSheet.EquipmentModel.releaseYear}<br />
            <strong>Type:</strong> {equipment.EquipmentSheet.EquipmentType.name}
        </Card.Text>
        <Button 
            style={{
              backgroundColor: selectedEquipment === equipment.EquipmentSheet.barcode ? '#708c7e' : '#b5a8c9',
              color: 'white',
              border: 'none'
            }} 
            variant={selectedEquipment === equipment.EquipmentSheetbarcode ? "secondary" : "primary"} 
            onClick={() => handleEquipmentSelection(equipment)}
        >
            {selectedEquipment === equipment.EquipmentSheet.barcode ? "Deselect" : "Select"}
        </Button>
        </Card.Body>
    </Card>
  )
}
