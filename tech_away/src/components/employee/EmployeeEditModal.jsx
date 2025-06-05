// src/components/EmployeeEditModal.jsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, InputGroup, Stack } from "react-bootstrap";
import api from "../../utils/axios";
import StoreCatalogModal from "../store/StoreCatalogModal";
import { confirmDialog } from "primereact/confirmdialog";

export default function EmployeeEditModal({ show, onHide, employee, onSave }) {
  const [formData, setFormData] = useState({
    internNum: "",
    store: null,
    role: null,
  });
  const [roles, setRoles] = useState([]);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get("/api/employeeRole")
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Error fetching roles:", err));
  }, []);

  // Reset and populate formData when modal opens or employee changes
  useEffect(() => {
    if (show && employee) {
      setFormData({
        internNum: employee.internNum ?? "",
        store: {nipc: employee.storeNIPC, name: employee.storeName} || null,
        role: {id: employee.roleId, name: employee.roleName} || null,
      });
      setErrors({});
    }
  }, [show, employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      const selectedRole = roles.find((r) => String(r.id) === value) || null;
      setFormData((prev) => ({ ...prev, role: selectedRole }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectStore = (store) => {
    setFormData((prev) => ({
      ...prev,
      store: store,
    }));
    setErrors((prev) => ({ ...prev, store: null }));
    setShowStoreModal(false);
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.role) newErrors.role = "Please select a role.";
    if (!formData.store) newErrors.store = "Please select a store.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataToSend = {
      role: formData.role.id,
      storeNIPC: formData.store.nipc,
    };

    onSave(formData.internNum, dataToSend);
  };


    const confirmEdit = (id) => {
      confirmDialog({
          message: (<> Are you sure you want to edit this Employee?</>),
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => handleSubmit(),
      });
    };

    const confirmCancel = (id) => {
      confirmDialog({
          message: (<> Are you sure you want to cancel this Employee's edit?</>),
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => onHide(),
      });
    };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Role Select */}
            <Row className="mb-3">
              <Col sm={12} md={6}>
                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role?.id ?? ""}
                    onChange={handleChange}
                    isInvalid={!!errors.role}
                    className="rounded-pill me-2"
                  >
                    <option value="">Select Role</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.role}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.role}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Store Select via Modal */}
            <Row>
              <Col sm={12} md={8}>
                <Form.Group controlId="storeNIPC" className="mb-3">
                  <Form.Label>Store</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      readOnly
                      value={formData.store?.name || ""}
                      placeholder="Select a Store"
                      isInvalid={!!errors.store}
                      className="rounded-pill me-2"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowStoreModal(true)}
                    >
                      Select
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors.store}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <Stack gap={2} direction="horizontal" className="justify-content-end mt-2">
            <Button
              className="rounded-pill"
              variant="secondary"
              onClick={confirmCancel}
            >
              Cancel
            </Button>
            <Button
              className="rounded-pill"
              style={{ backgroundColor: "var(--variant-one)", border: "none" }}
              onClick={confirmEdit}
            >
              Save Changes
            </Button>
          </Stack>
        </Modal.Body>
      </Modal>

      <StoreCatalogModal
        show={showStoreModal}
        handleClose={() => setShowStoreModal(false)}
        handleSelectStore={handleSelectStore}
        selectedStore={formData.store?.nipc}
      />
    </>
  );
}
