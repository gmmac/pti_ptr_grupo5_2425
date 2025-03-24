import React from 'react'
import { Card, Col } from 'react-bootstrap'

export default function DashboardVerticalSection() {
  return (
    <Card className="shadow-sm p-4 p-md-3 h-100" style={{borderRadius:"25px"}}>
        <h5 className="mb-3 fs-4"><strong>Analytics</strong></h5>
        <p>emitir relatorio?</p>
    </Card>
  )
}
