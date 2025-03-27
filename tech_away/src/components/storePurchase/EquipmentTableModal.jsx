import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

export default function EquipmentTableModal({equipments, selectedEquipment, handleEquipmentSelection}) {

  return (
    <Table responsive="sm" striped bordered hover className="d-none d-lg-table">
        <thead>
        <tr>
            <th>Barcode</th>
            <th>Model</th>
            <th>Release Year</th>
            <th>Type</th>
        </tr>
        </thead>
        <tbody>
        {equipments.map((equipment) => (
            <tr key={equipment.barcode}>
            <td>{equipment.barcode}</td>
            <td>{equipment.EquipmentModel.name}</td>
            <td>{equipment.EquipmentModel.releaseYear}</td>
            <td>{equipment.EquipmentType.name}</td>
            <td>
                <Button 
                variant={selectedEquipment === equipment.barcode ? "secondary" : "primary"} 
                onClick={() => handleEquipmentSelection(equipment)}
                >
                    {selectedEquipment === equipment.barcode ? "Deselect" : "Select"}
                </Button>
            </td>
            </tr>
        ))}
        </tbody>
    </Table>
  )
}
