import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import api from "../../utils/axios";
import PaginationControl from "../pagination/PaginationControl";
import StoreFilter from "./StoreFilter";

export default function StoreCatalogModal({ show, handleClose, handleSelectStore, selectedStore }) {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 4;
    
    const [filters, setFilters] = useState({
      name: "",
      clientNIC: "",
      orderBy: "",
      email: "",
      phone: "",
      openTime: "",
      closeTime: "",
      orderDirection: "ASC"
    });
  
    const filterParams = {
      nipc: filters.name,
      name: filters.clientNIC,
      address: filters.orderBy,
      email: filters.email,
      phone: filters.phone,
      openTime: filters.openTime,
      closeTime: filters.closeTime,
      orderDirection: filters.orderDirection
    };
    
    useEffect(() => {
      const fetchStores = async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await api.get(`/api/store`, {
              params: {
                ...filterParams,
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

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Catálogo de Lojas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading Data...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : stores.length === 0 ? (
          <p>Data not found.</p>
        ) : (
            <>
            <StoreFilter setFilters={setFilters} />
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>NIPC</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Select Store</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stores.map((store) => (
                        <tr key={store.nipc}>
                        <td>{store.nipc}</td>
                        <td>{store.name}</td>
                        <td>{store.address}</td>
                        <td>
                            <Button 
                            variant={selectedStore === store.nipc ? "secondary" : "primary"} 
                            onClick={() => handleSelectStore(store)}
                            disabled={selectedStore === store.nipc}
                            >
                                {selectedStore === store.nipc ? "Selected" : "Select"}
                            </Button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <div>
                    <PaginationControl
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    />
                </div>
                    
            </>
        )}

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
