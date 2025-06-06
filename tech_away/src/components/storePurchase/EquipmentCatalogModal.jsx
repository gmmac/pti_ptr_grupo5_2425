import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Container } from "react-bootstrap";
import api from "../../utils/axios";
import PaginationControl from "../pagination/PaginationControl";
import EquipmentFilter from "./EquipmentFilter";
import EquipmentTableModal from "./EquipmentTableModal";
import EquipmentCardModal from "./EquipmentCardModal";
import AddEquipmentModal from "./AddEquipmentModal";

export default function EquipmentCatalogModal({ show, handleClose, handleSelectEquipment, selectedEquipment }) {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const itemsPerPage = 5;

  const [filters, setFilters] = useState({
    barcode: "",
    model: "",
    releaseYear: "",
    type: "",
    orderDirection: "ASC"
  });

  const [showAddModal, setShowAddModal] = useState(false); // CONTROL ADD MODAL

  const handleClosePopUp = () => {
    handleClose();
    setFilters({
      barcode: "",
      model: "",
      releaseYear: "",
      type: "",
      orderDirection: "ASC"
    });
  };

  const fetchEquipments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/equipmentSheet`, {
        params: {
          ...filters,
          page: currentPage,
          // pageSize: itemsPerPage
        }
      });
      console.log(response.data.data)
      setEquipments(response.data.data || []);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Error loading equipment list");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (show) {
      fetchEquipments();
    }
  }, [show, currentPage, filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEquipmentSelection = (equipment) => {
    if (selectedEquipment === equipment.Barcode) {
      handleSelectEquipment(null);
    } else {
      handleSelectEquipment(equipment);
    }
  };

  const handleAddEquipment = (newEquipment) => {
    // Here you could POST to the API if persistence is needed
    setEquipments((prev) => [newEquipment, ...prev]);
    setShowAddModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Equipment Catalog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* ADD BUTTON */}
          <div className="mb-3 text-end">
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              Add Equipment
            </Button>
          </div>

          <EquipmentFilter setFilters={setFilters} />
          {loading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : equipments.length === 0 ? (
            <p>No equipment found.</p>
          ) : (
            <Container>
              {/* Desktop View */}
              <EquipmentTableModal
                equipments={equipments}
                selectedEquipment={selectedEquipment}
                handleEquipmentSelection={handleEquipmentSelection}
              />
              {/* Mobile View */}
              {equipments.map((e) => (
                <EquipmentCardModal
                  key={e.barcode}
                  equipment={e}
                  selectedEquipment={selectedEquipment}
                  handleEquipmentSelection={handleEquipmentSelection}
                />
              ))}
              <PaginationControl
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopUp}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* ADD EQUIPMENT MODAL */}
      <AddEquipmentModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onAdd={handleAddEquipment}
      />
    </>
  );
}
