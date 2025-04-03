import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

export default function RepairInfo({ repairInfo, show, onClose }) {
  console.log(repairInfo);

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
                  {repairInfo.RepairStatusLogs && repairInfo.RepairStatusLogs.length > 0 ? (
                    repairInfo.RepairStatusLogs.map((log) => (
                      <tr key={log.id}>
                        <td>
                          <span className="fw-bold">{log.RepairStatus.state}</span>
                        </td>
                        <td>{new Date(log.createdAt).toLocaleDateString()}</td>
                        <td>{log.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-muted">No status history available</td>
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
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={onClose} className="px-4 fw-bold">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}