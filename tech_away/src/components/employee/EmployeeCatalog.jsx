// src/components/EmployeeCatalog.jsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Container,
  Tabs,
  Tab,
  Alert,
  Row,
  Col
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthEmployee } from '../../contexts/AuthenticationProviders/EmployeeAuthProvider';
import EmployeeDisplayTable from './EmployeeDisplayTable';
import EmployeeEditModal from './EmployeeEditModal';
import EmployeeCardView from './EmployeeCardView';
import EmployeeFilter from './EmployeeFilter';
import api from "../../utils/axios";
import PaginationControl from '../pagination/PaginationControl';

export default function EmployeeCatalog() {
  const navigate = useNavigate();
  const { toggleActivateAccount } = useAuthEmployee();

  const [activeTab, setActiveTab] = useState('active');
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    internNum: '',
    employeeName: '',
    email: '',
    phone: '',
    store: '',
    role: ''
  });
  const [resetFilter, setResetFilter] = useState(false);

  // Função estável para aplicar filtros
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // Busca de dados combinando filtros + aba + paginação
  const fetchEmployees = async () => {
    try {
      const isActive = activeTab === 'active' ? '1' : '0';
      const resp = await api.get('/api/employee/displayTable', {
        params: {
          isActive,
          page: currentPage,
          pageSize: itemsPerPage,
          ...filters
        }
      });
      setEmployees(resp.data.data || []);
      setTotalPages(resp.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar funcionários.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [activeTab, currentPage, filters, refreshKey]);

  // Ações CRUD e toggle
  const handleCreateEmployee = () => navigate('/employee/register');
  const handleEditEmployee = emp => {
    setSelectedEmployee(emp);
    setShowEditModal(true);
  };
  const handleSaveEditedEmployee = async (internNum, payload) => {
    await api.put(`/api/employee/${internNum}`, payload);
    setShowEditModal(false);
    setSelectedEmployee(null);
    setRefreshKey(k => k + 1);
  };
  const handleToggleActivation = async internNum => {
    await toggleActivateAccount(internNum);
    setRefreshKey(k => k + 1);
  };

  const onTabSelect = key => {
    setActiveTab(key);
    setCurrentPage(1);
    setResetFilter(r => !r);
  };

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col className="text-end">
          <Button
            style={{ backgroundColor: 'var(--variant-one)', border: 'none' }}
            onClick={handleCreateEmployee}
          >
            Create New Employee
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs activeKey={activeTab} onSelect={onTabSelect} className="custom-manage-tabs mb-3">
        <Tab eventKey="active" title="Active Employees">
          {/* DESKTOP */}
          <div className="d-none d-lg-block">
            <EmployeeDisplayTable
              rowKey="internNum" 
              isActiveFilter="1"
              filters={filters}
              onEdit={handleEditEmployee}
              onDelete={handleToggleActivation}
              refreshKey={refreshKey}
              page={currentPage}
              pageSize={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
          {/* MOBILE */}
          
            <div className="d-lg-none">
              <EmployeeFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                resetFilter={resetFilter}
                />

              {employees.length === 0 ? (
                    "No data Found"
              ):
                <EmployeeCardView
                  employees={employees}
                  isActiveFilter="1"
                  onEdit={handleEditEmployee}
                  onDelete={handleToggleActivation}
                />
              }
              <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={setCurrentPage}
              />
            </div>
        </Tab>

        <Tab eventKey="inactive" title="Inactive Employees">
          {/* DESKTOP */}
          <div className="d-none d-lg-block">
            <EmployeeDisplayTable
              rowKey="internNum"
              isActiveFilter="0"
              filters={filters}
              onEdit={handleEditEmployee}
              onDelete={handleToggleActivation}
              refreshKey={refreshKey}
              page={currentPage}
              pageSize={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
          
            <div className="d-lg-none">
              <EmployeeFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                resetFilter={resetFilter}
              />

            {employees.length === 0 ? (
              "No data Found"
              ): 
                <EmployeeCardView
                  employees={employees}
                  isActiveFilter="0"
                  onEdit={handleEditEmployee}
                  onDelete={handleToggleActivation}
                />
              }

              <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={setCurrentPage}
              />
            </div>
        </Tab>
      </Tabs>

      {showEditModal && (
        <EmployeeEditModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          employee={selectedEmployee}
          onSave={handleSaveEditedEmployee}
        />
      )}
    </Container>
  );
}
