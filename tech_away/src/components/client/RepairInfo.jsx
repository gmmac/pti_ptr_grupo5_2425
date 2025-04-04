import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import api from '../../utils/axios';

export default function RepairInfo({ repairInfo, show, onClose }) {
  const [repairStatusLogs, setRepairStatusLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const fetchRepairsLogs = async () => {
    try {
        const response = await api.get(`/api/repairStatusLogs/${repairInfo.id}`, {
          params: {
            page: currentPage,
          },
        });
        console.log(response.data.data)
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
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Repair Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {repairInfo ? (
          <div className="d-flex flex-column gap-3">
            <div>
              <p className="fw-bold">Nº Repair: <span className="fw-normal text-primary">#{repairInfo.id}</span></p>
              <p className="fw-bold">Estimated Delivery: <span className="fw-normal">{new Date(repairInfo.estimatedDeliverDate).toLocaleDateString()}</span></p>
              <p className="fw-bold">Created At: <span className="fw-normal">{new Date(repairInfo.createdAt).toLocaleDateString()}</span></p>
              <p className="fw-bold">Description: <span className="fw-normal">{repairInfo.description}</span></p>
              <p className="fw-bold">Budget: <span className="fw-normal">${repairInfo.budget}</span></p>
              <p className="fw-bold">
                Status: 
                <span className={`badge ${repairInfo.RepairStatus?.state === 'Completed' ? 'bg-success' : 'bg-primary'} ms-2`}>
                  {repairInfo.RepairStatus?.state}
                </span>
              </p>
            </div>

            <hr/>

            <h5 className="fw-bold text-primary">Repair Status History</h5>
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
                        <td>
                          <span className="fw-bold">{log.statusId}</span>
                        </td>
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
          </div>
        ) : (
          <p className="text-center text-muted">No repair information available.</p>
        )}
      </Modal.Body>
    </Modal>
  );
}