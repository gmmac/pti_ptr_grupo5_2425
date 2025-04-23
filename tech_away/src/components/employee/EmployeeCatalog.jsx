import React, { useState } from 'react';
import { Button, Container, Stack, Tabs, Tab, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthEmployee } from '../../contexts/AuthenticationProviders/EmployeeAuthProvider';
import EmployeeDisplayTable from './EmployeeDisplayTable';
import EmployeeEditModal from './EmployeeEditModal';

export default function EmployeeCatalog() {
  const navigate = useNavigate();
  const { toggleActivateAccount } = useAuthEmployee();

  const [activeTab, setActiveTab] = useState('active');
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  

  const handleCreateEmployee = () => navigate('/employee/register');

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleSaveEditedEmployee = (id, updatedData) => {
    setShowEditModal(false);
    setSelectedEmployee(null);
  };

  const handleToggleActivationAccount = async (internNum) => {
    try {
      await toggleActivateAccount(internNum);
      setRefreshKey(prev => prev + 1); // Força refresh da tabela
    } catch (err) {
      console.error("Error toggling activation:", err.message);
    }
  };

  return (
    <Container className="py-4">
      <Stack direction="horizontal" gap={3} className="justify-content-center my-3">
        <Button variant="primary" size="lg" onClick={handleCreateEmployee}>
          + Create New Employee
        </Button>
      </Stack>

      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs
        id="employees-tabs"
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
        className="mb-3"
      >
        <Tab eventKey="active" title="Active Employees">
        <EmployeeDisplayTable
          model="employee"
          isActiveFilter="1"
          onEdit={handleEditEmployee}
          onDelete={handleToggleActivationAccount}
          refreshKey={refreshKey}
        />
        </Tab>
        <Tab eventKey="inactive" title="Inactive Employees">
          <EmployeeDisplayTable
            model="employee"
            isActiveFilter= "0"
            onEdit={handleEditEmployee}
            onDelete={handleToggleActivationAccount}
            refreshKey={refreshKey}

          />
        </Tab>
      </Tabs>

      <EmployeeEditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        employee={selectedEmployee}
        onSave={handleSaveEditedEmployee}
      />
    </Container>
  );
}
