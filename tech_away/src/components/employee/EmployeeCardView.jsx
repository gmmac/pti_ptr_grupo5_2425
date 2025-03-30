import React, { useState } from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import ConfirmationModal from "../modals/ConfirmationModal";

export default function EmployeeCardView({ employees, onEdit, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      onDelete(selectedEmployee.internNum);
    }
    setShowConfirm(false);
    setSelectedEmployee(null);
  };

  return (
    <>
      <Row className="g-3 d-lg-none">
        {employees.map((employee, index) => (
          <Col key={index} xs={12}>
            <Card className="shadow-sm rounded p-3">
              <Card.Body>
                <Card.Title className="fw-bold">
                  {employee.firstName} {employee.lastName}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{employee.EmployeeRole.role}</Card.Subtitle>
                <Card.Text>
                  <strong>Intern Number:</strong> {employee.internNum} <br />
                  <strong>Store NIPC:</strong> {employee.Store.nipc} <br />
                  <Badge bg={employee.gender === "M" ? "secondary" : "dark"}>
                    {employee.gender === "M" ? "Male" : "Female"}
                  </Badge>{" "}
                  <br />
                  <strong>Email:</strong> {employee.email} <br />
                  <strong>Phone:</strong> {employee.phone} <br />
                  <strong>Created At:</strong> {new Date(employee.createdAt).toLocaleDateString()} <br />
                </Card.Text>
                <div className="d-flex gap-2">
                  <Button variant="warning" size="sm" onClick={() => onEdit(employee)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(employee)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <ConfirmationModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${selectedEmployee?.firstName} ${selectedEmployee?.lastName}?`}
        confirmText="Delete"
        confirmVariant="danger"
      />
    </>
  );
}
