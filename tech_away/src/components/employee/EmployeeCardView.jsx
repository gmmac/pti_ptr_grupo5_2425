import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";

export default function EmployeeCardView({ employees }) {
  return (
    <Row className="g-3 d-lg-none">
      {employees.map((employee, index) => (
        <Col key={index} xs={12}>
          <Card className="shadow-sm rounded p-3">
            <Card.Body>
              <Card.Title className="fw-bold">{employee.firstName} {employee.lastName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{employee.EmployeeRole.role}</Card.Subtitle>
              <Card.Text>
                <strong>Intern Number:</strong> {employee.internNum} <br />
                {/* <strong>NIF:</strong> {employee.nif} <br />
                <strong>NIC:</strong> {employee.nic} <br /> */}
                <strong>Store NIPC:</strong> {employee.Store.nipc} <br />
                {/* <strong>Birth Date:</strong> {new Date(employee.birthDate).toLocaleDateString()} <br /> */}
                {/* <strong>Gender:</strong>{" "} */}
                <Badge bg={employee.gender === "M" ? "secondary" : "dark"}>
                  {employee.gender === "M" ? "Male" : "Female"}
                </Badge>{" "}
                <br />
                <strong>Email:</strong> {employee.email} <br />
                <strong>Phone:</strong> {employee.phone} <br />
                <strong>Created At:</strong> {new Date(employee.createdAt).toLocaleDateString()} <br />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
