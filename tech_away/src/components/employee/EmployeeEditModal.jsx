import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import api from "../../utils/axios";
import StoreCatalogModal from "../store/StoreCatalogModal";

export default function EmployeeEditModal({ show, onHide, employee, onSave }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "M",
    internNum: "",
    storeNIPC: "",
    store: null,
    role: "",
  });

  const [roles, setRoles] = useState([]);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get('/api/employeeRole')
      .then(res => setRoles(res.data))
      .catch(err => console.error("Error fetching roles:", err));
  }, []);

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        gender: employee.gender || "M",
        internNum: employee.internNum || "",
        storeNIPC: employee.Store?.nipc || "",
        store: employee.Store || null,
        role: employee.EmployeeRole?.id || "",
      });
      setErrors({});
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectStore = (store) => {
    setFormData((prev) => ({
      ...prev,
      storeNIPC: store?.nipc || "",
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
      ...formData,
      storeNIPC: formData.store?.nipc || "",
      role: formData.role,
    };

    onSave(formData.internNum, dataToSend);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
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
                    value={formData.role}
                    onChange={handleChange}
                    isInvalid={!!errors.role}
                    className="auth-input"
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.role}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
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
