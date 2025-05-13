// CharityProjectEquipmentTypeEditor.jsx
import React, { useEffect, useState } from 'react';
import { Accordion, Alert, Button } from 'react-bootstrap';
import SearchBar from '../../searchBar/SearchBar';
import FlowPane from '../../elements/FlowPane';
import SelectedCardList from '../../elements/SelectedCardList';
import PaginationControl from '../../pagination/PaginationControl';
import api from '../../../utils/axios';
import EquipmentTypeCard from '../../equipmentType/EquipmentTypeCard';
import useSafeOrganizerAuth from '../../../utils/auth';

export default function CharityProjectEquipmentTypeEditor({ projectId, onChangeAlert }) {
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [originalTypes, setOriginalTypes] = useState([]);
  const [search, setSearch] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [isEditing, setIsEditing] = useState(false);
  const { isOrganizer } = useSafeOrganizerAuth();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 6,
  });

  useEffect(() => {
    if (projectId) {
      fetchLinkedEquipmentTypes();
      fetchEquipmentTypes(1, search);
    }
  }, [projectId]);

  const fetchLinkedEquipmentTypes = async () => {
    try {
      const res = await api.get(`/api/charityProject/${projectId}/equipmentTypes`);
      const dataWithQty = res.data?.data?.map(t => ({ ...t, quantity: t.quantity || 1 })) || [];
      setSelectedTypes(dataWithQty);
      setOriginalTypes(dataWithQty);
    } catch (error) {
      console.error('Error fetching linked equipment types:', error);
    }
  };

  const fetchEquipmentTypes = async (page = 1, name = '') => {
    try {
      const res = await api.get('/api/equipmentType', {
        params: {
          page,
          pageSize: pagination.pageSize,
          name,
          orderBy: 'id',
          orderDirection: 'ASC',
        },
      });
      setEquipmentTypes(res.data.data);
      setPagination({
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
        pageSize: res.data.pageSize,
      });
    } catch (error) {
      console.error('Error fetching equipment types:', error);
    }
  };

  const toggleSelectType = (type) => {
    const found = selectedTypes.find((e) => e.id === type.id);
    if (found) {
      setSelectedTypes((prev) => prev.filter((e) => e.id !== type.id));
    } else {
      setSelectedTypes((prev) => [...prev, { ...type, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (type, qty) => {
    setSelectedTypes((prev) =>
      prev.map((item) =>
        item.id === type.id ? { ...item, quantity: qty } : item
      )
    );
  };

  const haveChanges = () => {
    if (selectedTypes.length !== originalTypes.length) return true;
  
    const sortById = (arr) => [...arr].sort((a, b) => a.id - b.id);
  
    const sortedSelected = sortById(selectedTypes);
    const sortedOriginal = sortById(originalTypes);
  
    for (let i = 0; i < sortedSelected.length; i++) {
      const selected = sortedSelected[i];
      const original = sortedOriginal[i];
      if (selected.id !== original.id || selected.quantity !== original.quantity) {
        return true;
      }
    }
  
    return false;
  };

  const handleSave = async () => {
    if (!haveChanges()) {
      showAlert('No changes to save.', 'warning');
      return;
    }

    try {
      await api.post('/api/charityProject/linkEquipmentType', {
        charityProjectId: projectId,
        items: selectedTypes.map((t) => ({
          id: t.id,
          quantity: t.quantity,
        })),
      });

      setOriginalTypes(selectedTypes);
      showAlert('Equipment types updated!', 'success');
      onChangeAlert?.({ message: 'Equipment types updated!', variant: 'success' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving equipment types:', error);
      showAlert('Error updating equipment types.', 'danger');
      onChangeAlert?.({ message: 'Error updating equipment types.', variant: 'danger' });
    }
  };

  const handleCancel = () => {
    setSelectedTypes(originalTypes);
    showAlert('Changes discarded.', 'secondary');
    setIsEditing(false);
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 2500);
  };

  const handleSearch = (value = search) => {
    fetchEquipmentTypes(1, value);
  };

  return (
    <>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="fw-semibold mb-0">Selected Equipment Types</h5>

        {isOrganizer && (
          !isEditing ? (
            <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="d-flex gap-2">
              <Button variant="success" size="sm" onClick={handleSave}>Save</Button>
              <Button variant="outline-secondary" size="sm" onClick={handleCancel}>Cancel</Button>
            </div>
          )
        )}
      </div>

      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
          {alert.message}
        </Alert>
      )}

        {selectedTypes.length === 0 && (
          <Alert variant="info">No Equipment Types defined for this project.</Alert>
        )}

      <SelectedCardList
        colNumMD={4}
        colNumXS={6}
        selectedElements={selectedTypes}
        isEditing={isEditing}
        onRemove={toggleSelectType}
        onQuantityChange={handleQuantityChange}
        renderCard={(type) => (
          <div className="fw-semibold text-capitalize">
            {type.name}
            <div> Quantity: {type.quantity} </div>
            <div className="small text-muted">ID: {type.id}</div>
          </div>
        )}
      />

      {isEditing && (
        <Accordion defaultActiveKey="1" className="mt-4 border rounded-sm shadow-sm overflow-hidden">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Add Equipment Types</Accordion.Header>
            <Accordion.Body className="bg-white">
              <SearchBar value={search} onChange={setSearch} onSearch={handleSearch} />
              <FlowPane
                elements={equipmentTypes}
                selectedElements={selectedTypes}
                isEditing={isEditing}
                onToggle={toggleSelectType}
                isSelected={(e) => selectedTypes.some((t) => t.id === e.id)}
                renderCard={({ element, isSelected, isEditing, onToggle }) => (
                  <EquipmentTypeCard
                    element={element}
                    isSelected={isSelected}
                    isEditing={isEditing}
                    onToggle={onToggle}
                  />
                )}
              />
              <PaginationControl
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                handlePageChange={(page) => fetchEquipmentTypes(page, search)}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
}
