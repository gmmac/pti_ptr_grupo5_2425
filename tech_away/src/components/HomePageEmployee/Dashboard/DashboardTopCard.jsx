import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

export default function DashboardTopCard() {
  return (
    <Row className="mb-4 justify-content-center">
        <Col xs={10} md={3} className="mb-3">
            <Card className="shadow-sm text-center">
                <Card.Body>
                    <Card.Title><strong>54</strong></Card.Title>
                    <Card.Text>Saved Products</Card.Text>
                </Card.Body>
            </Card>
        </Col>
        <Col xs={10} md={3} className="mb-3">
            <Card className="shadow-sm text-center">
                <Card.Body>
                    <Card.Title><strong>472</strong></Card.Title>
                    <Card.Text>Products in Stock</Card.Text>
                </Card.Body>
            </Card>
        </Col>
        <Col xs={10} md={3} className="mb-3">
            <Card className="shadow-sm text-center">
                <Card.Body>
                    <Card.Title><strong>324</strong></Card.Title>
                    <Card.Text>Sales</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}
