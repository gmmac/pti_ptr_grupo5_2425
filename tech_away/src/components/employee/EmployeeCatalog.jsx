import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PaginationProvider } from '../../contexts/PaginationContext';

import EmployeeTable from './EmployeeTable';
import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';

export default function EmployeeCatalog() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    api
      .get('/api/employee/', {
        params: {
        //   name: filters.name,
        //   clientNIC: filters.clientNIC,
        //   orderBy: filters.orderBy,
        //   orderDirection: filters.orderDirection,
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
  }, [currentPage]);

  return (
    <Container className="py-4">
      {/* <EmployeeFilter folders={folders} /> */}
      
      {/* <div className="d-flex justify-content-center my-3">
        <Button variant="primary" size="lg" className="shadow-sm" onClick={handleShow}>
          + Create New Folder
        </Button>
      </div> */}
      
      {/* <CreateInterestModal show={show} handleClose={handleClose} handleRefresh={handleRefresh} /> */}


        <PaginationProvider>
                <EmployeeTable employees={employees} />
        </PaginationProvider>

        <PaginationControl handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
      
    </Container>
  );
}

