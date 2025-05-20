import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import api from "../../utils/axios";

export default function NewRepairStatusLog({ repairId, showModal, closeModal, setRefreshRepairs }) {
  const [repairStatusLogInfo, setRepairStatusLogInfo] = useState({
    statusId: '',
    description: '',
  });
  const [repairStatuses, setRepairStatuses] = useState([]);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (showModal) {
      resetForm();
    }
  }, [showModal]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await api.get("/api/repairStatus");
        setRepairStatuses(res.data);
      } catch (error) {
        console.error("Error fetching repair statuses:", error);
      }
    };
  
    if (showModal) {
      fetchStatuses();
      resetForm();
    }
  }, [showModal]);

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setRepairStatusLogInfo(prev => ({
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

    for (const field in repairStatusLogInfo) {
      if (!repairStatusLogInfo[field]) {  // Não validar o statusID
        newErrors[field] = "This field is mandatory";
        hasError = true;
      }
    }

    setErrors(newErrors);
    setTouchedFields({
        statusId: true,
        description: true,
    });

    return !hasError;
  };

  const resetForm = () => {
    setRepairStatusLogInfo({ statusId: '', description: '' });
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
            const payload = {
                ...repairStatusLogInfo,
                repairId: repairId
            };
            await api.post("/api/repairStatusLogs/", payload);
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
            <Modal.Title>New Repair Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Repair Status</Form.Label>
                <Form.Select
                    name="statusId"
                    value={repairStatusLogInfo.statusId}
                    isInvalid={!!errors.statusId && touchedFields.statusId}
                    onChange={handleChanges}
                    className="rounded"
                >
                    <option value="">Select a repair status...</option>
                    {repairStatuses.map(status => (
                    <option key={status.id} value={status.id}>
                        {status.state}
                    </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.statusId}
                </Form.Control.Feedback>
            </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={repairStatusLogInfo.description}
                    isInvalid={!!errors.description && touchedFields.description}
                    onChange={handleChanges}
                    placeholder="Enter a summary of the problem"
                    className="rounded"
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
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
                {isSubmitting ? "Creating..." : "Add Status"}
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    );
}