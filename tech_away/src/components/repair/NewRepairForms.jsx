import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import api from "../../utils/axios";
import ClientCatalogModal from "../storePurchase/ClientCatalogModal";
import UsedEquipmentSelect from "../equipment/UsedEquipmentSelect";

export default function NewRepairForms({ showModal, closeModal, setRefreshRepairs }) {
  const [newRepairInfo, setNewRepairInfo] = useState({
    description: '',
    clientId: '',
    statusID: 1,  // Definindo statusID como 1
    usedEquipmentId: '',
    budget: '',
    estimatedDeliverDate: '',
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [showClientModal, setShowClientModal] = useState(false);
  const [showUsedEquipmentModal, setShowUsedEquipmentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (showModal) {
      resetForm();
    }
  }, [showModal]);

  const today = new Date().toISOString().split("T")[0];

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setNewRepairInfo(prev => ({
      ...prev,
      [name]: value
    }));

    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));

    if (touchedFields[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: value ? "" : "Este campo é obrigatório"
      }));
    }
  };

  const validateFields = () => {
    let newErrors = {};
    let hasError = false;

    for (const field in newRepairInfo) {
      if (!newRepairInfo[field] && field !== 'statusID') {  // Não validar o statusID
        newErrors[field] = "Este campo é obrigatório";
        hasError = true;
      }
      if (field === "budget" && isNaN(newRepairInfo[field])) {
        newErrors[field] = "Orçamento inválido";
        hasError = true;
      }
    }

    setErrors(newErrors);
    setTouchedFields({
      clientId: true,
      description: true,
      budget: true,
      estimatedDeliverDate: true
    });

    return !hasError;
  };

  const handleSelectClient = (client) => {
    setNewRepairInfo(prev => ({
      ...prev,
      clientId: client?.nic || ''
    }));
    setShowClientModal(false);
  };

  const handleSelectUsedEquipment = (usedEquipment) => {
    setNewRepairInfo(prev => ({
      ...prev,
      usedEquipmentId: usedEquipment?.id || ''
    }));
    setShowUsedEquipmentModal(false);
  };

  const resetForm = () => {
    setNewRepairInfo({ description: '', clientId: '', budget: '', estimatedDeliverDate: '', statusID: 1 });
    setErrors({});
    setTouchedFields({});
  };

  const handleClose = () => {
    resetForm();
    closeModal();
    setRefreshRepairs(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    setIsSubmitting(true);

    try {
      // Garantir que statusID seja 1
      const repairInfo = { ...newRepairInfo, statusID: 1 };

      await api.post("/api/repair/", repairInfo);
      handleClose();
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors(prev => ({
          ...prev,
          exist: error.response.data.error
        }));
      } else {
        console.error("API error:", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} dialogClassName="modal-xl">
      <Modal.Header closeButton>
        <Modal.Title>Create New Repair</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Choose Client</Form.Label>
            <div className="d-flex align-items-start">
              <div className="flex-grow-1 me-2">
                <Form.Control
                  className="rounded-pill"
                  type="text"
                  name="clientId"
                  value={newRepairInfo.clientId}
                  isInvalid={!!errors.clientId && touchedFields.clientId}
                  onChange={handleChanges}
                  placeholder="Digite o NIC"
                  readOnly
                />
                {errors.clientId && touchedFields.clientId && (
                  <div className="invalid-feedback d-block">{errors.clientId}</div>
                )}
              </div>
              <Button
                className="rounded-pill"
                style={{ backgroundColor: "var(--variant-two)", border: "none", width: "100px" }}
                onClick={() => setShowClientModal(true)}
                type="button"
              >
                Select
              </Button>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Choose Used Equipment</Form.Label>
            <div className="d-flex align-items-start">
              <div className="flex-grow-1 me-2">
                <Form.Control
                  className="rounded-pill"
                  type="text"
                  name="usedEquipmentId"
                  value={newRepairInfo.usedEquipmentId}
                  isInvalid={!!errors.usedEquipmentId && touchedFields.usedEquipmentId}
                  onChange={handleChanges}
                  placeholder="Selected a used equipment"
                  readOnly
                />
                {errors.usedEquipmentId && touchedFields.usedEquipmentId && (
                  <div className="invalid-feedback d-block">{errors.usedEquipmentId}</div>
                )}
              </div>
              <Button
                className="rounded-pill"
                style={{ backgroundColor: "var(--variant-two)", border: "none", width: "100px" }}
                onClick={() => setShowUsedEquipmentModal(true)}
                type="button"
              >
                Select
              </Button>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={newRepairInfo.description}
              isInvalid={!!errors.description && touchedFields.description}
              onChange={handleChanges}
              placeholder="Enter a summary of the problem"
              className="rounded"
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Budget</Form.Label>
            <Form.Control
              type="number"
              name="budget"
              value={newRepairInfo.budget}
              isInvalid={!!errors.budget && touchedFields.budget}
              onChange={handleChanges}
              placeholder="Enter the client estimated budget"
              className="rounded"
              min="0"
              step="0.01"
            />
            <Form.Control.Feedback type="invalid">
              {errors.budget}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estimated Delivery Date</Form.Label>
            <Form.Control
              type="date"
              name="estimatedDeliverDate"
              value={newRepairInfo.estimatedDeliverDate}
              isInvalid={!!errors.estimatedDeliverDate && touchedFields.estimatedDeliverDate}
              onChange={handleChanges}
              className="rounded"
              min={today}
            />
            <Form.Control.Feedback type="invalid">
              {errors.estimatedDeliverDate}
            </Form.Control.Feedback>
          </Form.Group>

          {errors.exist && (
            <div className="text-danger mb-3">{errors.exist}</div>
          )}

          <Button
            className="w-100 rounded-pill"
            style={{ backgroundColor: "var(--variant-two)", border: "none" }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Repair"}
          </Button>
        </Form>
      </Modal.Body>

      <ClientCatalogModal
        show={showClientModal}
        handleClose={() => setShowClientModal(false)}
        handleSelectClient={handleSelectClient}
        selectedClient={newRepairInfo.clientId}
      />

      <UsedEquipmentSelect
        show={showUsedEquipmentModal}
        handleClose={() => setShowUsedEquipmentModal(false)}
        handleSelectUsedEquipment={handleSelectUsedEquipment}
        selectedUsedEquipment={newRepairInfo.usedEquipmentId}
      />
    </Modal>
  );
}