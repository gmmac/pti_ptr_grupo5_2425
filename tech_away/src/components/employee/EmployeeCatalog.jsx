import React, { useEffect, useState } from 'react';
import { Button, Container, Stack, Tabs, Tab, Spinner, Alert } from 'react-bootstrap';
import { PaginationProvider } from '../../contexts/PaginationContext';
import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';
import EmployeeCardView from './EmployeeCardView';
import EmployeesTableView from './EmployeeTableView';
import EmployeeFilter from './EmployeeFilter';
import { useNavigate } from 'react-router-dom';
import EmployeeEditModal from './EmployeeEditModal';
import { useAuthEmployee } from '../../contexts/AuthenticationProviders/EmployeeAuthProvider';

export default function EmployeeCatalog() {
  const { toggleActivateAccount } = useAuthEmployee();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]); // dados ativos ou inativos, dependendo da aba
  const [activeTab, setActiveTab] = useState("active"); // 'active' ou 'inactive'

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const itemsPerPage = 4;

  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [resetFilter, setResetFilter] = useState(0);


  const [filters, setFilters] = useState({
    nic: "",
    nif: "",
    internNum: "",
    storeNIPC: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    role: "",
    orderDirection: "ASC",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreateEmployee = () => {
    navigate("/employee/register");
  };

  const togleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
    setResetFilter(prev => prev + 1);
  };
  

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const isActive = activeTab === "active" ? "1" : "0";

      const response = await api.get('/api/employee/', {
        params: {
          ...filters,
          active: isActive,
          page: currentPage,
          // pageSize: itemsPerPage,
        },
      });

      setEmployees(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Erro ao buscar funcionários.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, filters, refresh, activeTab]);

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleSaveEditedEmployee = (id, updatedData) => {
    api.put(`/api/employee/${id}`, updatedData)
      .then(() => {
        setShowEditModal(false);
        setSelectedEmployee(null);
        togleRefresh();
      })
      .catch((err) => console.error("Edit error:", err.message));
  };

  const handleToggleActivationAccount = async (internNum) => {
    try {
      await toggleActivateAccount(internNum);
      togleRefresh();
    } catch (error) {
      console.error("Error toggling activation:", error.message);
    }
  };

  const renderView = () => (
    <>
      <EmployeesTableView employees={employees} onEdit={handleEditEmployee} onDelete={handleToggleActivationAccount} />
      <EmployeeCardView employees={employees} onEdit={handleEditEmployee} onDelete={handleToggleActivationAccount} />
    </>
  );

  return (
    <Container className="py-4">
      <EmployeeFilter filters={filters} onFilterChange={handleFilterChange} resetFilter={resetFilter} />

      <Stack direction='horizontal' gap={3} className="justify-content-center my-3">
        <Button variant="primary" size="lg" className="shadow-sm" onClick={handleCreateEmployee}>
          + Create New Employee
        </Button>
      </Stack>

      <PaginationProvider>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Tabs
            id="employees-tabs"
            activeKey={activeTab}
            onSelect={handleTabChange}
            className="mb-3"
          >
            <Tab eventKey="active" title="Active Employees">
              {renderView()}
            </Tab>
            <Tab eventKey="inactive" title="Inactive Employees">
              {renderView()}
            </Tab>
          </Tabs>
        )}

        <EmployeeEditModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          employee={selectedEmployee}
          onSave={handleSaveEditedEmployee}
        />
      </PaginationProvider>

      <PaginationControl
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </Container>
  );
}
