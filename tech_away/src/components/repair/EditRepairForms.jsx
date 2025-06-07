import React, { useState, useEffect, useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import api from "../../utils/axios";
import ClientCatalogModal from "../storePurchase/ClientCatalogModal";
import UsedEquipmentSelect from "../equipment/UsedEquipmentSelect";
import { Toast } from "primereact/toast";

export default function EditRepairForms({ repairID, showModal, closeModal, setRefreshRepairs }) {
  const [repairInfo, setRepairInfo] = useState({
    description: '',
    clientId: '',
    statusID: 1,
    usedEquipmentId: '',
    budget: '',
    estimatedDeliverDate: '',
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [showClientModal, setShowClientModal] = useState(false);
  const [showUsedEquipmentModal, setShowUsedEquipmentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useRef(null); // Ref para o Toast

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (showModal && repairID) {
      fetchRepair();
    } else if (showModal) {
      resetForm();
    }
  }, [showModal, repairID]);

  const fetchRepair = async () => {
    try {
      const response = await api.get(`/api/repair/${repairID}`);
      const data = response.data;

      setRepairInfo({
        description: data.description || '',
        clientId: data.clientId || '',
        statusID: data.statusID || 1,
        usedEquipmentId: data.usedEquipmentId || '',
        budget: data.budget || '',
        estimatedDeliverDate: data.estimatedDeliverDate?.split("T")[0] || '',
      });
    } catch (error) {
      console.error("Erro ao buscar os dados da reparação:", error);
    }
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setRepairInfo(prev => ({
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
        [name]: value ? "" : "This field is mandatory"
      }));
    }
  };

  const validateFields = () => {
    let newErrors = {};
    let hasError = false;

    for (const field in repairInfo) {
      if (!repairInfo[field] && field !== 'statusID') {
        newErrors[field] = "This field is mandatory";
        hasError = true;
      }
      if (field === "budget" && isNaN(repairInfo[field])) {
        newErrors[field] = "Invalid budget";
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
    setRepairInfo(prev => ({
      ...prev,
      clientId: client?.nic || ''
    }));
    setShowClientModal(false);
  };

  const handleSelectUsedEquipment = (usedEquipment) => {
    setRepairInfo(prev => ({
      ...prev,
      usedEquipmentId: usedEquipment?.id || ''
    }));
    setShowUsedEquipmentModal(false);
  };

  const resetForm = () => {
    setRepairInfo({
      description: '',
      clientId: '',
      statusID: 1,
      usedEquipmentId: '',
      budget: '',
      estimatedDeliverDate: '',
    });
    setErrors({});
    setTouchedFields({});
  };

  const handleClose = () => {
    resetForm();
    closeModal();
    setRefreshRepairs(true);
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: repairID ? "Repair updated successfully" : "Repair created successfully",
      detail: "The repair has been successfully processed.",
      life: 3000,
    });
  };

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    setIsSubmitting(true);

    try {
      const payload = { ...repairInfo, statusID: 1 };

      if (repairID) {
        await api.put(`/api/repair/${repairID}`, payload);
      } else {
        await api.post("/api/repair/", payload);
      }

      showSuccess();  // Exibe a notificação de sucesso após o envio

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors(prev => ({
          ...prev,
          exist: error.response.data.error
        }));
      } else {
        showError("An error occurred while processing your request.");
        console.error("API error:", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} dialogClassName="modal-xl">
      <Modal.Header closeButton>
        <Modal.Title>{repairID ? "Edit Repair" : "Create New Repair"}</Modal.Title>
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
                  value={repairInfo.clientId}
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
                  value={repairInfo.usedEquipmentId}
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
              value={repairInfo.description}
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
              value={repairInfo.budget}
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
              value={repairInfo.estimatedDeliverDate}
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
            {isSubmitting ? (repairID ? "Updating..." : "Creating...") : (repairID ? "Update Repair" : "Create Repair")}
          </Button>
        </Form>
      </Modal.Body>

      <ClientCatalogModal
        show={showClientModal}
        handleClose={() => setShowClientModal(false)}
        handleSelectClient={handleSelectClient}
        selectedClient={repairInfo.clientId}
      />

      <UsedEquipmentSelect
        show={showUsedEquipmentModal}
        handleClose={() => setShowUsedEquipmentModal(false)}
        handleSelectUsedEquipment={handleSelectUsedEquipment}
        selectedUsedEquipment={repairInfo.usedEquipmentId}
      />

      <Toast ref={toast} />  {/* Toast Component */}
    </Modal>
  );
}
