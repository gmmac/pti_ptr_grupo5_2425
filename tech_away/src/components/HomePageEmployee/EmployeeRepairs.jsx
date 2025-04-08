import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { PaginationProvider } from '../../contexts/PaginationContext';

import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';
import "../../styles/pageElements.css";

export default function EmployeeRepairs() {
  const [employeeStore, setEmployeeStore] = useState({});
  const [repairs, setRepairs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (user?.storeNIPC) {
        api.get(`/api/store/${user.storeNIPC}`)
            .then(res => setEmployeeStore(res.data))
            .catch(error => console.error(error.message));
    }
  }, [user?.storeNIPC]);

  useEffect(() => {
    api.get('/api/repair/')
      .then((res) => {
        setRepairs(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error('API error:', error.message);
      });
  }, [currentPage]);

  return (
    <Container>
        <h2 className="my-4 text-left">Repairs in: {employeeStore.name}</h2>
        <PaginationProvider>
              <Container fluid className="p-3">
                <div className="table-responsive shadow-sm rounded" style={{ backgroundColor: "#f8f9fa", borderRadius: "10px", overflowX: "auto" }}>
                  <Table hover bordered  className="mb-0 d-none d-lg-table">
                    <thead className="bg-light text-dark">
                      <tr>
                        <th>RepairID</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Budget</th>
                        <th>Estimated Deliver Date</th>
                        <th>EmployeeID</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {repairs.map((repair, index) => (
                        <tr key={index} className="align-middle" style={{ backgroundColor: "#ffffff" }}>
                          <td>{repair.id}</td>
                          <td className="text-truncate" style={{ maxWidth: "150px" }}>{repair.RepairStatus.state}</td>
                          <td>{repair.description}</td>
                          <td className="text-truncate" style={{ maxWidth: "200px" }}>{repair.budget}€</td>
                          <td>{repair.estimatedDeliverDate ? null : "N/A"}</td>
                          <td>{repair.employeeId}</td>
                          <td>{new Date(repair.createdAt).toLocaleDateString()}</td>
                          <td>{new Date(repair.updatedAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
          </Container>
        </PaginationProvider>

        <PaginationControl handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </Container>
  )
}
