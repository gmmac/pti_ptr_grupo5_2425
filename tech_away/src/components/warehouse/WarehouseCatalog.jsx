import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Modal, Form, Tab, Tabs } from 'react-bootstrap';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import api from '../../utils/axios';
import WarehouseDisplayTable from './WarehouseDisplayTable';
import WarehouseCardView from './WarehouseCardView';
import WarehouseFilter from './WarehouseFilter';
import PaginationControl from '../pagination/PaginationControl';

export default function WarehouseCatalog() {
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(null);
  const [form, setForm] = useState({ name: '', totalSlots: '', availableSlots: '' });
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('active');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [resetFilter, setResetFilter] = useState(false);

  const onFilterChange = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      setPage(1);
    },
    []
  );

  const onTabSelect = (key) => {
    setActiveTab(key);
    setShowModal(false);
    setCurrent(null);
    setForm({ name: '', totalSlots: '', availableSlots: '' });
    setError('');
    setPage(1);
    setResetFilter((f) => !f);
    setRefreshKey((k) => k + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await api.get('/api/warehouse/displayTable', {
          params: {
            isActive: activeTab === 'active' ? '1' : '0',
            page,
            ...filters,
          },
        });
        setData(resp.data.data || []);
        setTotalPages(resp.data.totalPages || 1);
      } catch (err) {
        console.error('Error fetching warehouses:', err);
      }
    };
    fetchData();
  }, [activeTab, page, refreshKey, filters]);

  const handleAdd = () => {
    setCurrent(null);
    setForm({ name: '', totalSlots: '', availableSlots: '' });
    setError('');
    setShowModal(true);
  };

  const handleEdit = (wh) => {
    setCurrent(wh);
    setForm({
      name: wh.name,
      totalSlots: wh.totalSlots.toString(),
      availableSlots: wh.availableSlots.toString(),
    });
    setError('');
    setShowModal(true);
  };

  const handleToggle = async (wh) => {
    try {
      await api.patch(`/api/warehouse/activation/${wh.id}`);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error('Error toggling warehouse:', err);
    }
  };

  const handleSave = () => {
    if (!form.name || !form.totalSlots || !form.availableSlots) {
      setError('All fields are required');
      return;
    }

    const total = parseInt(form.totalSlots, 10);
    const avail = parseInt(form.availableSlots, 10);
    if (avail > total) {
      setError('Available slots cannot exceed total slots');
      return;
    }

    const action = current ? 'update' : 'create';
    confirmDialog({
      message: `Are you sure you want to ${action} this warehouse?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          if (current) {
            await api.put(`/api/warehouse/${current.id}`, {
              name: form.name,
              totalSlots: parseInt(form.totalSlots, 10),
              availableSlots: parseInt(form.availableSlots, 10),
            });
          } else {
            await api.post('/api/warehouse', {
              name: form.name,
              totalSlots: parseInt(form.totalSlots, 10),
              availableSlots: parseInt(form.availableSlots, 10),
            });
          }
          setShowModal(false);
          setError('');
          setRefreshKey((k) => k + 1);
        } catch (err) {
          console.error('Error saving warehouse:', err);
          setError('Error saving warehouse');
        }
      },
    });
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-end mb-3">
          <Button onClick={handleAdd} style={{ backgroundColor: 'var(--variant-one)', border: 'none' }}>Add Warehouse</Button>
      </div>

      <Tabs
        id="wh-tabs"
        activeKey={activeTab}
        onSelect={onTabSelect}
        className="mb-3 custom-manage-tabs mb-3"
      >
        {['active', 'inactive'].map((key) => (
          <Tab
            key={key}
            eventKey={key}
            title={key === 'active' ? 'Active Warehouses' : 'Deleted Warehouses'}
          >
            <WarehouseDisplayTable
              isActiveFilter={key === 'active' ? '1' : '0'}
              onDelete={handleToggle}
              onEdit={handleEdit}
              refreshKey={refreshKey}
            />

            <div className="d-lg-none">
              <WarehouseFilter
                filters={filters}
                onFilterChange={onFilterChange}
                resetFilter={resetFilter}
              />
              {data.length === 0 ? (
                <p>No data found</p>
              ) : (
                <WarehouseCardView
                  warehouses={data}
                  isActiveFilter={key === 'active' ? '1' : '0'}
                  onEdit={handleEdit}
                  onDelete={handleToggle}
                />
              )}
              <PaginationControl
                currentPage={page}
                totalPages={totalPages}
                handlePageChange={setPage}
              />
            </div>
          </Tab>
        ))}
      </Tabs>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {current ? 'Edit Warehouse' : 'Add Warehouse'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setError('');
                }}
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTotalSlots">
              <Form.Label>Total Slots</Form.Label>
              <Form.Control
                type="number"
                value={form.totalSlots}
                onChange={(e) =>
                  setForm({ ...form, totalSlots: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAvailableSlots">
              <Form.Label>Available Slots</Form.Label>
              <Form.Control
                type="number"
                value={form.availableSlots}
                onChange={(e) =>
                  setForm({ ...form, availableSlots: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {current ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}