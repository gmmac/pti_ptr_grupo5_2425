import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Alert
} from 'react-bootstrap';
import UsedEquipmentDisplayTable from './UsedEquipmentDisplayTable';
import UsedEquipmentCardView from './UsedEquipmentCardView';
import UsedEquipmentFilter from './UsedEquipmentFilter';
import PaginationControl from '../pagination/PaginationControl';
import api from '../../utils/axios';

export default function UsedEquipmentCatalog() {
  const [activeTab, setActiveTab] = useState('active');
  const [error, setError] = useState('');
  const [usedEquipments, setUsedEquipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const [refreshKey, setRefreshKey] = useState(0);
  const [resetFilter, setResetFilter] = useState(false);

  const defaultFilters = {
    usedEquipmentId: '',
    Barcode: '',
    EquipmentType: '',
    BrandModel: '',
    Store: '',
    Status: '',
    sortField: 'id',
    sortOrder: 'ASC'
  };

  const [filters, setFilters] = useState(defaultFilters);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const fetchUsedEquipments = async () => {
    try {
      const endpoint = '/api/usedEquipment/displayTable';
      const params = {
        page: currentPage,
        pageSize: itemsPerPage,
        ...filters
      };

      switch (activeTab) {
        case 'inactive':
          params.allTag = '0';
          break;
        case 'donated':
          params.action = 'D';
          break;
        case 'sold':
          params.action = 'S';
          break;
        case 'new':
          params.allTag = 'new';
          break;
        default:
          params.allTag = '1';
          break;
      }

      const resp = await api.get(endpoint, { params });
      setUsedEquipments(resp.data.data || []);
      setTotalPages(resp.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar equipamentos usados.');
    }
  };

  useEffect(() => {
    fetchUsedEquipments();
  }, [activeTab, currentPage, filters, refreshKey]);

  const handleEdit = (item) => {
    console.log("Edit item", item);
  };

  const handleToggleActivation = async (id) => {
    try {
      await api.patch(`/api/usedEquipment/toggle/${id}`);
      setRefreshKey(k => k + 1);
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar status.');
    }
  };

  const onTabSelect = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
    setFilters(defaultFilters);
    setResetFilter(r => !r);
  };

  const putOnSale = async (equipment, price) => {
    try {
      await api.patch(`/api/usedEquipment/${equipment.id}`, { putOnSaleDate: new Date(), price: price });
      setRefreshKey(k => k + 1);
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar status.');
    }
  };

  const renderTabContent = ({ tableFilterProps = {}, cardFilterProps = {} }) => (
    <>
      {/* DESKTOP */}
      <div className="d-none d-lg-block">
        <UsedEquipmentDisplayTable
          {...tableFilterProps}
          refreshKey={refreshKey}
          onOpenDetails={handleEdit}
          putOnSale={putOnSale}
        />
      </div>

      {/* MOBILE */}
      <div className="d-lg-none">
        <UsedEquipmentFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          resetFilter={resetFilter}
        />

        {usedEquipments.length === 0 ? (
          "No data found"
        ) : (
          <UsedEquipmentCardView
            usedEquipments={usedEquipments}
            {...cardFilterProps}
            onEdit={handleEdit}
            onDelete={handleToggleActivation}
            putOnSale={putOnSale}
          />
        )}

        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={setCurrentPage}
        />
      </div>
    </>
  );

  return (
    <Container className="py-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs activeKey={activeTab} onSelect={onTabSelect} className="custom-manage-tabs mb-3">
        <Tab eventKey="active" title="All Equipments">
          {renderTabContent({
            tableFilterProps: { isActiveFilter: "1" },
            cardFilterProps: { isActiveFilter: "1" }
          })}
        </Tab>

        <Tab eventKey="new" title="New Equipments">
          {renderTabContent({
            tableFilterProps: { isActiveFilter: "new" },
            cardFilterProps: { isActiveFilter: "new" }
          })}
        </Tab>

        <Tab eventKey="inactive" title="Equipments for Sale">
          {renderTabContent({
            tableFilterProps: { isActiveFilter: "0" },
            cardFilterProps: { isActiveFilter: "0" }
          })}
        </Tab>

        <Tab eventKey="donated" title="Donated Equipments">
          {renderTabContent({
            tableFilterProps: { actionFilter: "D" },
            cardFilterProps: { actionFilter: "D" }
          })}
        </Tab>

        <Tab eventKey="sold" title="Sold Equipments">
          {renderTabContent({
            tableFilterProps: { actionFilter: "S" },
            cardFilterProps: { actionFilter: "S" }
          })}
        </Tab>
      </Tabs>
    </Container>
  );
}
