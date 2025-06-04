import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Table, Stack } from "react-bootstrap";
import api from "../../utils/axios";

export default function SelectStoresModal({
  showModal,
  setShowModal,
  selectedStrores,
  setSelectedStores,
}) {
  const title = "Select Stores";
  const routeName = "stores";
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
  /* ---------- render ---------- */
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      centered
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
        {list.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((row) => {
                const isSel = selectedRow?.NIPC === row.NIPC;
                return (
                  <tr
                    key={row.NIPC}
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
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p className="text-center">No stores found</p>
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
          style={{ backgroundColor: "var(--variant-one)", border: "none" }}
          className="rounded-pill"
        >
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
