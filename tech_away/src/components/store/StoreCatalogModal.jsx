import React, { useEffect, useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
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
    nipc: '',
    name: '',
    email: '',
    phone: '',
    address: '' });

  const fetchStores = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/api/store', { params: { ...filters, page: currentPage, pageSize: itemsPerPage } });
      setStores(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch {
      setError("Erro ao carregar as lojas");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (show) fetchStores();
  }, [show, currentPage, filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleClosePopUp = () => {
    handleClose();
    setFilters({     nipc: '',
    name: '',
    email: '',
    phone: '',
    address: '' });
  };

    const handleStoreSelection = (store) => {
    handleSelectStore(
      selectedStore === store.nipc
        ? null
        : store
    );
  };

  return (
    <Modal
      show={show}
      onHide={handleClosePopUp}
      onExited={() => setFilters({     nipc: '',
    name: '',
    email: '',
    phone: '',
    address: '' })}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Catálogo de Lojas</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: '450px' }}>
        <StoreFilter onFilterChange={setFilters} filters={filters} />

        {loading ? (
          <p>Loading Data...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : stores.length === 0 ? (
          <p>Data not found.</p>
        ) : (
          <Container>
            <StoreTableModal
              stores={stores}
              selectedStore={selectedStore}
              handleStoreSelection={handleStoreSelection}
            />
            {stores.map((s) => (
              <StoreCardModal
                key={s.nipc}
                store={s}
                selectedStore={selectedStore}
                handleStoreSelection={handleStoreSelection}
              />
            ))}
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Modal.Footer>
    </Modal>
  );
}
