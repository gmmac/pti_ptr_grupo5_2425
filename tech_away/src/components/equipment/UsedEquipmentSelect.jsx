import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Container } from "react-bootstrap";
import api from "../../utils/axios";
import PaginationControl from "../pagination/PaginationControl";
import UsedEquipmentFilter from "./UsedEquipmentFilter";
import UsedEquipmentTableModal from "./UsedEquipmentTableModal";
import UsedEquipmentCardModal from "./UsedEquipmentCardModal";

export default function UsedEquipmentSelect({ show, handleClose, handleSelectUsedEquipment, selectedUsedEquipment }) {
    const [usedEquipments, setUsedEquipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 4;
    
    const [filters, setFilters] = useState({
        id: "",
        price: "",
        equipmentId: "",
        storeId: "",
        orderDirection: "ASC"
    });

    const handleClosePopUp = () => {
      handleClose()
      setFilters({
        id: "",
        price: "",
        equipmentId: "",
        storeId: "",
        orderDirection: "ASC"
      })
    }
  
    useEffect(() => {
      const fetchUsedEquipments = async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await api.get(`/api/usedEquipment/usedEquipmentRepairs`, {
              params: {
                ...filters,
                page: currentPage,
                pageSize: itemsPerPage
              }
            });
            setUsedEquipments(response.data.data || []);
            setTotalPages(response.data.totalPages);
          } catch (err) {
            setError("Error loading used equipments");
          }
          setLoading(false);
      };
  
      if (show) {
        fetchUsedEquipments();
      }
    }, [show, currentPage, filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleUsedEquipmentSelection = (usedEquipment) => {
    if (selectedUsedEquipment === usedEquipment.id) {
        handleSelectUsedEquipment(null);
    } else {
        handleSelectUsedEquipment(usedEquipment);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Used Equipments Catalog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UsedEquipmentFilter setFilters={setFilters} />
        {loading ? (
          <p>Loading Data...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : usedEquipments.length === 0 ? (
          <p>Data not found.</p>
        ) : (
          <Container>
              {/* Desktop */}
              {usedEquipments && <UsedEquipmentTableModal equipments={usedEquipments} selectedUsedEquipment={selectedUsedEquipment} handleUsedEquipmentSelection={handleUsedEquipmentSelection} /> }
              {/* Mobile */}
              {usedEquipments.map((usedEquipment) => {
                return <UsedEquipmentCardModal 
                  key={usedEquipment.id} 
                  equipment={usedEquipment} 
                  selectedUsedEquipment={selectedUsedEquipment} 
                  handleUsedEquipmentSelection={handleUsedEquipmentSelection} 
                  />
              })}

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
  );
}