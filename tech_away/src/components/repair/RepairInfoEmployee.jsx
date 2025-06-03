import React, { useEffect, useState } from 'react';
import { Modal, Table, Card, Row, Col } from 'react-bootstrap';
import { FileText, Calendar, Wallet, People, Shop, CheckCircle } from 'react-bootstrap-icons';
import api from '../../utils/axios';

export default function RepairInfoEmployee({ repairID, show, onClose }) {
  const [repairStatusLogs, setRepairStatusLogs] = useState([]);
  const [repair, setRepair] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const fetchRepairsLogs = async () => {
    try {
      const response = await api.get(`/api/repairStatusLogs/${repairID}`, {
        params: { page: currentPage },
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
    if (show) {
      fetchRepair();
      fetchRepairsLogs();
    }
  }, [show, currentPage, repairID]);

  return (
    <Modal show={show} onHide={onClose} centered size="xl">
      <Modal.Header closeButton className="variant-two">
        <Modal.Title>Repair Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {repair ? (
          <Row className="g-4">
            {/* Card: Informações Gerais */}
            <Col xs={12} md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <h5 className="mb-3 fw-bold">General Information</h5>
                  <p><FileText className="me-2 text-secondary fs-5" />Repair Nº: <strong className="text-primary">#{repair.id}</strong></p>
                  <p><Calendar className="me-2 text-secondary fs-5" />Created At: <strong>{new Date(repair.createdAt).toLocaleDateString()}</strong></p>
                  <p><Calendar className="me-2 text-secondary fs-5" />Estimated Delivery: <strong>{new Date(repair.estimatedDeliverDate).toLocaleDateString()}</strong></p>
                  <p><FileText className="me-2 text-secondary fs-5" />Description: <strong>{repair.description}</strong></p>
                </Card.Body>
              </Card>
            </Col>

            {/* Card: Orçamento */}
            <Col xs={12} md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                    <h5 className="mb-3 fw-bold">Budget & Status</h5>
                    <p><Wallet className="me-2 text-secondary fs-5" />Budget: <strong>${repair.budget}</strong></p>
                    <p><CheckCircle className="me-2 text-secondary fs-5" />Current Status:
                        <span className={`ms-2 px-3 py-1 rounded-pill fw-semibold 
                        ${repair.RepairStatus?.state === 'Repair finished'
                            ? 'bg-success-subtle text-success border border-success'
                            : 'bg-primary-subtle text-primary border border-primary'}`}>
                        {repair.RepairStatus?.state}
                        </span>
                    </p>
                </Card.Body>
              </Card>
            </Col>

            {/* Card: Funcionário e Loja */}
            <Col xs={12} md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <h5 className="mb-3 fw-bold">Responsibility</h5>
                  <p><People className="me-2 text-secondary fs-5" />Employee: 
                    <strong> {repair.Employee ? `${repair.Employee.firstName} ${repair.Employee.lastName}` : 'No Employee Assigned'}</strong>
                  </p>
                  <p><Shop className="me-2 text-secondary fs-5" />Store: 
                    <strong> {repair.Employee?.Store ? repair.Employee.Store.name : 'No Store Assigned'}</strong>
                  </p>
                </Card.Body>
              </Card>
            </Col>

            {/* Card: Histórico de Status */}
            <Col xs={12} md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <h5 className="fw-bold mb-3">Repair Status History</h5>
                  <div className="overflow-auto" style={{ maxHeight: "300px" }}>
                    {repairStatusLogs.length > 0 ? (
                      repairStatusLogs.map((log) => (
                        <Card key={log.id} className="mb-3 border-0 shadow-sm" style={{ backgroundColor: '#f8f9fa', borderRadius: '0.75rem' }}>
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="fw-bold"><i className="pi pi-flag me-2 " />{log.RepairStatus.state}</span>
                              <small className="text-muted"><i className="pi pi-calendar me-1" />{new Date(log.createdAt).toLocaleDateString()}</small>
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