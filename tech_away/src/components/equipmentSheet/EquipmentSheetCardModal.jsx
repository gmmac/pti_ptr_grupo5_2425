import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function EquipmentSheetCardModal({ 
    sheet, selectedBarcode, handleEquipmentSheetSelection
 }) {
  return (
    <Card className="mb-3 d-lg-none">
      <Card.Body>
        <Card.Title>Equipment Sheet</Card.Title>
        <Card.Text>
          <strong>Barcode:</strong> {sheet.Barcode}<br />
          <strong>Model:</strong> {sheet.EquipmentModel?.name}<br />
          <strong>Type:</strong> {sheet.EquipmentType?.name}<br />
        </Card.Text>
        <Button
          style={{
            backgroundColor: selectedBarcode === sheet.Barcode ? '#708c7e' : '#b5a8c9',
            color: 'white',
            border: 'none'
          }}
          variant={selectedBarcode === sheet.Barcode ? 'secondary' : 'primary'}
          onClick={() =>
            handleEquipmentSheetSelection(
              selectedBarcode === sheet.Barcode ? null : sheet
            )
          }
        >
          {selectedBarcode === sheet.Barcode ? 'Deselect' : 'Select'}
        </Button>
      </Card.Body>
    </Card>
  );
}
