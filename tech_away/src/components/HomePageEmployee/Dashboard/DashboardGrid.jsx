import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import DashboardGridCard from './DashboardGridCard'

export default function DashboardGrid({ sections }) {
  return (
    <Card className="shadow-sm p-3 h-100">
      <h5 className="mb-3"><strong>Manage</strong></h5>
      <Row xs={3} className="g-3">
        {sections.map((s, i) => (
          <Col xs={12} md={4} key={i}>
            <DashboardGridCard section={s} />
          </Col>
        ))}
      </Row>
    </Card>
  )
}
