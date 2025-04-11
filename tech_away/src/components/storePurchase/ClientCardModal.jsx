import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function ClientCardModal({client, selectedClient, handleClientSelection}) {
  return (
    <Card className="mb-3 d-lg-none">
        <Card.Body>
        <Card.Title>{client.firstName} {client.lastName}</Card.Title>
        <Card.Text>
            <strong>NIC:</strong> {client.nic}<br />
            <strong>Email:</strong> {client.email}<br />
            <strong>Phone:</strong> {client.phone}
        </Card.Text>
        <Button 
            style={{
              backgroundColor: selectedClient === client.nic ? '#708c7e' : '#b5a8c9',
              color: 'white',
              border: 'none'
            }} 
            variant={selectedClient === client.nic ? "secondary" : "primary"} 
            onClick={() => handleClientSelection(client)}
        >
            {selectedClient === client.nic ? "Deselect" : "Select"}
        </Button>
        </Card.Body>
    </Card>
  )
}
