import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function AddEquipmentModal({ show, handleClose, onAdd }) {
  const [formData, setFormData] = useState({
    barcode: "",
    model: "",
    releaseYear: "",
    type: "",
  });
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar os tipos de equipamentos
  const fetchEquipmentTypes = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/equipment-types", {
        params: { page, pageSize },
      });

      // Aqui você pode ajustar se precisar de paginação ou não
      setEquipmentTypes(response.data.data); // Recebe os tipos de equipamentos
    } catch (error) {
      console.error("Error fetching equipment types:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchEquipmentTypes(); // Carrega os tipos de equipamentos quando o modal é aberto
    }
  }, [show]); // Executa quando o modal for aberto

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fazendo a requisição POST para adicionar o equipamento
      const response = await axios.post("/api/used-equipment", formData);

      if (response.status === 200) {
        onAdd(formData); // callback do pai para atualizar o estado
        handleClose(); // fecha modal após adicionar
        setFormData({ barcode: "", model: "", releaseYear: "", type: "" }); // limpa o formulário
      }
    } catch (error) {
      console.error("Error adding equipment:", error);
    }
  };

  return (
    <>
      {/* Força o z-index do backdrop */}
      <style>
        {`
          .modal-backdrop.show {
            z-index: 1055 !important;
          }
        `}
      </style>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        style={{ zIndex: 1056 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Equipamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Código de Barras</Form.Label>
              <Form.Control
                type="text"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ano de Lançamento</Form.Label>
              <Form.Control
                type="number"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                disabled={loading} // Desabilita enquanto carrega os tipos
              >
                <option value="">Selecione o Tipo</option>
                {equipmentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Control>
              {loading && <div>A carregar tipos...</div>}
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              Adicionar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
