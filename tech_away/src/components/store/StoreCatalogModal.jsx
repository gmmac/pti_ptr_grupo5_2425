import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Container } from "react-bootstrap";
import api from "../../utils/axios";
import PaginationControl from "../pagination/PaginationControl";
import StoreFilter from "./StoreFilter";
import StoreTableModal from "./StoreTableModal";
import StoreCardModal from "./StoreCardModal";

export default function StoreCatalogModal({ show, handleClose, handleSelectStore, selectedStore }) {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 4;
    
    const [filters, setFilters] = useState({
      nipc: "",
      name: "",
      address: "",
      email: "",
      phone: "",
      openTime: "",
      closeTime: "",
      orderDirection: "ASC"
    });
  
    useEffect(() => {
      const fetchStores = async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await api.get(`/api/store`, {
              params: {
                ...filters,
                page: currentPage,
                pageSize: itemsPerPage
              }
            });
            setStores(response.data.data);
            setTotalPages(response.data.totalPages);
          } catch (err) {
            setError("Erro ao carregar as lojas");
          }
          setLoading(false);
      };
  
      if (show) {
        fetchStores();
      }
    }, [show, currentPage, filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStoreSelection = (store) => {
    if (selectedStore === store.nipc) {
      handleSelectStore(null);
    } else {
      handleSelectStore(store);
    }
  };

  const handleModalClose = () => {
    setFilters({
      nipc: "",
      name: "",
      address: "",
      email: "",
      phone: "",
      openTime: "",
      closeTime: "",
      orderDirection: "ASC"
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Catálogo de Lojas</Modal.Title>
      </Modal.Header>
      <Modal.Body    
        style={{ 
          minHeight: '450px'
        }}> {/* Fixar o tamanho do body para n estar a mudar*/}
        <StoreFilter setFilters={setFilters} />
        
        {loading ? (
          <p>Loading Data...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : stores.length === 0 ? (
          <p>Data not found.</p>
        ) : (
          <Container>
              {/* Desktop */}
              <StoreTableModal stores={stores} selectedStore={selectedStore} handleStoreSelection={handleStoreSelection} /> 
              {/* Mobile */}
              {stores.map((s) => {
                return <StoreCardModal 
                  key={s.nipc} 
                  store={s} 
                  selectedStore={selectedStore} 
                  handleStoreSelection={handleStoreSelection} 
                  />
              })}
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