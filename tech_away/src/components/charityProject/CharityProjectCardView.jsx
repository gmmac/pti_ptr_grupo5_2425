import React, { useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import useSafeOrganizerAuth from "../../utils/auth";

export default function CharityProjectCardView({ projects, onOpenDetails, onDelete, deleting }) {

  const {isOrganizer} = useSafeOrganizerAuth()

  return (
    <Row className="g-3 d-lg-none">
      {projects.map((project) => (
        <Col key={project.id} xs={12}>
          <Card className="shadow-sm rounded p-3">
            <Card.Body>
              <Card.Title className="fw-bold">{project.name}</Card.Title>
              <Card.Text>
                <strong>Start:</strong>{" "}
                {project.startDate ? new Date(project.startDate).toLocaleDateString() : "—"} <br />
                <strong>Completion:</strong>{" "}
                {project.completionDate ? new Date(project.completionDate).toLocaleDateString() : "—"} <br />
                <strong>Status:</strong> {project.status || "—"} <br />
                <strong>Warehouse:</strong> {project.warehouse || "—"} <br />
              </Card.Text>
              <div className="d-flex justify-content-end gap-2">
                <Button size="sm" onClick={() => onOpenDetails(project.id)}>
                  See Details
                </Button>
                {isOrganizer && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(project)}
                    disabled={deleting}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
