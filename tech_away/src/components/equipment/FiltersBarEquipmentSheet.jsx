import React from "react";
import { Button, Form, Stack } from "react-bootstrap";

export default function FiltersBarEquipmentSheet({ paramsTofilter }) {
  const params = [
    { name: "barcode", value: "" },
    { name: "model", value: "" },
    { name: "type", value: "" },
  ];

  const handleFilter = (e) => {
    const { name, value } = e.target;
    paramsTofilter((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Stack
      direction="horizontal"
      style={{
        backgroundColor: "var(--white)",
        boxShadow: "var(--shadow-default)",
      }}
      gap={3}
      className="p-2 justify-content-center align-items-center rounded-pill"
    >
      <Form.Control
        type="text"
        placeholder="Search by "
        name="search"
        onChange={handleFilter}
        className="rounded-pill w-50"
        style={{ backgroundColor: "var(--white)" }}
      />
      <Form.Select
        name="Search by:"
        className="rounded-pill w-25"
        style={{
          backgroundColor: "var(--variant-one)",
          color: "var(--dark-grey)",
        }}
      >
        <option value="">Filtrar por:</option>
        {params.map((param) => (
          <option key={param.name} value={param.name}>
            {param.name}
          </option>
        ))}
      </Form.Select>
      <Button
        className="rounded-pill"
        style={{ backgroundColor: "var(--variant-two)", border: "none" }}
      >
        Search
      </Button>
    </Stack>
  );
}
