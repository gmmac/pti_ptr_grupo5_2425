import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import styles from './index.module.css';

export default function InterestCard({ interest }) {
  return (
    <Card className={`shadow-sm rounded border-0 mb-3 p-2 w-100 ${styles.card}`}>
      <Card.Body>
        <Row className="align-items-center g-3">
          
          <Col xs={12} md={6} lg={6} className="text-center">
            <Card.Img
              variant="top"
              // src={interest.equipmentSheet.image}
              src={import.meta.env.VITE_IMAGE_URL + "/a.webp"}
              alt="Equipment"
              className={`img-fluid rounded ${styles.image}`}
            />
          </Col>

          <Col xs={12} md={6} lg={6}>
            <Card.Title className="fw-bold fs-5 text-primary">Equipment Details</Card.Title>
            <Card.Text className="fs-6">
              <strong>Barcode:</strong> {interest.equipmentSheet.barcode} <br />
              <strong>Price:</strong> € {interest.equipmentSheet.price.toFixed(2)} <br />
              <strong>Brand:</strong> {interest.equipmentSheet.EquipmentModel.Brand.name} <br />
              <strong>Model:</strong> {interest.equipmentSheet.EquipmentModel.name} <br />
              <strong>Release Year:</strong> {interest.equipmentSheet.releaseYear} <br />
              <strong>Type:</strong> {interest.equipmentSheet.EquipmentType.name}
            </Card.Text>
          </Col>

        </Row>
      </Card.Body>
    </Card>
  );
}
