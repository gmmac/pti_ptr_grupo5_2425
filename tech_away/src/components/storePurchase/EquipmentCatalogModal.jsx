import React, { useEffect, useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
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

  const [filters, setFilters] = useState({
    barcode: "",
    model: "",
    releaseYear: "",
    type: "",
    orderDirection: "ASC",
  });

  const [showAddModal, setShowAddModal] = useState(false);

  const handleClosePopUp = () => {
    handleClose();
    setFilters({
      barcode: "",
      model: "",
      releaseYear: "",
      type: "",
      orderDirection: "ASC",
    });
    setCurrentPage(1);
  };

  const handleAddEquipment = async (newEquipment) => {
    try {
      await api.post("/api/equipmentSheet", newEquipment);
      // Reload data
      setCurrentPage(1);
      setFilters({ ...filters }); // trigger fetch
      setShowAddModal(false);
    } catch (error) {
      console.error("Erro ao adicionar equipamento:", error);
    }
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/equipmentSheet`, {
          params: {
            ...filters,
            page: currentPage,
          },
        });
        setEquipments(response.data.data || []);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Error loading equipment list");
      } finally {
        setLoading(false);
      }
    };

    if (show) fetchEquipments();
  }, [show, currentPage, filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEquipmentSelection = (equipment) => {
    const isSelected = selectedEquipment && selectedEquipment.barcode === equipment.barcode;
    handleSelectEquipment(isSelected ? null : equipment);
  };

  return (
    <>      
      <Modal show={show} onHide={handleClosePopUp} size="xl" centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>All equipments</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Add Equipment Button */}
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

      {/* Add Equipment Modal */}
      <AddEquipmentModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSubmit={handleAddEquipment}
      />
    </>
  );
}
