import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

export default function WarehouseCardView({ warehouses, onEdit, onDelete, isActiveFilter }) {
  const confirmToggle = wh => {
    confirmDialog({
      message: `Are you sure you want to ${isActiveFilter==='1'?'delete':'restore'} "${wh.name}"?`,
      header: 'Confirmation', icon: 'pi pi-exclamation-triangle', accept: () => onDelete(wh)
    });
  };

  return (
    <Row className="g-3 d-lg-none">
      {warehouses.map((wh, idx) => (
        <Col key={idx} xs={12}>
          <Card className="shadow-sm rounded p-3">
            <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
              <Card.Title className="fw-bold text-center">{wh.name}</Card.Title>
              <Card.Text>Total: {wh.totalSlots}, Available: {wh.availableSlots}</Card.Text>
                <div className="d-flex gap-2 flex-column justify-content-center mt-3 w-75">

                {isActiveFilter==='1'&&(
                  <Button icon="pi pi-pencil" label="Edit" className="p-button-rounded p-button-secondary" onClick={()=>onEdit(wh)} style={{ backgroundColor: 'var(--variant-two)', color: 'white', border: 'none' }} />
                )}
                {isActiveFilter==='1'? (
                  <Button icon="pi pi-trash" label="Delete" className="p-button-rounded p-button-danger" onClick={()=>confirmToggle(wh)} style={{ backgroundColor: 'var(--danger)', color: 'white', border: 'none' }} />
                ):(
                  <Button icon="pi pi-history" label="Restore" className="p-button-rounded p-button-success" onClick={()=>confirmToggle(wh)} style={{ backgroundColor: 'var(--valid)', color: 'white', border: 'none' }} />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}