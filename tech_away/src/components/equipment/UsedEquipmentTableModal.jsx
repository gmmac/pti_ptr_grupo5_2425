import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

export default function UsedEquipmentTableModal({equipments, selectedEquipment, handleEquipmentSelection}) {

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
            <tr key={equipment.EquipmentSheet.barcode}>
            <td>{equipment.EquipmentSheet.barcode}</td>
            <td>{equipment.EquipmentSheet.EquipmentModel.name}</td>
            <td>{equipment.EquipmentSheet.EquipmentModel.releaseYear}</td>
            <td>{equipment.EquipmentSheet.EquipmentType.name}</td>
            <td>
                <Button 
                style={{
                    backgroundColor: selectedEquipment === equipment.EquipmentSheet.barcode ? '#708c7e' : '#b5a8c9',
                    color: 'white',
                    border: 'none'
                }} 
                variant={selectedEquipment === equipment.EquipmentSheet.barcode ? "secondary" : "primary"} 
                onClick={() => handleEquipmentSelection(equipment)}
                >
                    {selectedEquipment === equipment.EquipmentSheet.barcode ? "Deselect" : "Select"}
                </Button>
            </td>
            </tr>
        ))}
        </tbody>
    </Table>
  )
}
