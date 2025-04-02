import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DashboardGridCard({ section }) {
  
  const navigate = useNavigate();


  const handleOnclick = () => {
    navigate("manage", {
      state: {
        componentKey: section.key,
        title: section.title,
      },
    });
  };
  
  

  return (
    <Card
      onClick={handleOnclick}
      className="h-100 d-flex flex-column justify-content-center align-items-center text-center p-5"
      style={{
        borderRadius: "25px",
        backgroundColor: "var(--light-grey)",
        border: "0px",
        cursor: "pointer",
      }}
    >
      <Card.Title>{section.title}</Card.Title>
      <Card.Text>This is a grid card.</Card.Text>
    </Card>
  );
}
// import React from 'react'
// import { Card } from 'react-bootstrap'
// 
// export default function DashboardGridCard({ section }) {
//   return (
//     <Card className="h-100 d-flex flex-column justify-content-center align-items-center text-center p-4">
//       <Card.Body>
//         <Card.Title className="fs-5">{section.title}</Card.Title>
//         <Card.Text>This is a grid card.</Card.Text>
//       </Card.Body>
//     </Card>
//   )
// }
