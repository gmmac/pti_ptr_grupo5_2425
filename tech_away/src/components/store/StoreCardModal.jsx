import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function StoreCardModal({store, selectedStore, handleStoreSelection}) {
  return (
    <Card className="mb-3 d-lg-none">
        <Card.Body>
        <Card.Title>{store.name}</Card.Title>
        <Card.Text>
            <strong>NIPC:</strong> {store.nipc}<br />
            <strong>Email:</strong> {store.email}<br />
            <strong>Address:</strong> {store.address}
        </Card.Text>
        <Button 
            variant={selectedStore === store.nipc ? "secondary" : "primary"} 
            onClick={() => handleStoreSelection(store)}
        >
            {selectedStore === store.nipc ? "Deselect" : "Select"}
        </Button>
        </Card.Body>
    </Card>
  )
}
