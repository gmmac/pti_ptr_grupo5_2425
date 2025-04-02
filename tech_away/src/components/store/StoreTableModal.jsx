import React from 'react'
import { Button, Table } from 'react-bootstrap'

export default function StoreTableModal({ stores, selectedStore, handleStoreSelection }) {
    const rowsToFill = Math.max(0, 4 - stores.length);
  
    return (
      <Table responsive="" striped bordered hover className="d-none d-lg-table mb-0">
        <thead>
          <tr>
            <th>NIPC</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Select Store</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.nipc}>
              <td>{store.nipc}</td>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td className='d-flex justify-content-center'>
                <Button
                  variant={selectedStore === store.nipc ? "secondary" : "primary"}
                  onClick={() => handleStoreSelection(store)}
                >
                  {selectedStore === store.nipc ? "Deselect" : "Select"}
                </Button>
              </td>
            </tr>
          ))}

        </tbody>
      </Table>
    );
  }
  