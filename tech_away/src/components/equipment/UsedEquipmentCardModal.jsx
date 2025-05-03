import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function UsedEquipmentCardModal({usedEquipment, selectedUsedEquipment, handleUsedEquipmentSelection}) {
  return (
    <Card className="mb-3 d-lg-none">
        <Card.Body>
        <Card.Title>Used Equipment Info</Card.Title>
        <Card.Text>
            <strong>ID:</strong> {usedEquipment.id}<br />
            <strong>Price:</strong> {usedEquipment.price}<br />
            <strong>Equipment Sheet ID:</strong> {usedEquipment.equipmentId}<br />
            <strong>Store ID:</strong> {usedEquipment.storeId}<br />
        </Card.Text>
        <Button 
            style={{
              backgroundColor: selectedUsedEquipment === usedEquipment.id ? '#708c7e' : '#b5a8c9',
              color: 'white',
              border: 'none'
            }} 
            variant={selectedUsedEquipment === usedEquipment.id ? "secondary" : "primary"} 
            onClick={() => handleUsedEquipmentSelection(client)}
        >
            {selectedUsedEquipment === usedEquipment.id ? "Deselect" : "Select"}
        </Button>
        </Card.Body>
    </Card>
  )
}
