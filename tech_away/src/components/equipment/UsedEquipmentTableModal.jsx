import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

export default function UsedEquipmentTableModal({ equipments, selectedEquipmentID, handleEquipmentSelection }) {
  return (
    <Table responsive="sm" striped bordered hover className="d-none d-lg-table">
      <thead>
        <tr>
          <th>ID</th>
          {/* <th>Barcode</th> */}
          <th>Model</th>
          <th>Type</th>
          <th>Store</th>
          <th>Status</th>
          <th>Select Equipment</th>
        </tr>
      </thead>
      <tbody>
        {equipments.map((e) => (
          <tr key={e.id}>
            <td>{e.id}</td>
            {/* <td>{e.EquipmentSheet.barcode}</td> */}
            <td>{e.EquipmentSheet.brandModel}</td>
            <td>{e.EquipmentSheet.EquipmentType.name}</td>
            <td>{e.Store.name}</td>
            <td>{e.EquipmentStatus.state}</td>
            <td>
              <Button
                size="sm"
                style={{
                  backgroundColor: selectedEquipmentID === e.id ? '#708c7e' : '#b5a8c9',
                  color: 'white',
                  border: 'none'
                }}
                variant={selectedEquipmentID === e.id ? 'secondary' : 'primary'}
                onClick={() => handleEquipmentSelection(e)}
              >
                {selectedEquipmentID === e.id ? 'Deselect' : 'Select'}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}