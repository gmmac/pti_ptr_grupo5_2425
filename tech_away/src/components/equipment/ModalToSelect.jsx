import React, { useState, useEffect } from "react";
import { Modal, Table, Button, Form } from "react-bootstrap";
import api from "../../utils/axios";
import PaginationControl from "../pagination/PaginationControl";


export default function ModalToSelect({
  showModal,
  closeModal,
  title,
  selectedItem = null,
  onSelect,
}) {
  const [list, setList] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (showModal) {
      setSelectedRow(selectedItem);
      setCurrentPage(1);
    }
  }, [showModal, selectedItem]);

  useEffect(() => {
    if (!showModal) return;

    api
      .get(`api/${title}`, {
        params: {
          name: search || undefined,
          page: currentPage,
          pageSize: 5,
        },
      })
      .then((res) => {
        const { data, totalItems } = res.data;

        if (data.length > 0) {
          const allColumns = Object.keys(data[0]).filter(
            (col) => col !== "createdAt" && col !== "updatedAt"
          );
          setList(data);
          setColumns(allColumns);
          setTotalPages(Math.max(1, Math.ceil(totalItems / 5)));
        } else {
          setList([]);
          setColumns([]);
          setTotalPages(1);
        }
      })
      .catch((error) => {
        console.error("API error:", error.message);
        setList([]);
        setColumns([]);
        setTotalPages(1);
      });
  }, [showModal, title, search, currentPage]);

  const handleRowClick = (item) => {
    setSelectedRow(item);
  };

  const handleConfirm = () => {
    if (selectedRow) {
      onSelect({ id: selectedRow.id, name: selectedRow.name });
      closeModal();
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Modal show={showModal} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="mb-3 rounded-pill"
        />
        {list.length > 0 ? (
          <>
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
                  <tr key={rowIndex} onClick={() => handleRowClick(item)}>
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            selectedRow?.id === item.id
                              ? "var(--variant-one)"
                              : "transparent",
                          color:
                            selectedRow?.id === item.id ? "#fff" : "inherit",
                        }}
                      >
                        {typeof item[col] === "object" && item[col] !== null
                          ? item[col].name || JSON.stringify(item[col])
                          : item[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <PaginationControl
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        ) : (
          <p className="text-center">Nenhum dado encontrado.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="rounded-pill px-4"
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={!selectedRow}
          className="rounded-pill px-4"
          style={{
            backgroundColor: "var(--variant-one)",
            border: "none",
          }}
        >
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
