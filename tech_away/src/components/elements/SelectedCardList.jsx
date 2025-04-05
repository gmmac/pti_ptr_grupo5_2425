import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

export default function SelectedCardList({ selectedElements, isEditing, onRemove }) {
  return (
    <Row>
      {selectedElements.map((element) => (
        <Col key={element.id} md={4} className="mb-3">
          <Card
            bg={isEditing ? 'success' : 'light'}
            text={isEditing ? 'white' : 'dark'}
            className="shadow-sm rounded-sm border-0"
          >
            <Card.Body className="d-flex justify-content-between align-items-center py-2 px-3">
              <div className="fw-semibold">{element.name}</div>
              {isEditing && (
                <Button
                  size="sm"
                  variant="light"
                  className="text-danger fw-bold"
                  onClick={() => onRemove(element)}
                >
                  ✕
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
