import React, { useEffect, useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import api from "../../utils/axios";
import PaginationControl from "../pagination/PaginationControl";
import WarehouseTableModal from "./WarehouseTableModal";
import WarehouseCardModal from "./WarehouseCardModal";

export default function WarehouseCatalogModal({
  show,
  handleClose,
  handleSelectWarehouse,
  selectedWarehouse,
}) {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    name: "",
    orderDirection: "ASC",
  });

  useEffect(() => {
    const fetchWarehouses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/warehouse/displayTable`, {
          params: {
            ...filters,
            page: currentPage,
          },
        });
        setWarehouses(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        setError("Error loading warehouses.");
      }
      setLoading(false);
    };

    if (show) {
      fetchWarehouses();
    }
  }, [show, currentPage, filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleWarehouseSelection = (warehouse) => {
    if (selectedWarehouse?.id === warehouse.id) {
      handleSelectWarehouse(null);
    } else {
      handleSelectWarehouse(warehouse);
    }
  };

  const handleModalClose = () => {
    setFilters({
      name: "",
      orderDirection: "ASC",
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Warehouse Catalog</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: "450px" }}>

        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : warehouses.length === 0 ? (
          <p>No warehouses found.</p>
        ) : (
          <Container>

            <WarehouseTableModal
              warehouses={warehouses}
              selectedWarehouse={selectedWarehouse}
              handleWarehouseSelection={handleWarehouseSelection}
            />

            {warehouses.map((warehouse) => (
              <WarehouseCardModal
                key={warehouse.id}
                warehouse={warehouse}
                selectedWarehouse={selectedWarehouse}
                handleWarehouseSelection={handleWarehouseSelection}
              />
            ))}
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between align-items-center">
        <div className="flex-grow-1 d-flex justify-content-center">
          <PaginationControl
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
}
