import React, { useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import FormsEquipmentSheet from "../components/equipment/FormsEquipmentSheet";
import DisplayTable from "../components/equipment/DisplayTable";
import FiltersBarEquipmentSheet from "../components/equipment/FiltersBarEquipmentSheet";

export default function TestPage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [paramsTofilter, setParamsTofilter] = useState({});

  const handleFilterSet = (params) => {
    setParamsTofilter(params);
  };
  return (
    <Container>
      <Stack gap={3} className="justify-content-center align-items-center">
        <h2>Test Page</h2>
        <Button variant="primary" onClick={handleShow}>
          Criar EquipmentSheet
        </Button>
        <FiltersBarEquipmentSheet paramsTofilter={handleFilterSet} />
        <DisplayTable model="equipmentSheet" params="" />
      </Stack>

      <FormsEquipmentSheet showModal={show} closeModal={handleClose} />
    </Container>
  );
}
