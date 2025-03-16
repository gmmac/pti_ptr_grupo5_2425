import React from "react";
import { Table, Badge } from "react-bootstrap";

export default function EmployeesTable({ employees }) {
  return (
    <Table responsive className="table-borderless shadow-sm rounded" style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
      <thead className="bg-light text-dark" style={{ borderRadius: "10px" }}>
        <tr>
          <th>Name</th>
          <th>NIF</th>
          <th>NIC</th>
          <th>Intern Number</th>
          <th>Store NIPC</th>
          <th>Birth Date</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Role</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index} className="align-middle text-center" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
            <td><strong>{employee.name}</strong></td>
            <td>{employee.nif}</td>
            <td>{employee.nic}</td>
            <td>{employee.internNum}</td>
            <td>{employee.storeNIPC}</td>
            <td>{new Date(employee.birthDate).toLocaleDateString()}</td>
            <td>
              <Badge bg={employee.gender === 'M' ? "secondary" : "dark"}>
                {employee.gender === 'M' ? "Male" : "Female"}
              </Badge>
            </td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.address}</td>
            <td>{employee.latitude}</td>
            <td>{employee.longitude}</td>
            <td>
              <Badge bg="muted" style={{ color: "#333" }}>Role {employee.EmployeeRole.role}</Badge>
            </td>
            <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}