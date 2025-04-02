import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function RepairInfo({ repairInfo, show }) {
  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Repair Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {repairInfo ? (
            <div>
              <p><strong>ID:</strong> #1</p>
              <p><strong>Description:</strong> teste</p>
              <p><strong>Status:</strong> statusTeste</p>
              <p><strong>Date:</strong> dataTeste</p>
            </div>
          ) : (
            <p>No repair information available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}