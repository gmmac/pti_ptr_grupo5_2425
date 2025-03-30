import React, { useState } from "react";
import { Table, Badge, Container, Button } from "react-bootstrap";
import ConfirmationModal from "../modals/ConfirmationModal";

export default function EmployeesTableView({ employees, onEdit, onDelete }) {
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
      <Container fluid className="p-3">
        <div className="table-responsive shadow-sm rounded" style={{ backgroundColor: "#f8f9fa", borderRadius: "10px", overflowX: "auto" }}>
          <Table hover bordered className="mb-0 d-none d-lg-table">
            <thead className="bg-light text-dark">
              <tr>
                <th>Intern Number</th>
                <th>Name</th>
                <th>Store NIPC</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index} className="align-middle" style={{ backgroundColor: "#ffffff" }}>
                  <td>{employee.internNum}</td>
                  <td className="text-truncate" style={{ maxWidth: "150px" }}><strong>{employee.firstName} {employee.lastName}</strong></td>
                  <td>{employee.Store.nipc}</td>
                  <td className="text-truncate" style={{ maxWidth: "200px" }}>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <Badge bg="muted" style={{ color: "#333" }}>{employee.EmployeeRole.role}</Badge>
                  </td>
                  <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(employee)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(employee)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>


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
