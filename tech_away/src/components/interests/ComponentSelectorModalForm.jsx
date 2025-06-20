import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Table, Stack } from "react-bootstrap";
import api from "../../utils/axios";

export default function ComponentSelectorModalForm({
  showModal,
  setShowModal,
  title,
  routeName,
  onSelect,
  displayField = "name", // "name" por defeito, mas podes passar "state"
}) {
  const [fullList, setFullList] = useState([]);
  const [list, setList] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");

  /* ---------- fetch inicial ---------- */
  useEffect(() => {
    if (!showModal) return;

    (async () => {
      try {
        const { data } = await api.get(`api/${routeName}`, {
          params: { pageSize: 5000 },
        });
        const rows = data.data || [];
        setFullList(rows);
        setList(rows);
        setColumns(
          rows.length
            ? Object.keys(rows[0]).filter(
                (c) => !["createdAt", "updatedAt"].includes(c)
              )
            : []
        );
      } catch (err) {
        console.error(err);
        setFullList([]);
        setList([]);
        setColumns([]);
      }
    })();
  }, [showModal, routeName]);

  /* ---------- filtro local ---------- */
  useEffect(() => {
    if (search.trim() === "") {
      setList(fullList);
      return;
    }
    const term = search.trim().toLowerCase();
    setList(
      fullList.filter((row) =>
        columns.some((col) =>
          String(
            typeof row[col] === "object" && row[col] !== null
              ? row[col].name
              : row[col]
          )
            .toLowerCase()
            .includes(term)
        )
      )
    );
  }, [search, fullList, columns]);

  /* ---------- confirmar ---------- */
  const handleConfirm = () => {
    if (!selectedRow) return;
    onSelect({
      id: selectedRow.id,
      [displayField]: selectedRow[displayField], // devolve id + campo pedido
    });
    setShowModal(false);
  };

  /* ---------- render ---------- */
  return (
    <Modal
      show={showModal}
      size="lg"
      centered
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Stack direction="horizontal" gap={2} className="mb-3">
          <Form.Control
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSearch(inputValue)}
            className="rounded-pill"
          />
          <Button
            className="rounded-pill"
            style={{ backgroundColor: "var(--variant-one)", border: "none" }}
            onClick={() => setSearch(inputValue)}
          >
            Search
          </Button>
          
        </Stack>

        {list.length ? (
          <Table bordered hover responsive="sm">
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((row) => {
                const isSel = selectedRow?.id === row.id;
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedRow(row)}
                    style={{ cursor: "pointer" }}
                  >
                    {columns.map((col) => (
                      <td
                        key={col}
                        style={
                          isSel
                            ? {
                                backgroundColor: "var(--variant-one)",
                                color: "var(--white)",
                              }
                            : {}
                        }
                      >
                        {typeof row[col] === "object" && row[col] !== null
                          ? row[col].name || JSON.stringify(row[col])
                          : row[col]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p className="text-center">Nenhum dado encontrado.</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowModal(false)}
          className="rounded-pill"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          style={{ backgroundColor: "var(--variant-one)", border: "none" }}
          disabled={!selectedRow}
          onClick={handleConfirm}
          className="rounded-pill"
        >
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
