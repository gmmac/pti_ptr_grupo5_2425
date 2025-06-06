import React, { useEffect, useState } from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';
import UsedEquipmentTableModal from './UsedEquipmentTableModal';
import UsedEquipmentCardModal from './UsedEquipmentCardModal';
import UsedEquipmentFilter from './UsedEquipmentFilter';

export default function UsedEquipmentCatalogModal({ show, handleClose, handleSelectEquipment, selectedEquipmentID }) {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({    
    usedEquipmentId: '',
    Barcode: '',
    BrandModel: '',
    EquipmentType: '',
    sortField: 'id',
    sortOrder: 'ASC'});

  const handleClosePopUp = () => {
    handleClose();
    setFilters({    
    usedEquipmentId: '',
    Barcode: '',
    BrandModel: '',
    EquipmentType: '',
    sortField: 'id',
    sortOrder: 'ASC'});
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/api/usedEquipment/displayTable', {
          params: { ...filters, page: currentPage, price: null }
        });
        setEquipments(response.data.data || []);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError('Error loading used equipment');
      }
      setLoading(false);
    };

    if (show) fetchEquipments();
  }, [show, currentPage, filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };


  // Pass full equipment object back to parent so barcode stays defined
  const onSelect = (equipment) => {
    if (selectedEquipmentID === equipment.id) {
      handleSelectEquipment(null);
    } else {
      handleSelectEquipment(equipment);
    }
  };

  return (
    <Modal show={show} onHide={handleClosePopUp} 
      onExited={() => {
        setFilters({    
        usedEquipmentId: '',
        Barcode: '',
        BrandModel: '',
        EquipmentType: '',
        sortField: 'id',
        sortOrder: 'ASC'});
      }}
      size="xl" 
      centered>
      
      <Modal.Header closeButton>
        <Modal.Title>Catalog of Used Equipment</Modal.Title>
      </Modal.Header>
      <UsedEquipmentFilter filters={filters} onFilterChange={setFilters} resetFilter={false} />

      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
}
