import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddEquipmentModal({ show, handleClose, handleSubmit }) {
  const [formData, setFormData] = useState({
    statusID: "",
    price: "",
    putOnSaleDate: "",
    purchaseDate: null,
    equipmentID: "",
    storeID: "",
    action: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = () => {
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Equipamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Status ID</Form.Label>
            <Form.Control type="text" name="statusID" value={formData.statusID} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Preço</Form.Label>
            <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Data de Colocação à Venda</Form.Label>
            <Form.Control type="date" name="putOnSaleDate" value={formData.putOnSaleDate} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Equipment ID</Form.Label>
            <Form.Control type="text" name="equipmentID" value={formData.equipmentID} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Store ID</Form.Label>
            <Form.Control type="text" name="storeID" value={formData.storeID} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleFormSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}
