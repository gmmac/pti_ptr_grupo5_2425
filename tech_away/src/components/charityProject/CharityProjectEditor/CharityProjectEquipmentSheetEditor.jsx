import React, { useEffect, useState } from 'react';
import { Accordion, Alert, Button, Col, Row } from 'react-bootstrap';
import SearchBar from '../../searchBar/SearchBar';
import FlowPane from '../../elements/FlowPane';
import SelectedCardList from '../../elements/SelectedCardList';
import PaginationControl from '../../pagination/PaginationControl';
import api from '../../../utils/axios';
import EquipmentSheetFlowCard from './../../equipmentSheet/EquipmentSheetFlowCard';
import useSafeOrganizerAuth from '../../../utils/auth';

export default function CharityProjectEquipmentSheetEditor({ projectId, onChangeAlert }) {
  const [equipmentSheets, setEquipmentSheets] = useState([]);
  const [selectedSheets, setSelectedSheets] = useState([]);
  const [originalSheets, setOriginalSheets] = useState([]);
  const [search, setSearch] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [isEditing, setIsEditing] = useState(false);

  const {isOrganizer} = useSafeOrganizerAuth()


  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 6,
  });

  useEffect(() => {
    if (projectId) {
      fetchLinkedSheets();
      fetchSheets(1, search);
    }
  }, [projectId]);

  const fetchLinkedSheets = async () => {
    try {
      const res = await api.get(`/api/charityProject/${projectId}/equipmentSheet`);
      const normalized = (res.data?.data || []).map((item) => ({
        Barcode: item.Barcode,
        EquipmentModel: item.EquipmentModel,
        EquipmentType: item.EquipmentType,
        Brand: item.Brand,
      }));
      setSelectedSheets(normalized);
      setOriginalSheets(normalized);
    } catch (error) {
      console.error('Error fetching linked equipment sheets:', error);
    }
  };

  const fetchSheets = async (page = 1, barcode = '') => {
    try {
      const res = await api.get('/api/equipmentSheet', {
        params: {
          page,
          pageSize: pagination.pageSize,
          barcode,
          orderBy: 'barcode',
          orderDirection: 'ASC',
        },
      });
      setEquipmentSheets(res.data.data);
      setPagination({
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
        pageSize: res.data.pageSize,
      });
    } catch (error) {
      console.error('Error fetching equipment sheets:', error);
    }
  };

  const toggleSelectSheet = (sheet) => {
    const isAlreadySelected = selectedSheets.some((e) => e.Barcode === sheet.Barcode);
    if (isAlreadySelected) {
      setSelectedSheets((prev) => prev.filter((e) => e.Barcode !== sheet.Barcode));
    } else {
      setSelectedSheets((prev) => [...prev, sheet]);
    }
  };

  const haveChanges = () => {
    const a = selectedSheets.map((s) => s.Barcode).sort();
    const b = originalSheets.map((s) => s.Barcode).sort();
    return a.length !== b.length || !a.every((val, i) => val === b[i]);
  };

  const handleSave = async () => {
    if (!haveChanges()) {
      showAlert('No changes to save.', 'warning');
      return;
    }

    try {
      await api.post('/api/charityProject/linkEquipmentSheet', {
        charityProjectId: projectId,
        equipmentSheetIds: selectedSheets.map((s) => s.Barcode),
      });

      setOriginalSheets(selectedSheets);
      showAlert('Equipment sheets updated!', 'success');
      onChangeAlert?.({ message: 'Equipment sheets updated!', variant: 'success' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving equipment sheets:', error);
      showAlert('Error updating equipment sheets.', 'danger');
      onChangeAlert?.({ message: 'Error updating equipment sheets.', variant: 'danger' });
    }
  };

  const handleCancel = () => {
    setSelectedSheets(originalSheets);
    showAlert('Changes discarded.', 'secondary');
    setIsEditing(false);
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 2500);
  };

  const handleSearch = (value = search) => {
    fetchSheets(1, value);
  };

  // const renderEquipmentSheetCard = (sheet) => (
  //   <>
  //     <div className="fw-semibold">{sheet.Barcode}</div>
  //     <div className="small text-muted">
  //       {sheet.EquipmentModel?.name} - {sheet.Brand?.name}
  //     </div>
  //     <div className="small text-muted">{sheet.EquipmentType?.name}</div>
  //   </>
  // );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="fw-semibold mb-0">Selected Equipment Sheets</h5>
          {isOrganizer && (
              !isEditing ? (
              <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
                  Edit
              </Button>
              ) : (
              <div className="d-flex gap-2">
                  <Button variant="success" size="sm" onClick={handleSave}>
                  Save
                  </Button>
                  <Button variant="outline-secondary" size="sm" onClick={handleCancel}>
                  Cancel
                  </Button>
              </div>
              )
          )}
      </div>

      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
          {alert.message}
        </Alert>
      )}

      <SelectedCardList
        selectedElements={selectedSheets}
        isEditing={isEditing}
        onRemove={toggleSelectSheet}
        renderCard={(sheet) => (
          <div style={{cursor: "pointer"}}>
            <div className="fw-semibold">{sheet.EquipmentModel?.name} - {sheet?.Brand?.name}</div>
            <div className="small text-muted">
              {sheet.EquipmentType?.name}
            </div>
            <div className="small text-muted">{sheet.Barcode}</div>
          </div>
        )}
      />


      {isEditing && (
        <Accordion defaultActiveKey="1" className="mt-4 border rounded-sm shadow-sm overflow-hidden">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Add Equipment Sheets</Accordion.Header>
            <Accordion.Body className="bg-white">
              <SearchBar value={search} onChange={setSearch} onSearch={handleSearch} />

              <FlowPane
                elements={equipmentSheets}
                selectedElements={selectedSheets}
                isEditing={isEditing}
                onToggle={toggleSelectSheet}
                isSelected={(e) => selectedSheets.some((t) => t.Barcode === e.Barcode)}
                renderCard={({ element, isSelected, isEditing, onToggle }) => (
                  <EquipmentSheetFlowCard
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
                handlePageChange={(page) => fetchSheets(page, search)}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
}
