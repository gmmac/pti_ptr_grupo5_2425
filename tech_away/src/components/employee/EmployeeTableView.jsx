import React from "react";
import { Table, Badge, Container } from "react-bootstrap";

export default function EmployeesTableView({ employees, changeRole=false }) {
  return (
    <Container fluid className="p-3">
      <div className="table-responsive shadow-sm rounded" style={{ backgroundColor: "#f8f9fa", borderRadius: "10px", overflowX: "auto" }}>
        <Table hover bordered  className="mb-0 d-none d-lg-table">
          <thead className="bg-light text-dark">
            <tr>
              <th>Intern Number</th>
              <th>Name</th>
              <th>Store NIPC</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="align-middle" style={{ backgroundColor: "#ffffff" }}>
                <td>{employee.internNum}</td>
                <td className="text-truncate" style={{ maxWidth: "150px" }}><strong>{employee.name}</strong></td>
                <td>{employee.Store.nipc}</td>
                <td className="text-truncate" style={{ maxWidth: "200px" }}>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>
                  <Badge bg="muted" style={{ color: "#333" }}>{employee.EmployeeRole.role}</Badge>
                </td>
                <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
