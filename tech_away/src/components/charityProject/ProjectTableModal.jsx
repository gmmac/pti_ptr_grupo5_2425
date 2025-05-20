import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default function ProjectTableModal({ projects, selectedProjectID, handleProjectSelection }) {
  return (
    <Table responsive="sm" striped bordered hover className="d-none d-lg-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Organizer</th>
          <th>Warehouse</th>
          <th>Select Project</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.ProjectStatus?.state}</td>
            <td>{`${project.Organizer?.firstName} ${project.Organizer?.lastName}`}</td>
            <td>{project.Warehouse?.name}</td>
            <td>
              <Button
                style={{
                  backgroundColor: selectedProjectID === project.id ? '#708c7e' : '#b5a8c9',
                  color: 'white',
                  border: 'none'
                }}
                variant={selectedProjectID === project.id ? 'secondary' : 'primary'}
                onClick={() => handleProjectSelection(project)}
              >
                {selectedProjectID === project.id ? 'Deselect' : 'Select'}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}