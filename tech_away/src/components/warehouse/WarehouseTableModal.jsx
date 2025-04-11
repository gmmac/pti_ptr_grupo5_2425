import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default function WarehouseTableModal({ warehouses, selectedWarehouse, handleWarehouseSelection }) {
  const rowsToFill = Math.max(0, 4 - warehouses.length);

  return (
    <Table responsive striped bordered hover className="d-none d-lg-table mb-0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Available Slots</th>
          <th>Select Warehouse</th>
        </tr>
      </thead>
      <tbody>
        {warehouses.map((warehouse) => (
          <tr key={warehouse.id}>
            <td>{warehouse.id}</td>
            <td>{warehouse.name}</td>
            <td>{warehouse.availableSlots} / {warehouse.totalSlots}</td>
            <td className="d-flex justify-content-center">
              <Button
                variant={selectedWarehouse?.id === warehouse.id ? "secondary" : "primary"}
                onClick={() => handleWarehouseSelection(warehouse)}
              >
                {selectedWarehouse?.id === warehouse.id ? "Deselect" : "Select"}
              </Button>
            </td>
          </tr>
        ))}

        {/* Empty rows for layout consistency */}
        {Array.from({ length: rowsToFill }).map((_, i) => (
          <tr key={`empty-${i}`}>
            <td colSpan={4} style={{ height: '60px' }}></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
