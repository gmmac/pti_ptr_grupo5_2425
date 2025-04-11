import React, { useEffect, useState } from 'react';
import { Modal, Table, Card, Row, Col } from 'react-bootstrap';
import { FileText, Calendar, Wallet, People, Shop, CheckCircle } from 'react-bootstrap-icons';
import PaginationControl from '../pagination/PaginationControl';
import api from '../../utils/axios';

export default function RepairInfo({ repairInfo, show, onClose }) {
  const [repairStatusLogs, setRepairStatusLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchRepairsLogs = async () => {
    try {
        const response = await api.get(`/api/repairStatusLogs/${repairInfo.id}`, {
          params: {
            page: currentPage,
          },
        });
        setRepairStatusLogs(response.data.data);
        setTotalPages(response.data.totalPages);
        setError('');
    } catch (error) {
        console.error('Error fetching repairs:', error);
        setError('Error fetching repairs. Please try again.');
    }
  };

  useEffect(() => {
    if(show){
      fetchRepairsLogs();
    }
  }, [show, currentPage]);

  return (
    <Modal show={show} onHide={onClose} centered size="xl" >
      <Modal.Header closeButton className="variant-two">
        <Modal.Title>Repair Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {repairInfo ? (
          <Row>
            {/* Coluna Esquerda: Info da Reparação */}
            <Col md={5}>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <p className="fw-bold">
                    <FileText /> Nº Repair: <span className="fw-normal text-primary">#{repairInfo.id}</span>
                  </p>
                  <p className="fw-bold">
                    <Calendar /> Created At: <span className="fw-normal">{new Date(repairInfo.createdAt).toLocaleDateString()}</span>
                  </p>
                  <p className="fw-bold">
                    <Calendar /> Estimated Delivery: <span className="fw-normal">{new Date(repairInfo.estimatedDeliverDate).toLocaleDateString()}</span>
                  </p>
                  <p className="fw-bold">
                    <FileText /> Description: <span className="fw-normal">{repairInfo.description}</span>
                  </p>
                  <p className="fw-bold">
                    <Wallet /> Budget: <span className="fw-normal">${repairInfo.budget}</span>
                  </p>
                  <p className="fw-bold">
                    <People /> Employee: <span className="fw-normal">{repairInfo.Employee.firstName} {repairInfo.Employee.lastName}</span>
                  </p>
                  <p className="fw-bold">
                    <Shop /> Store: <span className="fw-normal">{repairInfo.Employee.Store.name}</span>
                  </p>
                  <p className="fw-bold">
                    <CheckCircle /> Current Status:
                    <span className={`badge ${repairInfo.RepairStatus?.state === 'Completed' ? 'bg-success' : 'bg-primary'} ms-2`}>
                      {repairInfo.RepairStatus?.state}
                    </span>
                  </p>
                </Card.Body>
              </Card>
            </Col>

            {/* Linha vertical */}
            <Col md={1} className="d-flex justify-content-center align-items-center">
              <div style={{ borderLeft: "2px solid #ccc", height: "100%" }}></div>
            </Col>

            {/* Coluna Direita: Histórico de Status */}
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="fw-bold mb-3">Repair Status History</h5>
                  <div className="table-responsive overflow-auto" style={{ maxHeight: "300px" }}>
                    <Table striped bordered hover responsive className="text-center">
                      <thead className="table-dark">
                        <tr>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {repairStatusLogs.length > 0 ? (
                          repairStatusLogs.map((log) => (
                            <tr key={log.id}>
                              <td><span className="fw-bold">{log.RepairStatus.state}</span></td>
                              <td>{new Date(log.createdAt).toLocaleDateString()}</td>
                              <td>{log.description}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-muted">No status history available. Please contact the store</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                  <PaginationControl handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <p className="text-center text-muted">No repair information available.</p>
        )}
      </Modal.Body>
    </Modal>
  );
}
