import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import DashboardGridCard from './DashboardGridCard'

export default function DashboardGrid({ sections }) {
  return (
    <Card className="shadow-sm p-4 p-md-3 h-100" style={{borderRadius:"25px"}}>
      <h5 className="mb-3 fs-4"><strong>Manage</strong></h5>
      <Row xs={3} className="g-4">
        {sections.map((s, i) => (
          <Col xs={12} md={6} lg={6} xl={4} key={i}>
            <DashboardGridCard section={s} />
          </Col>
        ))}
      </Row>
    </Card>
  )
}
