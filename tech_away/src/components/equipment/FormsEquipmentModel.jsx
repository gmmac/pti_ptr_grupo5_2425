import React, { useRef, useState, useEffect } from "react";
import { Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import api from "../../utils/axios";
import FormsNewBrand from "../brands/FormsNewBrand";
import ModalToSelect from "./ModalToSelect";
import { Calendar } from 'primereact/calendar';

export default function FormsEquipmentModel({ showModal, closeModal, refreshTable, existingModel = null }) {

    const stepperRef = useRef(null);

    const [showBrandModal, setShowBrandModal] = useState(false);

    const [showNewBrandModal, setShowNewBrandModal] = useState(false);

    const [pendingBrand, setPendingBrand] = useState({ id: "", name: "" });

    const [equipmentModel, setEquipmentModel] = useState(() => {
        if (existingModel) {
            return {
                name: existingModel.name || "",
                brandId: existingModel.Brand?.id || "",
                brand: existingModel.Brand?.name || "",
                price: existingModel.price || "",
                releaseYear: existingModel.releaseYear || "",
            };
        }
        return {
            name: "",
            brandId: "",
            brand: "",
            price: "",
            releaseYear: "",
        };
    });

    useEffect(() => {
        if (existingModel) {
            setEquipmentModel({
                name: existingModel.name || "",
                brandId: existingModel.Brand?.id || "",
                brand: existingModel.Brand?.name || "",
                price: existingModel.price || "",
                releaseYear: existingModel.releaseYear || "",
            });
    
            setPendingBrand({
                id: existingModel.Brand?.id || "",
                name: existingModel.Brand?.name || "",
            });
        } else {
            setPendingBrand({ id: "", name: "" });
        }
    }, [existingModel]);

	const [errors, setErrors] = useState({});

	const handleChanges = (e) => {
		const { name, value } = e.target;
		setEquipmentModel((prev) => ({ ...prev, [name]: value }));

		let newErrors = { ...errors };

		if (!value) {
			newErrors[name] = "This field is required";
		} else {
			newErrors[name] = null;
		}

		setErrors(newErrors);
	};

    const handleBrandModel = ({ id, name }) => {
		setPendingBrand({ id, name });
        setErrors(prev => ({ ...prev, brand: null }))
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validação antes do envio
		let hasError = false;
		let newErrors = {};

        const fieldsToValidate = {
            ...equipmentModel,
            brand: pendingBrand.name,
            brandId: pendingBrand.id,
        };

		Object.keys(fieldsToValidate).forEach((field) => {
			if (!fieldsToValidate[field]) {
				newErrors[field] = "This field is required";
				hasError = true;
			}
		});

		setErrors(newErrors);
		if (hasError) return;

		const dataToSubmit = {
			name: equipmentModel.name,
            brand: pendingBrand.id,
            price: equipmentModel.price,
            releaseYear: equipmentModel.releaseYear,

		};

        const method = existingModel ? api.put : api.post;
        const url = existingModel ? `api/model/${existingModel.id}/` : "api/model/";

        try {
            await method(url, dataToSubmit);
            handleRefresh();
            refreshTable();
            closeModal();
        } catch (error) {
            if (error.response?.status === 400) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    exist: error.response.data.error,
                }));
            } else {
                console.error("API error:", error.message);
            }
        }
	};

    const handleNext = () => {
        let hasError = false;
        const newErrors = { ...errors };
    
        if (!pendingBrand.id) {
            newErrors.brand = "Brand is required";
            hasError = true;
        } else {
            newErrors.brand = null;
        }
    
        setErrors(newErrors);
    
        if (!hasError) {
            stepperRef.current.nextCallback();
        }
    };

	const handleRefresh = () => {
        if (existingModel) {
            setEquipmentModel({
                name: existingModel.name || "",
                brandId: existingModel.Brand?.id || "",
                brand: existingModel.Brand?.name || "",
                price: existingModel.price || "",
                releaseYear: existingModel.releaseYear || "",
            });
            setPendingBrand({
                id: existingModel.Brand?.id || "",
                name: existingModel.Brand?.name || "",
            });
        } else {
            setEquipmentModel({
                name: "",
                brandId: "",
                brand: "",
                price: "",
                releaseYear: "",
            });
            setPendingBrand({ id: "", name: "" });
        }
		setErrors({});
	};

	return (
		<Modal show={showModal} onHide={() => { closeModal(); handleRefresh()}} className={showNewBrandModal ? 'd-none' : ''}>
			<Modal.Header closeButton>
                <Modal.Title>{existingModel ? "Edit Equipment Model" : "Add New Equipment Model"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				
            {/* <div className="card flex justify-content-center"> */}
                <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }} className="custom-stepper" linear="true">
                    <StepperPanel header="Choose brand" style={{ paddingLeft: '0px' }}>
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <Form.Group className="mb-3">
                                    <Form.Label>Choose Brand</Form.Label>
                                    <div className="d-flex">
                                        <Form.Control
                                            type="text"
                                            name="brand"
                                            value={pendingBrand.name}
                                            isInvalid={!!errors.brand}
                                            readOnly
                                            className="rounded-pill me-2"
                                        />
                                        <Button
                                            className="rounded-pill"
                                            style={{ backgroundColor: "var(--variant-one", border: "none" , width: "100px"}}
                                            onClick={() => {setShowBrandModal(true)}
                                            }
                                        >Select
                                        </Button>
                                    </div>
                                    {errors.brand && (
                                        <div className="invalid-feedback d-block">
                                            {errors.brand}
                                        </div>
                                    )}
                                </Form.Group>
                            </div>
                                <Row className="d-flex justify-content-between align-items-center ">
                                    <Col xs={7} className="text-start">
                                    If the brand you're looking for does not exist, add a new one:
                                    </Col>
                                    <Col xs="auto" className="d-flex justify-content-end align-self-center">
                                    <Button
                                        className="rounded-pill"
                                        style={{ backgroundColor: "var(--variant-one", border: "none" }}
                                        onClick={() => setShowNewBrandModal(true)}
                                        >Add new Brand
                                    </Button>
                                    </Col>
                                </Row>          
                        </div>
                        <div className="flex pt-4 justify-content-start"></div>
                        <Stack gap={2} direction="horizontal">
                        <Button className="rounded-pill" label="Cancel" severity="secondary" icon="pi pi-times" onClick={() => {closeModal(); handleRefresh()}} />
                            <Button
                                className="rounded-pill ms-auto"
                                label="Next"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                style={{ backgroundColor: "var(--variant-one)", border: "none" }}
                                onClick={handleNext}
                            />
                        </Stack>    
                    </StepperPanel>
                    <StepperPanel header="Equipment Model">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        name="name"
                                        value={equipmentModel.name}
                                        isInvalid={!!errors.name}
                                        onChange={handleChanges}
                                        className="rounded-pill"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price (€)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter price"
                                        name="price"
                                        value={equipmentModel.price}
                                        isInvalid={!!errors.price}
                                        onChange={handleChanges}
                                        className="rounded-pill"
                                        onKeyDown={(evt) =>
                                            ['e', 'E', '+', '-', ','].includes(
                                                evt.key
                                            ) && evt.preventDefault()
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Release Year</Form.Label>
                                    <Calendar 
                                        value={equipmentModel.releaseYear ? new Date(equipmentModel.releaseYear, 0, 1) : null}
                                        onChange={(e) => handleChanges({ 
                                            target: { name: "releaseYear", value: e.value.getFullYear().toString() } 
                                        })}
                                        name="releaseYear"
                                        view="year" 
                                        dateFormat="yy" 
                                        showIcon
                                        appendTo="self"
                                        placeholder="Choose year"
                                        className={`p-inputtext ${errors.releaseYear ? "p-invalid" : ""}`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            border: "none",  // Remove a borda extra
                                            padding:"0px",
                                        }}
                                        inputStyle={{
                                            borderTopLeftRadius: "50px",
                                            borderBottomLeftRadius: "50px", // Arredondar a borda do input interno
                                            padding: "6px 12px"
                                        }}
                                        panelStyle={{
                                            borderRadius: "10px",
                                        }}
                                    />
                                    {errors.releaseYear && (
                                        <div className="invalid-feedback" style={{ display: 'block' }}>
                                        {errors.releaseYear}
                                        </div>
                                    )}
                                </Form.Group>
                                <style>
                                    {`
                                        .p-datepicker-trigger {
                                            border: var(--variant-one);
                                            border-top-right-radius: 50px !important;
                                            border-bottom-right-radius: 50px !important;
                                            padding-right: 0.3rem;
                                            background-color: var(--variant-one);
                                        }
                                    `}
                                    </style>
                            </div>
                            
                        </div>
                        {errors.exist && (
                        <div className="text-danger mb-3">
                            {errors.exist}
                        </div>
                     )}
                        <div className="flex pt-4 justify-content-start">
                            
                        </div>
                        
                        <Stack gap={2} direction="horizontal">
                            <Button className="rounded-pill" label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                            <Button
                                className="rounded-pill ms-auto"
                                style={{ backgroundColor: "var(--variant-one)", border: "none" }}
                                onClick={handleSubmit}
                            >
                                {existingModel ? "Update Equipment Model" : "Add Equipment Model"}
                            </Button>
                        </Stack>
                        
                    </StepperPanel>
                    
                </Stepper>
                <style>
                    {`
                        .p-stepper .p-stepper-header.p-highlight .p-stepper-number {
                            background-color: var(--variant-one);
                        }

                        .p-stepper .p-stepper-header:has(~ .p-highlight) .p-stepper-separator {
                            background-color: var(--variant-one);
                        }
                    `}
                </style>
            {/* </div> */}
        
			</Modal.Body>

            {/* Modal de seleção para brand */}
            <ModalToSelect
                showModal={showBrandModal}
                closeModal={() => setShowBrandModal(false)}
                title="brand"
                selectedItem = {{ id: equipmentModel.brandId, name: equipmentModel.brand }}
                onSelect={handleBrandModel}
            />

            {/* Modal de criação de nova brand */}
            <FormsNewBrand
                showModal={showNewBrandModal}
                closeModal={() => setShowNewBrandModal(false)}
                refreshTable={refreshTable}
            />

		</Modal>
	);
}
