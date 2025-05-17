// src/components/EmployeeCardView.jsx
import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

export default function EmployeeCardView({ employees, onEdit, isActiveFilter, onDelete }) {
  const [selectedObj, setSelectedObj] = useState(null);

  const confirmDelete = (id) => {
    confirmDialog({
      message: `Are you sure you want to ${isActiveFilter === "1" ? "delete" : "restore"} this Employee?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => onDelete(id),
    });
  };

  const handleEditClick = (item) => {
    setSelectedObj(item);
    onEdit(item);
  };

  return (
    <Row className="g-3 d-lg-none">
      {employees.map((employee, index) => (
        <Col key={index} xs={12}>
          <Card className="shadow-sm rounded p-3">
            <Card.Body>
              <Card.Title className="fw-bold">
                {employee.employeeName}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {employee.roleName}
              </Card.Subtitle>
              <Card.Text>
                <strong>Intern Number:</strong> {employee.internNum}
                <br />
                <strong>Store NIPC:</strong> {employee.storeName}
                <br />
                <strong>Email:</strong> {employee.email}
                <br />
                <strong>Phone:</strong> {employee.phone}
              </Card.Text>
              <div className="d-flex gap-2 justify-content-end align-items-center">
                {isActiveFilter === "1" ? (
                  <>
                    <Button
                      icon="pi pi-pencil"
                      label="Edit"
                      className="p-button-rounded p-button-secondary"
                      aria-label="Edit"
                      style={{ backgroundColor: "var(--variant-two)", color: "white", border: "none" }}
                      onClick={() => handleEditClick(employee)}
                    />
                    <Button
                      icon="pi pi-trash"
                      label="Delete"
                      className="p-button-rounded p-button-danger"
                      aria-label="Delete"
                      style={{ backgroundColor: "var(--danger)", color: "white", border: "none" }}
                      onClick={() => confirmDelete(employee.internNum)}
                    />
                  </>
                ) : (
                  <Button
                    icon="pi pi-history"
                    label="Restore"
                    className="p-button-rounded p-button-success"
                    aria-label="Restore"
                    style={{ backgroundColor: "var(--valid)", color: "white", border: "none" }}
                    onClick={() => confirmDelete(employee.internNum)}
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
