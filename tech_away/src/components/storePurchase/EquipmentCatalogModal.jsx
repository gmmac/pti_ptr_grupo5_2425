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
  const itemsPerPage = 4;

  const [filters, setFilters] = useState({
    barcode: "",
    model: "",
    releaseYear: "",
    type: "",
    orderDirection: "ASC"
  });

  const [showAddModal, setShowAddModal] = useState(false); // CONTROLA MODAL DE ADIÇÃO

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
      const response = await api.get(`/api/equipmentSheet/teste`, {
        params: {
          ...filters,
          page: currentPage,
          pageSize: itemsPerPage
        }
      });
      setEquipments(response.data.data || []);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Erro ao carregar os equipamentos");
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
    if (selectedEquipment === equipment.barcode) {
      handleSelectEquipment(null);
    } else {
      handleSelectEquipment(equipment);
    }
  };

  const handleAddEquipment = (newEquipment) => {
    // Aqui pode fazer POST para API se quiser persistir
    setEquipments((prev) => [newEquipment, ...prev]);
    setShowAddModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Catálogo de Equipamentos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* BOTÃO ADICIONAR */}
          <div className="mb-3 text-end">
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              Adicionar Equipamento
            </Button>
          </div>

          <EquipmentFilter setFilters={setFilters} />
          {loading ? (
            <p>Loading Data...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : equipments.length === 0 ? (
            <p>Data not found.</p>
          ) : (
            <Container>
              {/* Desktop */}
              <EquipmentTableModal
                equipments={equipments}
                selectedEquipment={selectedEquipment}
                handleEquipmentSelection={handleEquipmentSelection}
              />
              {/* Mobile */}
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
          <Button variant="secondary" onClick={handleClosePopUp}>Fechar</Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL DE ADICIONAR EQUIPAMENTO */}
      <AddEquipmentModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onAdd={handleAddEquipment}
      />
    </>
  );
}