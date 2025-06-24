import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../../utils/axios";
import ClientFilter from "../storePurchase/ClientFilter";
import ClientTableModal from "../storePurchase/ClientTableModal";
import ClientCardModal from "../storePurchase/ClientCardModal";
import PaginationControl from "../pagination/PaginationControl";

export default function ClientsSalesStepper({ handleSelectClient, selectedClient, currentPage, setCurrentPage }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 4;

  const [filters, setFilters] = useState({
    nic: "",
    name: "",
    email: "",
    phone: "",
    orderBy: "nic",
    orderDirection: "ASC"
  });

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

    fetchClients();
  }, [currentPage, filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleClientSelection = (client) => {
    handleSelectClient(
      selectedClient === client.nic ? null : client,
      currentPage
    );
  };

  return (
    <div>
      <ClientFilter setFilters={setFilters} />

      {loading ? (
        <p>Loading Data...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : clients.length === 0 ? (
        <p>Data not found.</p>
      ) : (
        <Container>
          <ClientTableModal
            clients={clients}
            selectedClient={selectedClient}
            handleClientSelection={handleClientSelection}
          />

          {clients.map(c => (
            <ClientCardModal
              key={c.nic}
              client={c}
              selectedClient={selectedClient}
              handleClientSelection={handleClientSelection}
              className={selectedClient === c.nic ? "client-selected" : ""}
            />
          ))}

          <PaginationControl
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Container>
      )}
      <style>{`
        .client-selected {
          border: 2px solid var(--variant-one);
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}
