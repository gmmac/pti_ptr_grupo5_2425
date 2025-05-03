import React from 'react'
import { Button, Table } from 'react-bootstrap'

export default function UsedEquipmentTableModal({usedEquipments, selectedUsedEquipment, handleUsedEquipmentSelection}) {
  return (
    <Table responsive="sm" striped bordered hover className="d-none d-lg-table">
        <thead>
        <tr>
            <th>ID</th>
            <th>Price</th>
            <th>Equipment Sheet ID</th>
            <th>Store ID</th>
            <th>Select Equipment</th>
        </tr>
        </thead>
        <tbody>
        {usedEquipments.map((usedEquipment) => (
            <tr key={usedEquipment.id}>
            <td>{usedEquipment.id}</td>
            <td>{usedEquipment.price}</td>
            <td>{usedEquipment.equipmentId}</td>
            <td>{usedEquipment.storeId}</td>
            <td>
                <Button 
                style={{
                    backgroundColor: selectedUsedEquipment === usedEquipment.id ? '#708c7e' : '#b5a8c9',
                    color: 'white',
                    border: 'none'
                }} 
                variant={selectedUsedEquipment === usedEquipment.id ? "secondary" : "primary"} 
                onClick={() => handleUsedEquipmentSelection(usedEquipment)}
                >
                    {selectedUsedEquipment === usedEquipment.id ? "Deselect" : "Select"}
                </Button>
            </td>
            </tr>
        ))}
        </tbody>
    </Table>
  )
}
