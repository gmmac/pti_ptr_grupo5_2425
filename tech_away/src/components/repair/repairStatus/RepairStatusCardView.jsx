import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

export default function RepairStatusCardView({ statuses, onEdit, onDelete, isActiveFilter }) {
  const confirmToggle = status => {
    confirmDialog({
      message: `Are you sure you want to ${isActiveFilter === '1' ? 'delete' : 'restore'} the "${status.state}" status?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => onDelete(status)
    });
  };

  return (
    <Row className="g-3 d-lg-none">
      {statuses.map((status, idx) => (
        <Col key={idx} xs={12}>
          <Card className="shadow-sm rounded p-3">
            <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
              <Card.Title className="fw-bold text-center">
                {status.state}
              </Card.Title>
              <div className="d-flex gap-2 flex-column justify-content-center mt-3 w-75">
                <Button
                  icon="pi pi-pencil"
                  label="Edit"
                  className="p-button-rounded p-button-secondary"
                  onClick={() => onEdit(status)}
                  style={{ backgroundColor: 'var(--variant-two)', color: 'white', border: 'none' }}
                />
                {isActiveFilter === '1' ? (
                  <Button
                    icon="pi pi-trash"
                    label="Delete"
                    className="p-button-rounded p-button-danger"
                    onClick={() => confirmToggle(status)}
                    style={{ backgroundColor: 'var(--danger)', color: 'white', border: 'none' }}
                  />
                ) : (
                  <Button
                    icon="pi pi-history"
                    label="Restore"
                    className="p-button-rounded p-button-success"
                    onClick={() => confirmToggle(status)}
                    style={{ backgroundColor: 'var(--valid)', color: 'white', border: 'none' }}
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}