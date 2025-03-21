import React, { use, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import api from "../../utils/axios";

export default function FormsEquipmentSheet({ showModal, closeModal }) {
  const [models, setModels] = useState({});
  const [types, setTypes] = useState([]);

  const [equipmentSheet, setEquipmentSheet] = useState({
    barcode: "",
    model: null,
    type: null,
  });

  const [errors, setErrors] = useState({});

  const handleChanges = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    // Atualiza o estado do equipmentSheet corretamente
    setEquipmentSheet((prev) => ({ ...prev, [name]: value }));

    let newErrors = { ...errors };

    // Validação de campos obrigatórios
    if (!value) {
      newErrors[name] = "This field is required";
    } else {
      newErrors[name] = "";
    }

    // Validação de barcode
    if (name === "barcode" && value.length !== 20) {
      newErrors[name] = "Barcode needs to have 20 characters";
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    async function getModels() {
      const response = await api.get("api/model");
      setModels(response.data);
    }
    getModels();
  }, []);

  useEffect(() => {
    console.log(models);
  }, [models]);

  // get de todos os models para o select
  // get de todos os types para o select
  // post de uma nova equipmentSheet
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            color: "var(--variant-one)",
            fontFamily: "var(--title-font)",
          }}
        >
          Add New Equipment Sheet
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Barcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter barcode"
            name="barcode"
            value={equipmentSheet.barcode}
            isInvalid={!!errors.barcode}
            onChange={handleChanges}
          />
          <Form.Control.Feedback type="invalid">
            {errors.barcode}
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
    </Modal>
  );
}
