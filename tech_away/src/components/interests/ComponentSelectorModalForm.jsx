import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Table, Stack } from "react-bootstrap";
import api from "../../utils/axios";

export default function ComponentSelectorModalForm({
  showModal,
  setShowModal,
  title,
  routeName,
  selectedItem = null,
  onSelect,
}) {
  /* ---------- estados ---------- */
  const [fullList, setFullList] = useState([]); // lista completa
  const [list, setList] = useState([]); // lista filtrada
  const [columns, setColumns] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [inputValue, setInputValue] = useState(""); // texto digitado
  const [search, setSearch] = useState(""); // termo efectivo

  /* ---------- fetch inicial (uma vez por abertura) ---------- */
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
                (c) => !["createdAt", "updatedAt", "id"].includes(c)
              )
            : []
        );
      } catch (err) {
        console.error("API error:", err.message);
        setFullList([]);
        setList([]);
        setColumns([]);
      }
    })();

    setSelectedRow(selectedItem);
  }, [showModal, routeName, selectedItem]);

  /* ---------- filtragem local ---------- */
  useEffect(() => {
    if (search.trim() === "") {
      setList(fullList);
      return;
    }
    const term = search.trim().toLowerCase();
    const filtered = fullList.filter((row) =>
      columns.some((col) => {
        const v =
          typeof row[col] === "object" && row[col] !== null
            ? row[col].name
            : row[col];
        return String(v).toLowerCase().includes(term);
      })
    );
    setList(filtered);
  }, [search, fullList, columns]);

  /* ---------- handlers ---------- */
  const handleRowClick = (item) => setSelectedRow(item);

  const handleConfirm = () => {
    if (!selectedRow) return;
    onSelect({ id: selectedRow.id, name: selectedRow.name });
    setShowModal(false);
  };

  const resetSearch = () => {
    setInputValue("");
    setSearch("");
    setSelectedRow(null);
  };

  /* ---------- render ---------- */
  return (
    <Modal
      show={showModal}
      size="lg"
      centered
      onHide={() => setShowModal(false)}
      style={{ fontFamily: "var(--body-font)", color: "var(--dark-grey)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "var(--title-font)" }}>
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* barra de pesquisa + botões */}
        <Stack
          gap={2}
          direction="horizontal"
          className="justify-content-between align-items-center mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSearch(inputValue)}
            className="rounded-pill"
          />

          <Button
            className="rounded-pill w-25 d-flex gap-2 justify-content-center align-items-center"
            style={{
              backgroundColor: "var(--variant-one)",
              color: "var(--white)",
              border: "none",
            }}
            onClick={() => setSearch(inputValue)}
          >
            <i className="pi pi-search"></i>
            <span>Search</span>
          </Button>

          <Button
            className="rounded-pill w-25 d-flex gap-2 justify-content-center align-items-center"
            style={{
              backgroundColor: "var(--variant-two)",
              color: "var(--white)",
              border: "none",
            }}
            onClick={resetSearch}
          >
            <i className="pi pi-refresh"></i>
            <span>Reset</span>
          </Button>
        </Stack>

        {/* tabela */}
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
              {list.map((item, rowIdx) => {
                const isSel = selectedRow?.id === item.id;
                return (
                  <tr
                    key={rowIdx}
                    onClick={() => handleRowClick(item)}
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
                            : { backgroundColor: "inherit" }
                        }
                      >
                        {typeof item[col] === "object" && item[col] !== null
                          ? item[col].name || JSON.stringify(item[col])
                          : item[col]}
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
          className="rounded-pill px-4"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          disabled={!selectedRow}
          className="rounded-pill px-4"
          style={{ backgroundColor: "var(--variant-one)", border: "none" }}
          onClick={handleConfirm}
        >
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
