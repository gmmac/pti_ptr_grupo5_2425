import React, { useEffect, useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import api from "../../utils/axios";
import PaginationControl from "../pagination/PaginationControl";
import ClientFilter from "./ClientFilter";
import ClientTableModal from "./ClientTableModal";
import ClientCardModal from "./ClientCardModal";

export default function ClientCatalogModal({ show, handleClose, handleSelectClient, selectedClient }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const itemsPerPage = 4;

  const [filters, setFilters] = useState({
    nic: "",
    name: "",
    email: "",
    phone: "",
    orderBy: "nic",
    orderDirection: "ASC"
  });

  const handleClosePopUp = () => {
    handleClose();
    setFilters({
      nic: "",
      name: "",
      email: "",
      phone: "",
      orderBy: "nic",
      orderDirection: "ASC"
    });
  };

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/client`, {
          params: {
            ...filters,
            page: currentPage,
            pageSize: itemsPerPage
          }
        });
        setClients(response.data.data || []);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Erro ao carregar os clientes");
      }
      setLoading(false);
    };

    if (show) {
      fetchClients();
    }
  }, [show, currentPage, filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleClientSelection = (client) => {
    handleSelectClient(
      selectedClient === client.nic
        ? null
        : client
    );
  };

  return (
    <Modal show={show} onHide={handleClosePopUp} 
    onExited={() =>{    
      setFilters({
        nic: "",
        name: "",
        email: "",
        phone: "",
        orderBy: "nic",
        orderDirection: "ASC"
      });
    }} 
    size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>All clients</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <ClientFilter setFilters={setFilters} />

        {loading ? (
          <p>Loading Data...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : clients.length === 0 ? (
          <p>Data not found.</p>
        ) : (
          <Container>
            {/* Versão desktop */}
            <ClientTableModal
              clients={clients}
              selectedClient={selectedClient}
              handleClientSelection={handleClientSelection}
            />
            {/* Versão mobile */}
            {clients.map(c => (
              <ClientCardModal
                key={c.nic}
                client={c}
                selectedClient={selectedClient}
                handleClientSelection={handleClientSelection}
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
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
