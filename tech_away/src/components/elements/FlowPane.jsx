import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FlowCard from './FlowCard';

export default function FlowPane({ elements, selectedElements, isEditing, onToggle }) {
  const isSelected = (e) => selectedElements.some((t) => t.id === e.id);

  return (
    <Row>
      {elements.map((e) => (
        <Col key={e.id} md={4} sm={6} xs={12} className="mb-3">
          <FlowCard
            element={e}
            isSelected={isSelected(e)}
            isEditing={isEditing}
            onToggle={onToggle}
          />
        </Col>
      ))}
    </Row>
  );
}
