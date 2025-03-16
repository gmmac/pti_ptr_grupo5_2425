import React from 'react'
import { Button, Table } from 'react-bootstrap'

export default function ClientTableModal({clients, selectedClient, handleClientSelection}) {
  return (
    <Table responsive="sm" striped bordered hover className="d-none d-lg-table">
        <thead>
        <tr>
            <th>NIC</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Select Client</th>
        </tr>
        </thead>
        <tbody>
        {clients.map((client) => (
            <tr key={client.nic}>
            <td>{client.nic}</td>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <Button 
                variant={selectedClient === client.nic ? "secondary" : "primary"} 
                onClick={() => handleClientSelection(client)}
                >
                    {selectedClient === client.nic ? "Deselect" : "Select"}
                </Button>
            </td>
            </tr>
        ))}
        </tbody>
    </Table>
  )
}
