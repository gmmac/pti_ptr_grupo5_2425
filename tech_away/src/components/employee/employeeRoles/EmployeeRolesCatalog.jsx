// src/components/EmployeeRolesCatalog.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Modal, Form, Tab, Tabs } from 'react-bootstrap';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import api from '../../../utils/axios';
import EmployeeRolesDisplayTable from './EmployeeRolesDisplayTable';
import EmployeeRolesCardView from './EmployeeRolesCardView';
import PaginationControl from '../../pagination/PaginationControl';
import EmployeeRolesFilter from './EmployeeRolesFilter';

export default function EmployeeRolesCatalog() {
  // Modal & CRUD state
  const [showModal, setShowModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Data & refresh
  const [roles, setRoles] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Tabs (active/inactive)
  const [activeTab, setActiveTab] = useState('active');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [filters, setFilters] = useState({ role: '' });
  const [resetFilter, setResetFilter] = useState(false);
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const onTabSelect = (key) => {
    setActiveTab(key);
    setShowModal(false);
    setCurrentRole(null);
    setRoleName('');
    setErrorMessage('');
    setCurrentPage(1);
    setResetFilter(r => !r);
    setRefreshKey(k => k + 1);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const isActiveVal = activeTab === 'active' ? '1' : '0';
        const resp = await api.get('/api/employeeRole/displayTable', {
          params: {
            isActive: isActiveVal,
            page: currentPage,
            ...filters
          }
        });
        setRoles(resp.data.data || []);
        setTotalPages(resp.data.totalPages || 1);
      } catch (err) {
        console.error('Error fetching roles:', err);
      }
    };
    fetchRoles();
  }, [activeTab, currentPage, refreshKey, filters]);

  const handleAddRole = () => {
    setCurrentRole(null);
    setRoleName('');
    setErrorMessage('');
    setShowModal(true);
  };

  const handleEditRole = (role) => {
    setCurrentRole(role);
    setRoleName(role.role);
    setErrorMessage('');
    setShowModal(true);
  };

  const handleToggleRole = async (role) => {
    try {
      await api.patch(`/api/employeeRole/activation/${role.id}`);
      setRefreshKey(k => k + 1);
    } catch (err) {
      console.error('Error toggling activation:', err);
    }
  };

  const handleSaveRole = () => {
    if (!roleName.trim()) {
      setErrorMessage('Role name cannot be empty.');
      return;
    }
    const action = currentRole ? 'update' : 'create';
    confirmDialog({
      message: `Are you sure you want to ${action} this role?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          if (currentRole) {
            await api.put(`/api/employeeRole/${currentRole.id}`, { role: roleName });
          } else {
            await api.post('/api/employeeRole', { role: roleName, isActive: '1' });
          }
          setShowModal(false);
          setErrorMessage('');
          setRefreshKey(k => k + 1);
        } catch (err) {
          console.error('Error saving role:', err);
          setErrorMessage(err.response?.data?.message || 'Error saving role.');
        }
      }
    });
  };

  return (
    <>
      <Container className="mt-4">
        <div className="d-flex justify-content-end mb-3">
          <Button
            onClick={handleAddRole}
            style={{ backgroundColor: 'var(--variant-one)', border: 'none' }}
          >
            Add Role
          </Button>
        </div>

        <Tabs
          id="roles-tabs"
          activeKey={activeTab}
          onSelect={onTabSelect}
          className="custom-manage-tabs mb-3"
        >
          {['active','inactive'].map(key => (
            <Tab key={key} eventKey={key} title={key === 'active' ? 'Active Roles' : 'Deleted Roles'}>
              <EmployeeRolesDisplayTable
                isActiveFilter={key === 'active' ? '1' : '0'}
                onDelete={handleToggleRole}
                onEdit={handleEditRole}
                refreshKey={refreshKey}
              />

              <div className="d-lg-none">
                <EmployeeRolesFilter
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  resetFilter={resetFilter}
                />

                {roles.length === 0 ? (
                  <p>No data Found</p>
                ) : (
                  <EmployeeRolesCardView
                    roles={roles}
                    isActiveFilter={key === 'active' ? '1' : '0'}
                    onEdit={handleEditRole}
                    onDelete={handleToggleRole}
                  />
                )}

                <PaginationControl
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={setCurrentPage}
                />
              </div>
            </Tab>
          ))}
        </Tabs>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{currentRole ? 'Edit Role' : 'Add Role'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Role Name</Form.Label>
                <Form.Control
                  type="text"
                  value={roleName}
                  onChange={e => { setRoleName(e.target.value); setErrorMessage(''); }}
                  placeholder="Enter role name"
                  isInvalid={!!errorMessage}
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveRole}>
              {currentRole ? 'Update' : 'Save'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

    </>
  );
}
