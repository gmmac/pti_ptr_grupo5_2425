import React, { useEffect, useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import api from "../../utils/axios";
import PaginationControl from "../pagination/PaginationControl";
import EquipmentFilter from "./EquipmentFilter";
import EquipmentTableModal from "./EquipmentTableModal";
import EquipmentCardModal from "./EquipmentCardModal";
import AddEquipmentModal from "./AddEquipmentModal"; // <- novo modal

export default function EquipmentCatalogModal({
  show,
  handleClose,
  handleSelectEquipment,
  selectedEquipment,
}) {
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
    orderDirection: "ASC",
  });

  const [showAddModal, setShowAddModal] = useState(false); // <- novo estado

  const handleClosePopUp = () => {
    handleClose();
    setFilters({
      barcode: "",
      model: "",
      releaseYear: "",
      type: "",
      orderDirection: "ASC",
    });
  };

  const handleAddEquipment = async (newEquipment) => {
    try {
      await api.post("/api/equipmentSheet", newEquipment);
      // Recarrega os dados
      setCurrentPage(1);
      setFilters({ ...filters }); // força novo fetch
    } catch (error) {
      console.error("Erro ao adicionar equipamento:", error);
    }
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/equipmentSheet/teste`, {
          params: {
            ...filters,
            page: currentPage,
            pageSize: itemsPerPage,
          },
        });
        setEquipments(response.data.data || []);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Erro ao carregar os equipamentos");
      }
      setLoading(false);
    };

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

  // const handleAddEquipment = (newEquipment) => {
  //   // Aqui pode fazer POST para API se quiser persistir
  //   setEquipments((prev) => [newEquipment, ...prev]);
  //   setShowAddModal(false);
  // };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Catálogo de Equipamentos</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>

          {/* BOTAO ADICIONAR EQUIPAMENTO -------------------------------------------------------------------------*/}
          {/* <Button
            variant="primary"
            className="ms-3"
            onClick={() => setShowAddModal(true)}
          >
            + Adicionar Equipamento
          </Button> */}
          
          <EquipmentFilter setFilters={setFilters} />
          {loading ? (
            <p>Loading Data...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : equipments.length === 0 ? (
            <p>Data not found.</p>
          ) : (
            <Container>
              <EquipmentTableModal
                equipments={equipments}
                selectedEquipment={selectedEquipment}
                handleEquipmentSelection={handleEquipmentSelection}
              />
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
          <Button variant="secondary" onClick={handleClosePopUp}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de adicionar equipamento */}
      <AddEquipmentModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSubmit={handleAddEquipment}
      />
    </>
  );
}
