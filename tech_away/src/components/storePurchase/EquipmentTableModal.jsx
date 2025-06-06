import { Button, Table } from "react-bootstrap";
export default function EquipmentTableModal({equipments, selectedEquipment, handleEquipmentSelection}) {
  return (
    <Table responsive="sm" striped bordered hover className="d-none d-lg-table">
      <thead>
        <tr>
          <th>Barcode</th>
          <th>Model</th>
          <th>Type</th>
          <th>Fixed Price</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {equipments.map((equipment) => (
          <tr key={equipment.Barcode}>
            <td>{equipment.Barcode}</td>
            <td>{equipment.Brand.name + " " + equipment.EquipmentModel.name}</td>
            <td>{equipment.EquipmentType.name}</td>
            <td>{equipment.EquipmentModel.sheetPrice} €</td>
            <td>
              <Button
                style={{
                  backgroundColor: selectedEquipment === equipment.Barcode ? '#708c7e' : '#b5a8c9',
                  color: 'white',
                  border: 'none'
                }}
                onClick={() => handleEquipmentSelection(equipment)}
              >
                {selectedEquipment === equipment.Barcode ? "Deselect" : "Select"}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
