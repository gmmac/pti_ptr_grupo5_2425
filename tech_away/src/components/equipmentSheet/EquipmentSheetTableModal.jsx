import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default function EquipmentSheetTableModal({
  equipmentSheets,
  selectedBarcode,
  handleEquipmentSheetSelection
}) {
  return (
    <Table responsive="sm" striped bordered hover className="d-none d-lg-table">
      <thead>
        <tr>
          <th>Barcode</th>
          <th>Model</th>
          <th>Type</th>
          {/* <th>Status</th> */}
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {equipmentSheets.map((sheet) => (
          <tr key={sheet.Barcode}>
            <td>{sheet.Barcode}</td>
            <td>{sheet.EquipmentModel?.name}</td>
            <td>{sheet.EquipmentType?.name}</td>
            {/* <td>{sheet.isActive === 'Y' ? 'Active' : 'Inactive'}</td> */}
            <td>
              <Button
                size="sm"
                style={{
                  backgroundColor: selectedBarcode === sheet.Barcode ? '#708c7e' : '#b5a8c9',
                  color: 'white',
                  border: 'none'
                }}
                variant={selectedBarcode === sheet.Barcode ? 'secondary' : 'primary'}
                onClick={() => handleEquipmentSheetSelection(sheet)}
              >
                {selectedBarcode === sheet.Barcode ? 'Deselect' : 'Select'}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
