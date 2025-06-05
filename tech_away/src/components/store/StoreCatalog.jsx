import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Tab, Tabs } from 'react-bootstrap';
import { confirmDialog } from 'primereact/confirmdialog';
import api from '../../utils/axios';
import StoreDisplayTable from './StoreDisplayTable';
import StoreCardView from './StoreCardView';
import StoreFilter from './StoreFilter';
import PaginationControl from '../pagination/PaginationControl';
import CreateStore from './CreateStore';

export default function StoreCatalog() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [storeToEdit, setStoreToEdit] = useState(null);
  const [stores, setStores] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('active');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ name: '' });
  const [resetFilter, setResetFilter] = useState(false);

  const handleFilterChange = useCallback(newFilters => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const onTabSelect = key => {
    setActiveTab(key);
    setStoreToEdit(null);
    setShowFormModal(false);
    setCurrentPage(1);
    setResetFilter(r => !r);
    setRefreshKey(k => k + 1);
  };

  useEffect(() => {
    async function fetchStores() {
      try {
        const isActiveVal = activeTab === 'active' ? '1' : '0';
        const resp = await api.get('/api/store/displayTable', {
          params: { isActive: isActiveVal, page: currentPage, ...filters }
        });
        setStores(resp.data.data);
        setTotalPages(resp.data.totalPages);
      } catch (e) {
        console.error(e);
      }
    }
    fetchStores();
  }, [activeTab, currentPage, refreshKey, filters]);

  const handleAdd = () => {
    setStoreToEdit(null);
    setShowFormModal(true);
  };

  const handleEdit = store => {
    setStoreToEdit(store);
    setShowFormModal(true);
  };

  const handleToggle = async store => {
    await api.patch(`/api/store/activation/${store.nipc}`);
    setRefreshKey(k => k + 1);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={handleAdd} style={{ backgroundColor: 'var(--variant-one)', border: 'none' }}>
          Add Store
        </Button>
      </div>

      <Tabs id="store-tabs" activeKey={activeTab} onSelect={onTabSelect} className="custom-manage-tabs mb-3">
        {['active', 'inactive'].map(key => (
          <Tab key={key} eventKey={key} title={key === 'active' ? 'Active Stores' : 'Deleted Stores'}>
            <StoreDisplayTable
              isActiveFilter={key === 'active' ? '1' : '0'}
              onDelete={handleToggle}
              onEdit={handleEdit}
              refreshKey={refreshKey}
            />
            <div className="d-lg-none">
              <StoreFilter filters={filters} onFilterChange={handleFilterChange} resetFilter={resetFilter} />
              {stores.length === 0 ? (
                <p>No data found</p>
              ) : (
                <StoreCardView
                  stores={stores}
                  isActiveFilter={key === 'active' ? '1' : '0'}
                  onEdit={handleEdit}
                  onDelete={handleToggle}
                />
              )}
              <PaginationControl currentPage={currentPage} totalPages={totalPages} handlePageChange={setCurrentPage} />
            </div>
          </Tab>
        ))}
      </Tabs>

      <CreateStore
        show={showFormModal}
        onClose={() => setShowFormModal(false)}
        storeToEdit={storeToEdit}
        onSuccess={() => {
          setShowFormModal(false);
          setRefreshKey(k => k + 1);
        }}
      />
    </Container>
  );
}
