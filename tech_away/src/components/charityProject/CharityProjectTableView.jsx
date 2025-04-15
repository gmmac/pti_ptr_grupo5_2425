import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import useSafeOrganizerAuth from "../../utils/auth";

export default function CharityProjectTableView({ projects, onOpenDetails, onDelete, deleting }) {

  const {isOrganizer} = useSafeOrganizerAuth()
  

  return (
    <Container fluid className="p-3">
      <div
        className="table-responsive shadow-sm rounded"
        style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}
      >
        <Table hover bordered className="mb-0 d-none d-lg-table">
          <thead className="bg-light text-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>Completion Date</th>
              <th>Status</th>
              <th>Warehouse</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="align-middle bg-white">
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{new Date(project.startDate).toLocaleDateString()}</td>
                <td>{new Date(project.completionDate).toLocaleDateString()}</td>
                <td>{project.ProjectStatus?.state}</td>
                <td>{project.Warehouse?.name}</td>
                <td>
                  <Button 
                  size="sm" 
                  onClick={() => onOpenDetails(project)}
                  className="me-md-3"
                  >
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
