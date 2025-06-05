import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Modal, Form, Tab, Tabs } from 'react-bootstrap';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import api from '../../../utils/axios';
import EquipmentStatusDisplayTable from './EquipmentStatusDisplayTable';
import EquipmentStatusCardView from './EquipmentStatusCardView';
import EquipmentStatusFilter from './EquipmentStatusFilter';
import PaginationControl from '../../pagination/PaginationControl';

export default function EquipmentStatusCatalog() {
  const [showModal, setShowModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [statusName, setStatusName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('active');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ state: '' });
  const [resetFilter, setResetFilter] = useState(false);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const onTabSelect = (key) => {
    setActiveTab(key);
    setShowModal(false);
    setCurrentStatus(null);
    setStatusName('');
    setErrorMessage('');
    setCurrentPage(1);
    setResetFilter((r) => !r);
    setRefreshKey((k) => k + 1);
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const isActiveVal = activeTab === 'active' ? '1' : '0';
        const resp = await api.get('/api/equipmentStatus/displayTable', {
          params: {
            isActive: isActiveVal,
            page: currentPage,
            ...filters,
          },
        });
        setStatuses(resp.data.data || []);
        setTotalPages(resp.data.totalPages || 1);
      } catch (err) {
        console.error('Error fetching statuses:', err);
      }
    };
    fetchStatuses();
  }, [activeTab, currentPage, refreshKey, filters]);

  const handleAdd = () => {
    setCurrentStatus(null);
    setStatusName('');
    setErrorMessage('');
    setShowModal(true);
  };

  const handleEdit = (status) => {
    setCurrentStatus(status);
    setStatusName(status.state);
    setErrorMessage('');
    setShowModal(true);
  };

  const handleToggle = async (status) => {
    try {
      await api.patch(`/api/equipmentStatus/activation/${status.id}`);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error('Error toggling status activation:', err);
    }
  };

  const handleSave = () => {
    if (!statusName.trim()) {
      setErrorMessage('Status name cannot be empty.');
      return;
    }
    const action = currentStatus ? 'update' : 'create';
    confirmDialog({
      message: `Are you sure you want to ${action} this status?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          if (currentStatus) {
            await api.put(`/api/equipmentStatus/${currentStatus.id}`, { state: statusName });
          } else {
            await api.post('/api/equipmentStatus', { state: statusName });
          }
          setShowModal(false);
          setErrorMessage('');
          setRefreshKey((k) => k + 1);
        } catch (err) {
          console.error('Error saving status:', err);
          setErrorMessage(err.response?.data?.message || 'Error saving status.');
        }
      },
    });
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-end mb-3">
        <Button
          onClick={handleAdd}
          style={{ backgroundColor: 'var(--variant-one)', border: 'none' }}
        >
          Add Status
        </Button>
      </div>

      <Tabs
        id="status-tabs"
        activeKey={activeTab}
        onSelect={onTabSelect}
        className="custom-manage-tabs mb-3"
      >
        {['active', 'inactive'].map((key) => (
          <Tab
            key={key}
            eventKey={key}
            title={key === 'active' ? 'Active Statuses' : 'Deleted Statuses'}
          >
            <EquipmentStatusDisplayTable
              isActiveFilter={key === 'active' ? '1' : '0'}
              onDelete={handleToggle}
              onEdit={handleEdit}
              refreshKey={refreshKey}
            />

            <div className="d-lg-none">
              <EquipmentStatusFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                resetFilter={resetFilter}
              />

              {statuses.length === 0 ? (
                <p>No data found</p>
              ) : (
                <EquipmentStatusCardView
                  statuses={statuses}
                  isActiveFilter={key === 'active' ? '1' : '0'}
                  onEdit={handleEdit}
                  onDelete={handleToggle}
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
          <Modal.Title>
            {currentStatus ? 'Edit Status' : 'Add Status'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formStatusName">
              <Form.Label>Status Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter status name"
                value={statusName}
                onChange={(e) => { setStatusName(e.target.value); setErrorMessage(''); }}
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
          <Button variant="primary" onClick={handleSave}>
            {currentStatus ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}