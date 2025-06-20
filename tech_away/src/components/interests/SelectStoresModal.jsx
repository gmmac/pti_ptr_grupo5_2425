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
  const routeName = "store";
  const [fullList, setFullList] = useState([]);
  const [list, setList] = useState([]);
  const [columns] = useState(["name", "email", "phone", "address"]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");

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
        setSelectedRows(selectedStrores || []);
      } catch (err) {
        console.error(err);
        setFullList([]);
        setList([]);
      }
    })();
  }, [showModal]);

  const getRowKey = (row) => row.id || `${row.name}-${row.email}`;

  const handleRowClick = (row) => {
    const rowKey = getRowKey(row);
    const isAlreadySelected = selectedRows.some((r) => getRowKey(r) === rowKey);

    if (isAlreadySelected) {
      setSelectedRows(selectedRows.filter((r) => getRowKey(r) !== rowKey));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const handleConfirm = () => {
    setSelectedStores(selectedRows);
    setShowModal(false);
  };

  useEffect(() => {
    if (!search.trim()) {
      setList(fullList);
      return;
    }
    const searchLower = search.toLowerCase();
    const filtered = fullList.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchLower)
      )
    );
    setList(filtered);
  }, [search, fullList]);

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
            className="rounded-pill w-25 d-flex gap-2 justify-content-center align-items-center"
            style={{ backgroundColor: "var(--variant-one)", border: "none" }}
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
              setSelectedRows([]);
            }}
          >
            <i className="pi pi-refresh"></i>
            <span>Reset</span>
          </Button>
        </Stack>

        {list.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((row) => {
                const rowKey = getRowKey(row);
                const isSel = selectedRows.some((r) => getRowKey(r) === rowKey);
                return (
                  <tr
                    key={rowKey}
                    onClick={() => handleRowClick(row)}
                    style={{ cursor: "pointer" }}
                  >
                    {columns.map((col) => (
                      <td
                        key={col}
                        style={{
                          backgroundColor: isSel
                            ? "var(--variant-one)"
                            : undefined,
                          color: isSel ? "var(--white)" : undefined,
                          transition: "background-color 0.2s ease",
                        }}
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
          onClick={handleConfirm}
          disabled={!selectedRows.length}
        >
          Select ({selectedRows.length})
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
