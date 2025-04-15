import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function FlowPane({ elements, isEditing, selectedElements, onToggle, renderCard, isSelected}) {
  return (
    <Row>
      {elements.map((e) => (
        <Col 
        key={e.id || e.barcode} 
        className="mb-3"
        xs={6}
        md={e.id ? 4 : 6}
        >
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
