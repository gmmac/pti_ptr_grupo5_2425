import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function FlowPane({ elements, selectedElements, isEditing, onToggle, renderCard, isSelected }) {
  // const isSelected = (e) => selectedElements.some((t) => t.id === e.id);

  return (
    <Row>
      {elements.map((e) => (
        <Col key={e.id || e.barcode} md={4} sm={6} xs={12} className="mb-3">
          {renderCard({
            element: e,
            isSelected: isSelected(e),
            isEditing,
            onToggle
          })}
        </Col>
      ))}
    </Row>
  );
}
