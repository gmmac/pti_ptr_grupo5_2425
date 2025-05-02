import React, { useEffect, useState } from 'react';
import { Modal, Table, Card, Row, Col } from 'react-bootstrap';
import { FileText, Calendar, Wallet, People, Shop, CheckCircle } from 'react-bootstrap-icons';
import PaginationControl from '../pagination/PaginationControl';
import api from '../../utils/axios';

export default function RepairInfo({ repairID, show, onClose }) {
  const [repairStatusLogs, setRepairStatusLogs] = useState([]);
  const [repair, setRepair] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchRepairsLogs = async () => {
    try {
        const response = await api.get(`/api/repairStatusLogs/${repairID}`, {
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

  const fetchRepair = async () => {
    try {
        const response = await api.get(`/api/repair/${repairID}`);
        setRepair(response.data);
        setError('');
    } catch (error) {
        console.error('Error fetching repair:', error);
        setError('Error fetching repair. Please try again.');
    }
  };

  useEffect(() => {
    if(show){
      fetchRepair();
      fetchRepairsLogs();
    }
  }, [currentPage, repairID]);

  return (
    <Modal show={show} onHide={onClose} centered size="xl" >
      <Modal.Header closeButton className="variant-two">
        <Modal.Title>Repair Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {repair ? (
          <Row>
            {/* Coluna Esquerda: Info da Reparação */}
            <Col md={5}>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <p className="fw-bold">
                    <FileText /> Nº Repair: <span className="fw-normal text-primary">#{repair.id}</span>
                  </p>
                  <p className="fw-bold">
                    <Calendar /> Created At: <span className="fw-normal">{new Date(repair.createdAt).toLocaleDateString()}</span>
                  </p>
                  <p className="fw-bold">
                    <Calendar /> Estimated Delivery: <span className="fw-normal">{new Date(repair.estimatedDeliverDate).toLocaleDateString()}</span>
                  </p>
                  <p className="fw-bold">
                    <FileText /> Description: <span className="fw-normal">{repair.description}</span>
                  </p>
                  <p className="fw-bold">
                    <Wallet /> Budget: <span className="fw-normal">${repair.budget}</span>
                  </p>
                  <p className="fw-bold">
                    <People /> Employee: <span className="fw-normal">
                      {repair.Employee ? `${repair.Employee.firstName} ${repair.Employee.lastName}` : 'No Employee Assigned'}
                    </span>
                  </p>
                  <p className="fw-bold">
                    <Shop /> Store: <span className="fw-normal">
                      {repair.Employee && repair.Employee.Store ? repair.Employee.Store.name : 'No Store Assigned'}
                    </span>
                  </p>
                  <p className="fw-bold">
                    <CheckCircle /> Current Status:
                    <span className={`badge ${repair.RepairStatus?.state === 'Completed' ? 'bg-success' : 'bg-primary'} ms-2`}>
                      {repair.RepairStatus?.state}
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
                  <div className="overflow-auto" style={{ maxHeight: "300px" }}>
                      {repairStatusLogs.length > 0 ? (
                        repairStatusLogs.map((log) => (
                          <Card key={log.id} className="mb-3 border-0 shadow-sm" style={{ backgroundColor: '#f8f9fa', borderRadius: '0.75rem' }}>
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="fw-bold">
                                  <i className="pi pi-flag me-2" />
                                  {log.RepairStatus.state}
                                </span>
                                <small className="text-muted">
                                  <i className="pi pi-calendar me-1" />
                                  {new Date(log.createdAt).toLocaleDateString()}
                                </small>
                              </div>
                              <p className="mb-0">{log.description}</p>
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <p className="text-muted">No status history available. Please contact the store.</p>
                      )}
                    </div>
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
