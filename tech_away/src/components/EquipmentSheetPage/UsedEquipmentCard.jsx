import React, { useEffect } from "react";
import { Card, Stack } from "react-bootstrap";
import { Heart, Cart } from "react-bootstrap-icons";
import { useNavigate, useLocation } from "react-router-dom";

export default function UsedEquipmentCard({ usedEquipment }) {
  const navigate = useNavigate();
  const location = useLocation(); // URL atual

  const path = location.pathname;
  function getLastPathSegment(url) {
    const parts = url.split("/").filter(Boolean);
    return parts.pop();
  }
  return (
    <Card
      style={{
        backgroundColor: "var(--white)",
        boxShadow: "var(--shadow-default)",
        borderRadius: "var(--rounded-sm)",
        border: "none",
      }}
      className=""
      onClick={() =>
        navigate(`${path}/${usedEquipment.id}`, {
          state: { equipmentName: getLastPathSegment(path) },
        })
      }
    >
      <Card.Img
        variant="top"
        src="../../public/assets/ip.png"
        className="w-50 mx-auto mt-3"
        style={{ objectFit: "cover", mixBlendMode: "darken" }}
      />

      <Card.Body className="ps-4">
        <Card.Title>
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-between align-items-center"
          >
            <span style={{ color: "var(--variant-two" }} className="fs-4">
              {usedEquipment?.Store?.name}
            </span>
            <Stack direction="horizontal" gap={2}>
              <Stack
                direction="horizontal"
                gap={2}
                style={{
                  border: "1px solid var(--variant-two)",
                  color: "var(--variant-two)",
                  boxShadow: "var(--shadow-default)",
                }}
                className="rounded-pill py-1 px-2"
              >
                <Heart size={20} style={{ color: "var(--variant-two)" }} />
                <p className="m-0 fs-5">16</p>
              </Stack>
              <Stack
                direction="horizontal"
                gap={2}
                style={{
                  border: "1px solid var(--variant-two)",
                  color: "var(--white)",
                  boxShadow: "var(--shadow-default)",
                }}
                className="rounded-pill py-1 px-2"
              >
                <Cart size={20} style={{ color: "var(--variant-two)" }} />
              </Stack>
            </Stack>
          </Stack>
        </Card.Title>
        <Card.Text style={{ color: "var(--dark-gray)" }}>
          State: {usedEquipment?.EquipmentStatus?.state || "Desconhecido"}
          <br />
          {usedEquipment?.price
            ? `${usedEquipment.price} EUR`
            : "Não disponível"}
        </Card.Text>
      </Card.Body>
    </Card>
    // 	<Stack
    // 		direction="vertical"
    // 		gap={3}
    // 		style={{ width: "260px", overflow: "hidden" }}
    // 	>
    // 		<Image
    // 			src="../../public/assets/ip.png"
    // 			style={{ objectFit: "cover" }}
    // 			className="rounded-sm img-fluid"
    // 		/>
    // 		<Stack
    // 			direction="vertical"
    // 			className="ps-3"
    // 			style={{ color: "var(--dark-gray)" }}
    // 		>
    // 			<p className="m-0">{usedEquipment?.Store?.name}</p>
    // 			<p className="m-0">{usedEquipment?.EquipmentStatus?.state}</p>
    // 			<p className="m-0">{usedEquipment?.price}</p>
    // 		</Stack>
    // 	</Stack>
  );
}
