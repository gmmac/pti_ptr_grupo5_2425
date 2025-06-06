import React, { useEffect, useState } from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';
import UsedEquipmentTableModal from './UsedEquipmentTableModal';
import UsedEquipmentCardModal from './UsedEquipmentCardModal';
import UsedEquipmentFilter from './UsedEquipmentFilter';
import StorePurchaseForms from '../storePurchase/StorePurchaseForms';

const initialFilters = {
  usedEquipmentId: '',
  Barcode: '',
  BrandModel: '',
  EquipmentType: '',
  sortField: 'id',
  sortOrder: 'ASC',
};

export default function UsedEquipmentCatalogModal({
  show,
  handleClose,
  handleSelectEquipment,
  selectedEquipmentID,
}) {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showStorePurchaseForm, setShowStorePurchaseForm] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [refreshCounter, setRefreshCounter] = useState(0);


  const handleClosePopUp = () => {
    handleClose();
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/api/usedEquipment/displayTable', {
          params: { ...filters, page: currentPage, storePurchasePrice: '0' },
        });
        setEquipments(response.data.data || []);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError('Error loading used equipment');
      }
      setLoading(false);
    };

    if (show) fetchEquipments();
  }, [show, currentPage, filters, refreshCounter]);


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const onSelect = (equipment) => {
    if (selectedEquipmentID === equipment.id) {
      handleSelectEquipment(null);
    } else {
      handleSelectEquipment(equipment);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClosePopUp}
      onExited={() => setFilters(initialFilters)}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Catalog of Used Equipment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3 text-end">
          <Button variant="primary" onClick={() => setShowStorePurchaseForm(true)}>
            Add New Used Equipment
          </Button>
        </div>

        <UsedEquipmentFilter filters={filters} onFilterChange={setFilters} resetFilter={false} />

        {loading ? (
          <p>Loading Data...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : equipments.length === 0 ? (
          <p>No equipment found.</p>
        ) : (
          <Container>
            <UsedEquipmentTableModal
              equipments={equipments}
              selectedEquipmentID={selectedEquipmentID}
              handleEquipmentSelection={onSelect}
            />
            {equipments.map((e) => (
              <UsedEquipmentCardModal
                key={e.id}
                equipment={e}
                selectedEquipmentID={selectedEquipmentID}
                handleEquipmentSelection={onSelect}
              />
            ))}
            <PaginationControl
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </Container>
        )}

        <StorePurchaseForms
          show={showStorePurchaseForm}
          setRefreshCounter={setRefreshCounter}
          handleClose={() => {
            setShowStorePurchaseForm(false);
            setRefreshCounter(prev => prev + 1); // força o recarregamento ao fechar
          }}
        />
        
      </Modal.Body>
    </Modal>
  );
}
