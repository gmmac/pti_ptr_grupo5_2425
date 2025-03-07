import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../../utils/axios';

export default function CreateInterestModal({ show, handleClose, handleRefresh }) {
  const [name, setName] = useState("");
  
  // Simulação de obtenção do usuário logado
  const getLoggedUser = () => {
    return 987654321;
  };

  const handleFolderName = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    console.log(name);
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const clientNIC = getLoggedUser();
      const response = await api.post("/api/interestsFolder", {
        name,
        clientNIC,
      });

      console.log("Folder created:", response.data);

      setName("");
      handleClose();
      handleRefresh();
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Folder</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="forms-folderName">
            <Form.Label>Folder Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter folder name" 
              value={name}
              onChange={handleFolderName}
              required 
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
