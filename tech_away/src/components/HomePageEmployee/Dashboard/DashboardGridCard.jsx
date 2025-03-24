import React from 'react'
import { Card } from 'react-bootstrap'

export default function DashboardGridCard({section}) {
  return (
    <Card className="text-center p-5">
        <Card.Title>{section.title}</Card.Title>
        <Card.Text>This is a grid card.</Card.Text>
    </Card>
  )
}
