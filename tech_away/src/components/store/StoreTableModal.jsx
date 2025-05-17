import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default function StoreTableModal({ stores, selectedStore, handleStoreSelection }) {
  return (
    <Table striped bordered hover className="d-none d-lg-table mb-3">
      <thead>
        <tr>
          <th>NIPC</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {stores.map((s) => (
          <tr key={s.nipc}>
            <td>{s.nipc}</td>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>{s.address}</td>
            <td className="text-center">
              <Button
                style={{
                  backgroundColor: selectedStore === s.nipc ? '#708c7e' : '#b5a8c9',
                  color: 'white',
                  border: 'none'
                }} 
                variant={selectedStore === s.nipc ? 'secondary' : 'primary'}
                onClick={() => handleStoreSelection(s)}
              >
                {selectedStore === s.nipc ? 'Deselect' : 'Select'}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}