import React from 'react'
import { Button, Table } from 'react-bootstrap'

export default function StoreTableModal({stores, selectedStore, handleStoreSelection}) {
  return (
    <Table responsive="sm" striped bordered hover className="d-none d-lg-table">
        <thead>
        <tr>
            <th>NIPC</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Select Store</th>
        </tr>
        </thead>
        <tbody>
        {stores.map((store) => (
            <tr key={store.nipc}>
            <td>{store.nipc}</td>
            <td>{store.name}</td>
            <td>{store.email}</td>
            <td>{store.address}</td>
            <td>
                <Button 
                variant={selectedStore === store.nipc ? "secondary" : "primary"} 
                onClick={() => handleStoreSelection(store)}
                >
                    {selectedStore === store.nipc ? "Deselect" : "Select"}
                </Button>
            </td>
            </tr>
        ))}
        </tbody>
    </Table>
  )
}
