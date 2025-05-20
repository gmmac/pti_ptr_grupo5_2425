import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default function WarehouseTableModal({
  warehouses,
  selectedWarehouse,
  handleWarehouseSelection
}) {
  // Mantém pelo menos 4 linhas para consistência visual
  const rowsToFill = Math.max(0, 4 - warehouses.length);

  return (
    <Table
      responsive="sm"
      striped
      bordered
      hover
      className="d-none d-lg-table"
    >
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
            <td>
              {warehouse.availableSlots} / {warehouse.totalSlots}
            </td>
            <td className="text-center">
              <Button
                style={{
                  backgroundColor:
                    selectedWarehouse?.id === warehouse.id
                      ? '#708c7e'
                      : '#b5a8c9',
                  color: 'white',
                  border: 'none'
                }}
                onClick={() => handleWarehouseSelection(warehouse)}
              >
                {selectedWarehouse?.id === warehouse.id
                  ? 'Deselect'
                  : 'Select'}
              </Button>
            </td>
          </tr>
        ))}

        {/* Linhas vazias para manter altura mínima de 4 linhas */}
        {Array.from({ length: rowsToFill }).map((_, i) => (
          <tr key={`empty-${i}`}>
            <td colSpan={4} style={{ height: '60px' }} />
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
