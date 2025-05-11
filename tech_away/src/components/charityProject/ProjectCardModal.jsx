import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function ProjectCardModal({ project, selectedProjectID, handleProjectSelection }) {
  return (
    <Card className="mb-3 d-lg-none">
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Text>
          <strong>ID:</strong> {project.id}<br />
          <strong>Status:</strong> {project.ProjectStatus?.state}<br />
          <strong>Organizer:</strong> {project.Organizer?.firstName} {project.Organizer?.lastName}<br />
          <strong>Warehouse:</strong> {project.Warehouse?.name}
        </Card.Text>
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
      </Card.Body>
    </Card>
  );
}