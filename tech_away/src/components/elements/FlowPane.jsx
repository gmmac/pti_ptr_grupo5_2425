import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function FlowPane({
  elements,
  isEditing,
  selectedElements,
  onToggle,
  renderCard,
  isSelected,
  colNumMD,
  colNumXS
}) {
  return (
    <Row>
      {elements.map((e) => (
        <Col key={e.id} xs={colNumXS} md={colNumMD} >
          {renderCard({
            element: e,
            isSelected: isSelected(e),
            isEditing,
            onToggle,
          })}
        </Col>
      ))}
    </Row>
  );
}
