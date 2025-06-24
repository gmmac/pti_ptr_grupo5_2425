import React from 'react';
import { Card } from 'react-bootstrap';

export default function DashboardStatCard({ value, label, icon, bgColor = "#E0DDF0", iconColor = "#7D5BA6" }) {
  return (
    <Card className="shadow-sm d-flex flex-row align-items-center p-3" style={{ borderRadius: "25px" }}>
      <div 
        style={{ 
          backgroundColor: bgColor,
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "1rem"
        }}
      >
        <i className={icon} style={{ color: iconColor, fontSize: '20px' }}></i>
      </div>
      <Card.Body className="p-0">
        <Card.Title className="fs-4 mb-0"><strong>{value}</strong></Card.Title>
        <Card.Text className="fs-6">{label}</Card.Text>
      </Card.Body>
    </Card>
  );
}
