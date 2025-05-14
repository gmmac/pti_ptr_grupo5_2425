import React from 'react';
import { Row, Col, Card, Button, FormControl, InputGroup } from 'react-bootstrap';

export default function SelectedCardList({ selectedElements = [], isEditing = false, onRemove, renderCard, onQuantityChange, colNumMD, colNumXS }) {
  return (
    <Row>
      {selectedElements.map((element, index) => (
        <Col key={element.id || element.Barcode || index} md={colNumMD} xs={colNumXS} className="mb-3">
          <Card
            bg={isEditing ? 'success' : 'light'}
            text={isEditing ? 'white' : 'dark'}
            className="shadow-sm rounded-sm border-0"
          >
            <Card.Body className="py-2 px-3">
              <div className="d-flex justify-content-between align-items-start">
                <div style={{ width: '100%' }}>
                  {renderCard(element)}
                  {isEditing && (
                    <InputGroup className="mt-2">
                      <InputGroup.Text className="bg-light text-dark">Qty</InputGroup.Text>
                        <FormControl
                          type="number"
                          value={element.quantity ?? ''}
                          onChange={(e) => {
                            const raw = e.target.value;
                            const value = parseInt(raw);
                            if (raw === '') {
                              onQuantityChange?.(element, '');
                            } else if (!isNaN(value) && value > 0) {
                              onQuantityChange?.(element, value);
                            }
                          }}
                          onBlur={(e) => {
                            if (!e.target.value || parseInt(e.target.value) <= 0) {
                              onQuantityChange?.(element, 1);
                            }
                          }}
                        />
                    </InputGroup>
                  )}
                </div>
                {isEditing && onRemove && (
                  <Button
                    size="sm"
                    variant="light"
                    className="text-danger fw-bold ms-2"
                    onClick={() => onRemove(element)}
                  >
                    ✕
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
