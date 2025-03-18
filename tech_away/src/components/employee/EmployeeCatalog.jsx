import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { PaginationProvider } from '../../contexts/PaginationContext';

import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';
import EmployeeCardView from './EmployeeCardView';
import EmployeesTableView from './EmployeeTableView';
import EmployeeFilter from './EmployeeFilter';
import { useNavigate } from 'react-router-dom';

export default function EmployeeCatalog() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    nic: "",
    nif: "",
    internNum: "",
    storeNIPC: "",
    name: "",
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
    navigate("register")
  };

  const handleChangeEmployeeRole = () => {
    console.log("Falta implementar")
  }

  useEffect(() => {
    api
      .get('/api/employee/', {
        params: {
          nic: filters.nic,
          nif: filters.nif,
          internNum: filters.internNum,
          storeNIPC: filters.storeNIPC,
          name: filters.name,
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
  }, [currentPage, filters]);


  useEffect(() => {
    console.log(filters)
  }, [filters])

  return (
    <Container className="py-4">
      <EmployeeFilter filters={filters} onFilterChange={handleFilterChange} />
      
      <Stack direction='horizontal' gap={3} className="justify-content-center my-3">
        <Button variant="primary" size="lg" className="shadow-sm" onClick={handleCreateEmployee} >
          + Create New Employee
        </Button>
        <Button variant="primary" size="lg" className="shadow-sm" onClick={handleChangeEmployeeRole} >
          Change Employee Role
        </Button>
      </Stack>
      
        <PaginationProvider>
            <EmployeesTableView employees={employees} changeRole={handleChangeEmployeeRole} /> { /* Ecrãs grandes */}
            <EmployeeCardView employees={employees} changeRole={handleChangeEmployeeRole} /> { /* Ecrãs pequenos */}
        </PaginationProvider>

        <PaginationControl handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
      
    </Container>
  );
}

