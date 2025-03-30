import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { PaginationProvider } from '../../contexts/PaginationContext';

import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';
import EmployeeCardView from './EmployeeCardView';
import EmployeesTableView from './EmployeeTableView';
import EmployeeFilter from './EmployeeFilter';
import { useNavigate } from 'react-router-dom';
import EmployeeEditModal from './EmployeeEditModal';

export default function EmployeeCatalog() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();
  
  const [refresh, setRefresh] = useState(false)

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);


  const [filters, setFilters] = useState({
    nic: "",
    nif: "",
    internNum: "",
    storeNIPC: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    // address: "",
    role: "",
    // orderBy: 'id',
    orderDirection: 'ASC',
    
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreateEmployee = () => {
    navigate("/employee/register")
  };

  const handleChangeEmployeeRole = () => {
    console.log("Falta implementar")
  }

  const togleRefresh = () => {
    setRefresh(!refresh)
  }

  useEffect(() => {
    api
      .get('/api/employee/', {
        params: {
          nic: filters.nic,
          nif: filters.nif,
          internNum: filters.internNum,
          storeNIPC: filters.storeNIPC,
          firstName: filters.firstName,
          lastName: filters.lastName,
          email: filters.email,
          phone: filters.phone,
          gender: filters.gender,
          // address: filters.address,
          role: filters.role,
          orderBy: filters.orderBy,
          orderDirection: filters.orderDirection,
          page: currentPage,
          pageSize: itemsPerPage,
        },
      })
      .then((res) => {
        setEmployees(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error('API error:', error.message);
      });
  }, [currentPage, filters, refresh]);
  
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };
  
  const handleSaveEditedEmployee = (id, updatedData) => {
    api.put(`/api/employee/${id}`, updatedData)
      .then(() => {
        setShowEditModal(false);
        setSelectedEmployee(null);
        togleRefresh();
      })
      .catch((err) => console.error("Edit error:", err.message));
  };
  
  
  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      api.delete(`/api/employee/${employeeId}`)
        .then(() => {
          setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
          togleRefresh();
        })
        .catch((error) => {
          console.error("Delete error:", error.message);
        });
    }
  };
  

  return (
    <Container className="py-4">
      <EmployeeFilter filters={filters} onFilterChange={handleFilterChange} />
      
      <Stack direction='horizontal' gap={3} className="justify-content-center my-3">
        <Button variant="primary" size="lg" className="shadow-sm" onClick={handleCreateEmployee} >
          + Create New Employee
        </Button>
        {/* <Button variant="primary" size="lg" className="shadow-sm" onClick={handleChangeEmployeeRole} >
          Change Employee Role
        </Button> */}
      </Stack>
      
        <PaginationProvider>

          <EmployeesTableView
            employees={employees}
            changeRole={handleChangeEmployeeRole}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />

          <EmployeeCardView
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />

          <EmployeeEditModal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            employee={selectedEmployee}
            onSave={handleSaveEditedEmployee}
          />



        </PaginationProvider>

        <PaginationControl handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
      
    </Container>
  );
}

