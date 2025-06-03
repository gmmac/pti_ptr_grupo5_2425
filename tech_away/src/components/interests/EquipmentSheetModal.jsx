import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Table } from "react-bootstrap";
import api from "../../utils/axios";

export default function EquipmentSheetModal({
  showModal,
  setShowModal,
  selectedItem = null,
  onSelect,
  setSeetSelected,
}) {
  const [list, setList] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (showModal) {
      setSelectedRow(selectedItem);
    }
  }, [showModal, selectedItem]);

  useEffect(() => {
    if (!showModal) return;

    api
      .get("api/equipmentSheet", {
        params: { search },
      })
      .then((res) => {
        const data = res.data.data || [];
        if (data.length > 0) {
          const allColumns = Object.keys(data[0]).filter(
            (col) => !["createdAt", "updatedAt"].includes(col)
          );
          setList(data);
          setColumns(allColumns);
          console.log(data);
        } else {
          setList([]);
          setColumns([]);
        }
      })
      .catch((error) => {
        console.error("API error:", error.message);
        setList([]);
        setColumns([]);
      });
  }, [showModal, search]);

  const handleRowClick = (item) => {
    setSelectedRow(item);
  };

  const handleConfirm = () => {
    if (selectedRow) {
      console.log("Selected Row:", selectedRow);

      onSelect({
        id: selectedRow.Barcode,
        name: selectedRow.EquipmentModel.name,
        brand: selectedRow.Brand,
        model: selectedRow.EquipmentModel,
        type: selectedRow.EquipmentType,
      });
      setSeetSelected(true);
      setShowModal(false);
    }
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Select Equipment Sheet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3 rounded-pill"
        />
        {list.length > 0 ? (
          <Table bordered hover responsive="sm">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => handleRowClick(item)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow?.id === item.id
                        ? "var(--variant-one)"
                        : "transparent",
                    color: selectedRow?.id === item.id ? "#fff" : "inherit",
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex}>
                      {typeof item[col] === "object" && item[col] !== null
                        ? item[col].name || JSON.stringify(item[col])
                        : item[col]}
                    </td>
                  ))}
                </tr>
              ))}
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
          onClick={handleConfirm}
          disabled={!selectedRow}
          className="rounded-pill px-4"
          style={{ backgroundColor: "var(--variant-one)", border: "none" }}
        >
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
