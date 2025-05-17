// src/components/EmployeeRolesCardView.jsx
import React, { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

export default function EmployeeRolesCardView({ roles, onEdit, onDelete, isActiveFilter }) {
    
  const confirmToggle = (role) => {
    confirmDialog({
      message: `Are you sure you want to ${isActiveFilter == "1" ? 'delete' : 'restore'} the "${role.role}" role?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => onDelete(role),
    });
  };

  return (
    <>
      <Row className="g-3 d-lg-none">
        {roles.map((role, idx) => (
          <Col key={idx} xs={12}>
            <Card className="shadow-sm rounded p-3">
              <Card.Body>
                <Card.Title className="fw-bold text-center">
                  {role.role}
                </Card.Title>
                <div className="d-flex gap-2 justify-content-center mt-3">
                  {role.protected ? (
                    <Button
                      icon="pi pi-lock"
                      label="Protected"
                      className="p-button-rounded"
                      aria-label="Protected"
                      style={{ backgroundColor: '#6b7280', color: 'white', border: 'none' }}
                      disabled
                    />
                  ) : (
                    <>
                      <Button
                        icon="pi pi-pencil"
                        label="Edit"
                        className="p-button-rounded p-button-secondary"
                        aria-label="Edit"
                        style={{ backgroundColor: 'var(--variant-two)', color: 'white', border: 'none' }}
                        onClick={() => onEdit(role)}
                      />
                      {isActiveFilter == "1" ? (
                        <Button
                          icon="pi pi-trash"
                          label="Delete"
                          className="p-button-rounded p-button-danger"
                          aria-label="Delete"
                          style={{ backgroundColor: 'var(--danger)', color: 'white', border: 'none' }}
                          onClick={() => confirmToggle(role)}
                        />
                      ) : (
                        <Button
                          icon="pi pi-history"
                          label="Restore"
                          className="p-button-rounded p-button-success"
                          aria-label="Restore"
                          style={{ backgroundColor: 'var(--valid)', color: 'white', border: 'none' }}
                          onClick={() => confirmToggle(role)}
                        />
                      )}
                    </>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
