import React, { useState } from 'react';
import { Button, Container, Stack, Tabs, Tab, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthEmployee } from '../../contexts/AuthenticationProviders/EmployeeAuthProvider';
import EmployeeDisplayTable from './EmployeeDisplayTable';
import EmployeeEditModal from './EmployeeEditModal';
import EmployeeCardView from './EmployeeCardView'

export default function EmployeeCatalog() {
  const navigate = useNavigate();
  const { toggleActivateAccount } = useAuthEmployee();

  const [activeTab, setActiveTab] = useState('active');
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // api.get('/api/employee/', { params })
  // .then((res) => {
  //   const items = res.data.data || [];
  //   setData(items);
  //   setTotalRecords(res.data.totalItems || 0);
  //   if (items.length) {
  //     const keys = Object.keys(items[0]).filter(k => k !== "CreatedAt");
  //     setColumns(keys);
  //   }
  // })
  // .catch((err) => console.error('Erro:', err))
  // .finally(() => setLoading(false));

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
        {/* <EmployeeCardView 
          employee={employee}

        /> */}

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
