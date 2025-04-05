import React, { useEffect, useState } from 'react';
import { Accordion, Alert, Button } from 'react-bootstrap';
import SearchBar from '../searchBar/SearchBar';
import FlowPane from '../elements/FlowPane';
import SelectedCardList from '../elements/SelectedCardList';
import PaginationControl from '../pagination/PaginationControl';
import api from '../../utils/axios';

export default function CharityProjectEquipmentTypeEditor({ projectId, onChangeAlert }) {
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [originalTypes, setOriginalTypes] = useState([]);
  const [search, setSearch] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [isEditing, setIsEditing] = useState(false);

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
      setSelectedTypes(res.data?.data || []);
      setOriginalTypes(res.data?.data || []);
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
    const isAlreadySelected = selectedTypes.find((e) => e.id === type.id);
  
    if (isAlreadySelected) {
      setSelectedTypes(prev => prev.filter(e => e.id !== type.id));
    } else {
      setSelectedTypes(prev => [...prev, type]);
    }
  };
  
  

  const haveChanges = () => {
    const a = selectedTypes.map((t) => t.id).sort();
    const b = originalTypes.map((t) => t.id).sort();
    return a.length !== b.length || !a.every((id, i) => id === b[i]);
  };

  const handleSave = async () => {
    if (!haveChanges()) {
      showAlert('No changes to save.', 'warning');
      return;
    }
  
    try {
      await api.post('/api/charityProject/linkEquipmentType', {
        charityProjectId: projectId,
        equipmentTypeIds: selectedTypes.map((t) => t.id),
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
        {!isEditing ? (
          <Button variant="outline-primary" size="sm" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        ) : (
          <div className="d-flex gap-2">
            {haveChanges() && (
              <Button variant="success" size="sm" onClick={handleSave}>
                Save
              </Button>
            )}
            <Button variant="outline-secondary" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </div>

      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
          {alert.message}
        </Alert>
      )}

      <SelectedCardList
        selectedElements={selectedTypes}
        isEditing={isEditing}
        onRemove={toggleSelectType}
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
                isEditing={true}
                onToggle={toggleSelectType}
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
