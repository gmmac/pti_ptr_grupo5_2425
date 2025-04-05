import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import api from "../../utils/axios";
import WarehouseCatalogModal from "../warehouse/WarehouseCatalogModal";
import DatePicker from "../elements/DatePicker";

export default function RegisterCharityProject({ showModal, closeModal, setRefresh }) {
    const [charityProject, setCharityProject] = useState({
        startDate: "",
        completionDate: "",
        projectName: "",
        warehouseID: "",
    });

    const [showWarehouseModal, setShowWarehouseModal] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        console.log(charityProject);
    }, [charityProject]);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setCharityProject((prev) => ({ ...prev, [name]: value }));

        setErrors((prev) => ({
            ...prev,
            [name]: value ? "" : "This field is required",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        let newErrors = {};

        Object.keys(charityProject).forEach(field => {
            if (!charityProject[field]) {
                newErrors[field] = 'This field is required';
                hasError = true;
            } else {
                newErrors[field] = '';
            }
        });

        if (!charityProject.warehouseID || isNaN(charityProject.warehouseID)) {
            newErrors.warehouseID = "Please select a warehouse";
            hasError = true;
        }

        if (charityProject.completionDate && charityProject.startDate) {
            const start = new Date(charityProject.startDate);
            const completion = new Date(charityProject.completionDate);

            if (completion < start) {
                newErrors.completionDate = "Completion date must be after start date";
                hasError = true;
            }
        }

        setErrors(newErrors);
        if (hasError) return;

        try {
            await api.post("/api/charityProject/", charityProject);
            handleReset();
            closeModal();
            setRefresh();
        } catch (error) {
            console.error("API error:", error.response?.data || error.message);
        }
    };

    const handleSelectWarehouse = (warehouse) => {
        setSelectedWarehouse(warehouse);
    
        setCharityProject(prev => ({
            ...prev,
            warehouseID: warehouse ? warehouse.id : ""
        }));
    
        setErrors(prev => ({
            ...prev,
            warehouseID: warehouse ? "" : "Please select a warehouse"
        }));
    
        setShowWarehouseModal(false);
    };
    

    const handleReset = () => {
        setCharityProject({
            startDate: "",
            completionDate: "",
            projectName: "",
            warehouseID: "",
        });
        setSelectedWarehouse(null);
        setErrors({});
    };

    return (
        <>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Register Charity Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="projectName"
                                value={charityProject.projectName}
                                isInvalid={!!errors.projectName}
                                onChange={handleChanges}
                                className="rounded-pill"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.projectName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <DatePicker
                            label="Start Date"
                            name="startDate"
                            value={charityProject.startDate}
                            error={errors.startDate}
                            onChange={handleChanges}
                            placeholder="Select start date"
                        />

                        <DatePicker
                            label="Completion Date"
                            name="completionDate"
                            value={charityProject.completionDate}
                            error={errors.completionDate}
                            onChange={handleChanges}
                            placeholder="Select completion date"
                        />

                        <Form.Group className="mb-3">
                            <Form.Label>Warehouse</Form.Label>
                            <Form.Control
                                type="text"
                                value={
                                    selectedWarehouse
                                        ? `${selectedWarehouse.name} (ID: ${selectedWarehouse.id})`
                                        : ""
                                }
                                isInvalid={!!errors.warehouseID}
                                readOnly
                                className="rounded-pill"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.warehouseID}
                            </Form.Control.Feedback>
                            <Button
                                variant="outline-primary"
                                onClick={() => setShowWarehouseModal(true)}
                                className="mt-2 w-100 rounded-pill"
                            >
                                Select Warehouse
                            </Button>
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100 rounded-pill mt-3"
                            style={{
                                backgroundColor: "var(--variant-two)",
                                border: "none",
                            }}
                        >
                            Register Project
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <WarehouseCatalogModal
                show={showWarehouseModal}
                handleClose={() => setShowWarehouseModal(false)}
                handleSelectWarehouse={handleSelectWarehouse}
                selectedWarehouse={selectedWarehouse}
            />
        </>
    );
}
