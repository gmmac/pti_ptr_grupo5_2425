import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

export default function StoreCardView({ stores, onEdit, onDelete, isActiveFilter }) {
  const confirmToggle = store => {
    confirmDialog({
      message: `Are you sure you want to ${isActiveFilter === '1' ? 'delete' : 'restore'} "${store.name}"?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => onDelete(store)
    });
  };

  return (
    <Row className="g-3 d-lg-none">
      {stores.map((store, idx) => (
        <Col key={idx} xs={12}>
          <Card className="shadow-sm rounded p-3">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <Card.Title className="fw-bold text-center">{store.name}</Card.Title>
              <Card.Text className="text-center">
                <div><strong>NIPC:</strong> {store.nipc}</div>
                <div><strong>Email:</strong> {store.email}</div>
                <div><strong>Phone:</strong> {store.phone}</div>
                <div><strong>Opens:</strong> {store.openTime} | <strong>Closes:</strong> {store.closeTime}</div>
                <div><strong>Address:</strong> {store.address}</div>
              </Card.Text>
              <div className="d-flex gap-2 flex-column justify-content-center mt-3 w-75">
                {isActiveFilter === '1' && (
                  <Button icon="pi pi-pencil" label="Edit" className="p-button-rounded p-button-secondary"
                    onClick={() => onEdit(store)} style={{ backgroundColor: 'var(--variant-two)', color: 'white', border: 'none' }} />
                )}
                {isActiveFilter === '1' ? (
                  <Button icon="pi pi-trash" label="Delete" className="p-button-rounded p-button-danger"
                    onClick={() => confirmToggle(store)} style={{ backgroundColor: 'var(--danger)', color: 'white', border: 'none' }} />
                ) : (
                  <Button icon="pi pi-history" label="Restore" className="p-button-rounded p-button-success"
                    onClick={() => confirmToggle(store)} style={{ backgroundColor: 'var(--valid)', color: 'white', border: 'none' }} />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
