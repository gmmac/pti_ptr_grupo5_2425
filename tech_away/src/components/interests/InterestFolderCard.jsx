import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function InterestFolderCard({ iFolder }) {
  return (
    <Card className="mb-3 shadow-sm flex-fill">
      <Card.Body>
        <Card.Title>{iFolder.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Cliente: {iFolder.client.name}
        </Card.Subtitle>
        <Card.Text>
          Criado em: {new Date(iFolder.createdAt).toLocaleDateString()}
        </Card.Text>
        <Button variant="primary">Ver produtos</Button>
      </Card.Body>
    </Card>
  );
}
