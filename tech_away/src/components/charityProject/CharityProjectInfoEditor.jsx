import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Alert } from 'react-bootstrap';
import api from '../../utils/axios';
import DatePicker from '../elements/DatePicker';
import WarehouseCatalogModal from '../warehouse/WarehouseCatalogModal';

export default function CharityProjectInfoEditor({ project, onChangeAlert, onRefresh, setProject, setSelectedProject }) {
    const [editing, setEditing] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
    const [errors, setErrors] = useState({});
    const [statusOptions, setStatusOptions] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        completionDate: '',
        warehouse: '',
        warehouseID: '',
        status: '',
        statusID: ''
    });
    const [originalData, setOriginalData] = useState(null);
    const [showWarehouseModal, setShowWarehouseModal] = useState(false);

    useEffect(() => {
        if (project) {
            const initData = {
                name: project.name || '',
                startDate: project.startDate || '',
                completionDate: project.completionDate || '',
                warehouse: project.Warehouse?.name || '',
                warehouseID: project.warehouseID || '',
                status: project.ProjectStatus?.state || '',
                statusID: project.ProjectStatus?.id || ''
            };
            setFormData(initData);
            setOriginalData(initData);
        }
    }, [project]);

    useEffect(() => {
        const fetchStatusOptions = async () => {
            try {
                const res = await api.get('/api/projectStatus');
                setStatusOptions(res.data.data);
            } catch (err) {
                console.error('Error loading status options:', err);
            }
        };
        fetchStatusOptions();
    }, []);

    const handleSelectWarehouse = (warehouse) => {
        setFormData(prev => ({
            ...prev,
            warehouse: warehouse?.name || '',
            warehouseID: warehouse?.id || ''
        }));
        setShowWarehouseModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const hasChanged = () => {
        if (!originalData) return false;
        return (
            formData.name !== originalData.name ||
            formData.startDate !== originalData.startDate ||
            formData.completionDate !== originalData.completionDate ||
            formData.warehouseID !== originalData.warehouseID ||
            formData.statusID !== originalData.statusID
        );
    };

    const handleCancel = () => {
        if (!originalData) return;
        setFormData(originalData);
        setErrors({});
        setEditing(false);
    };


    const validateForm = () => {
        const newErrors = {};
        let hasError = false;
    
        const requiredFields = ['name', 'startDate', 'warehouseID', 'statusID'];
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
                hasError = true;
            }
        });
    
        if (formData.completionDate && formData.startDate) {
            const start = new Date(formData.startDate);
            const completion = new Date(formData.completionDate);
            if (completion < start) {
                newErrors.completionDate = "Completion date must be after start date";
                hasError = true;
            }
        }
    
        const now = new Date();
        const selectedStatusLabel = statusOptions.find(s => s.id == formData.statusID)?.state;
    
        if (selectedStatusLabel === "Opened") {
            const start = new Date(formData.startDate);
            if (!formData.startDate || start > now) {
                newErrors.statusID = `"Opened" status requires a valid start date before or equal to today`;
                hasError = true;
            }
        }
    
        if (selectedStatusLabel === "Closed") {
            const completion = new Date(formData.completionDate);
            if (!formData.completionDate || completion > now) {
                newErrors.statusID = `"Closed" status requires a valid completion date before or equal to today`;
                hasError = true;
            }
        }
    
        return { hasError, errors: newErrors };
    };
    
    const handleSave = async () => {
        const { hasError, errors } = validateForm();
        setErrors(errors);
        if (hasError) return;
    
        try {
            await api.put(`/api/charityProject/${project.id}`, {
                name: formData.name,
                startDate: formData.startDate,
                completionDate: formData.completionDate,
                warehouseID: formData.warehouseID,
                statusID: formData.statusID
            });
    
            const updatedProject = await api.get(`/api/charityProject/${project.id}`);
            const updatedData = {
                name: updatedProject.data.name || '',
                startDate: updatedProject.data.startDate || '',
                completionDate: updatedProject.data.completionDate || '',
                warehouse: updatedProject.data.Warehouse?.name || '',
                warehouseID: updatedProject.data.warehouseID || '',
                status: updatedProject.data.ProjectStatus?.state || '',
                statusID: updatedProject.data.ProjectStatus?.id || ''
            };
    
            setProject(updatedProject.data);
            setSelectedProject(updatedProject.data);
            setFormData(updatedData);
            setOriginalData(updatedData);
            setErrors({});
            setEditing(false);
            setAlert({ show: true, message: 'Project updated successfully!', variant: 'success' });
            onChangeAlert?.({ message: 'Project updated!', variant: 'success' });
            onRefresh?.();
        } catch (error) {
            console.error('Update error:', error);
            setAlert({ show: true, message: 'Failed to update project.', variant: 'danger' });
            onChangeAlert?.({ message: 'Failed to update project.', variant: 'danger' });
        }
    
        setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 4000);
    };
    

    if (!project) return null;

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="fw-semibold mb-0">Project Info</h5>
                {!editing ? (
                    <Button variant="primary" size="sm" onClick={() => setEditing(true)}>Edit</Button>
                ) : (
                    <div className="d-flex gap-2">
                        <Button variant="success" size="sm" onClick={handleSave} disabled={!hasChanged()}>
                            Save
                        </Button>
                        <Button variant="outline-secondary" size="sm" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                )}
            </div>

            {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                    {alert.message}
                </Alert>
            )}

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label><strong>Name:</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            disabled={!editing}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label><strong>Status:</strong></Form.Label>
                        {editing ? (
                            <>
                                <Form.Select
                                    name="statusID"
                                    value={formData.statusID}
                                    onChange={(e) => {
                                        const selected = statusOptions.find(opt => opt.id == e.target.value);
                                        setFormData(prev => ({
                                            ...prev,
                                            statusID: e.target.value,
                                            status: selected?.state || ''
                                        }));
                                    }}
                                    isInvalid={!!errors.statusID}
                                    className="rounded-pill"
                                >
                                    <option value="">Select status</option>
                                    {statusOptions.map(status => (
                                        <option key={status.id} value={status.id}>{status.state}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.statusID}
                                </Form.Control.Feedback>
                            </>
                        ) : (
                            <Form.Control
                                type="text"
                                value={formData.status}
                                disabled
                                plaintext
                            />
                        )}
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <DatePicker
                        label="Start Date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        error={!!errors.startDate}
                        disabled={!editing}
                    />
                    {errors.startDate && <div className="invalid-feedback d-block">{errors.startDate}</div>}
                </Col>
                <Col md={6}>
                    <DatePicker
                        label="Completion Date"
                        name="completionDate"
                        value={formData.completionDate}
                        onChange={handleChange}
                        error={!!errors.completionDate}
                        disabled={!editing}
                    />
                    {errors.completionDate && <div className="invalid-feedback d-block">{errors.completionDate}</div>}
                </Col>
            </Row>

            <Row className="mb-4">
    <Col md={12}>
        <Form.Group>
            <Form.Label><strong>Warehouse:</strong></Form.Label>
            <div className={`d-flex flex-column flex-md-row gap-3`}>
                <Form.Control
                    type="text"
                    value={formData.warehouse ? `${formData.warehouse} (ID: ${formData.warehouseID})` : ''}
                    readOnly
                    plaintext={!editing}
                    className={`flex-grow-1 ${editing ? "rounded-pill" : ""}`}
                    isInvalid={!!errors.warehouseID}
                />
                {editing && (
                    <Button
                        variant="outline-primary"
                        onClick={() => setShowWarehouseModal(true)}
                        className="rounded-pill"
                    >
                        Select
                    </Button>
                )}
            </div>
            <Form.Control.Feedback type="invalid">{errors.warehouseID}</Form.Control.Feedback>
        </Form.Group>
    </Col>
</Row>

            <WarehouseCatalogModal
                show={showWarehouseModal}
                handleClose={() => setShowWarehouseModal(false)}
                handleSelectWarehouse={handleSelectWarehouse}
                selectedWarehouse={{ id: formData.warehouseID, name: formData.warehouse }}
            />
        </>
    );
}
