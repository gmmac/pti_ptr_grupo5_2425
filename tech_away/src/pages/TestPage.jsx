import React, { useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import FormsEquipmentSheet from "../components/equipment/FormsEquipmentSheet";

export default function TestPage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Stack gap={3} className="justify-content-center align-items-center">
        <h2>Test Page</h2>

        <Button variant="primary" onClick={handleShow}>
          Criar EquipmentSheet
        </Button>
      </Stack>

      <FormsEquipmentSheet showModal={show} closeModal={handleClose} />
    </Container>
  );
}
