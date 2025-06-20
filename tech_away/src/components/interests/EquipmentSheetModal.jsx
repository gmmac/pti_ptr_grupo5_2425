import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Table, Stack } from "react-bootstrap";
import api from "../../utils/axios";

export default function EquipmentSheetModal({
  showModal,
  setShowModal,
  selectedItem = null,
  onSelect,
  setSeetSelected,
}) {
  /* ---------- estados ---------- */
  const [inputValue, setInputValue] = useState(""); // o que o user digita
  const [search, setSearch] = useState(""); // termo confirmado
  const [list, setList] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  /* ---------- sync do item já selecionado ---------- */
  useEffect(() => {
    if (showModal) setSelectedRow(selectedItem);
  }, [showModal, selectedItem]);

  /* ---------- FETCH com fallback por campo ---------- */
  useEffect(() => {
    if (!showModal) return;

    // se não há termo de pesquisa, podes mostrar a 1.ª página normal
    if (search.trim() === "") {
      api
        .get("api/equipmentSheet", { params: { page: 1, pageSize: 6 } })
        .then(({ data }) => fillTable(data.data || []))
        .catch(clearTable);
      return;
    }

    // OR manual: tenta Barcode → EquipmentModel → Brand → EquipmentType
    (async () => {
      const fields = ["Barcode", "EquipmentModel", "Brand", "EquipmentType"];
      for (const field of fields) {
        try {
          const { data } = await api.get("api/equipmentSheet", {
            params: { [field]: search.trim(), pageSize: 20 },
          });
          const rows = data.data || [];
          if (rows.length) return fillTable(rows); // encontrou!
        } catch (err) {
          console.error("API error:", err.message);
        }
      }
      clearTable(); // nenhum campo deu match
    })();
  }, [showModal, search]);

  /* ---------- utilidades ---------- */
  function fillTable(rows) {
    setList(rows);
    setColumns(
      rows.length
        ? Object.keys(rows[0]).filter(
            (c) => !["createdAt", "updatedAt"].includes(c)
          )
        : []
    );
  }
  function clearTable() {
    setList([]);
    setColumns([]);
  }

  /* ---------- clique na linha ---------- */
  const handleRowClick = (item) => setSelectedRow(item);

  /* ---------- confirmar ---------- */
  const handleConfirm = () => {
    if (!selectedRow) return;
    onSelect({
      id: selectedRow.Barcode,
      name: selectedRow.EquipmentModel.name,
      brand: selectedRow.Brand,
      model: selectedRow.EquipmentModel,
      type: selectedRow.EquipmentType,
    });
    setSeetSelected(true);
    setShowModal(false);
  };
  /* ---------- render ---------- */
  return (
    <Modal
      show={showModal}
      size="lg"
      centered
      onHide={() => setShowModal(false)}
      style={{
        fontFamily: "var(--body-font)",
        color: "var(--dark-grey)",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "var(--title-font)" }}>
          Select Equipment Sheet
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* input controlado */}
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
            onClick={() => {
              setInputValue("");
              setSearch("");
              setSelectedRow(null);
            }}
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
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((item, rowIndex) => {
                const isSel = selectedRow?.Barcode === item.Barcode;
                return (
                  <tr
                    key={rowIndex}
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
          className="rounded-pill px-4"
          style={{ backgroundColor: "var(--variant-one)", border: "none" }}
          onClick={handleConfirm}
          disabled={!selectedRow}
        >
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
