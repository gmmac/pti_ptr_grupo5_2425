import React, { useRef, useState, useEffect } from "react";
import { Form, Modal, Col, Row, Stack } from "react-bootstrap";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import api from "../../utils/axios";
import ModalToSelect from "./ModalToSelect"; // Importa o modal
import FormsEquipmentModel from "./FormsEquipmentModel";
import FormsEquipmentType from "./FormsEquipmentType";

export default function FormsEquipmentSheet({ showModal, closeModal, refreshTable, existingSheet = null  }) {

	const stepperRef = useRef(null);
	const [activeStep, setActiveStep] = useState(0);

	const [showModelModal, setShowModelModal] = useState(false);

	const [showNewModelModal, setShowNewModelModal] = useState(false);

	const [showTypeModal, setShowTypeModal] = useState(false);

	const [showNewTypeModal, setShowNewTypeModal] = useState(false);

	const [pendingModel, setPendingModel] = useState({ id: "", name: "" });

	const [pendingType, setPendingType] = useState({ id: "", name: "" });

	const [equipmentSheet, setEquipmentSheet] = useState(() => {
		if(existingSheet){
			return {
				barcode: existingSheet.Barcode || "",
				modelId: existingSheet.EquipmentModel?.id || "",
				model: existingSheet.EquipmentModel?.name || "",
				typeId: existingSheet.EquipmentType?.id || "",
				type:existingSheet.EquipmentType?.name ||  "",
			}
		}
		return {
			barcode: "",
			modelId: "",
			model: "",
			typeId: "",
			type: "",
		}
		
	});

	useEffect(() => {
			if (existingSheet) {
				console.log(existingSheet)
				setEquipmentSheet({
					barcode: existingSheet.Barcode || "",
					modelId: existingSheet.EquipmentModel?.id || "",
					model: existingSheet.EquipmentModel?.name || "",
					typeId: existingSheet.EquipmentType?.id || "",
					type:existingSheet.EquipmentType?.name ||  "",
				});
		
				setPendingModel({
					id: existingSheet.EquipmentModel?.id || "",
					name: existingSheet.EquipmentModel?.name || "",
				});

				setPendingType({
					id: existingSheet.EquipmentType?.id || "",
					name: existingSheet.EquipmentType?.name || "",
				});

			} else {
				setPendingModel({ id: "", name: "" });
				setPendingType({ id: "", name: "" });
			}
		}, [existingSheet]);

	const [errors, setErrors] = useState({});

	const handleChanges = (e) => {
		const { name, value } = e.target;
		setEquipmentSheet((prev) => ({ ...prev, [name]: value }));

		let newErrors = { ...errors };

		if (!value) {
			newErrors[name] = "This field is required";
		} else {
			newErrors[name] = null;
		}

		// Validação de barcode
		if (name === "barcode" && value.length !== 20) {
			newErrors[name] = "Barcode needs to have 20 characters";
		}

		setErrors(newErrors);
	};

	// Função para atualizar os campos com os valores do modal
	const handleSelectModel = ({ id, name }) => {
		setPendingModel({ id, name });
		setErrors(prev => ({ ...prev, model: null }))
	};

	const handleSelectType = ({ id, name }) => {
		setPendingType({ id, name });
		setErrors(prev => ({ ...prev, type: null }))
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validação antes do envio
		let hasError = false;
		let newErrors = {};

		const fieldsToValidate = {
            ...equipmentSheet,
			model: pendingModel.name,
			modelId: pendingModel.id,
			type: pendingType.name,
			typeId: pendingType.id,
        };

		Object.keys(fieldsToValidate).forEach((field) => {
			if (!fieldsToValidate[field]) {
				newErrors[field] = "This field is required";
				hasError = true;
			}
			if (field === "barcode" && fieldsToValidate[field] && fieldsToValidate[field].length !== 20) {
				newErrors[field] = "Barcode needs to have 20 characters";
				hasError = true;
			}
		});

		setErrors(newErrors);
		if (hasError) return;

		const dataToSubmit = {
			barcode: equipmentSheet.barcode,
			model: pendingModel.id,
			type: pendingType.id,
		};

		const method = existingSheet ? api.put : api.post;
		const url = existingSheet ? `api/equipmentSheet/${existingSheet.Barcode}/` : "api/equipmentSheet/";

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
	
		if (activeStep === 0) {
			if (!pendingModel.id) {
				newErrors.model = "Equipment Model is required";
				hasError = true;
			} else {
				newErrors.model = null;
			}
		}
	
		if (activeStep === 1) {
			if (!pendingType.id) {
				newErrors.type = "Equipment Type is required";
				hasError = true;
			} else {
				newErrors.type = null;
			}
		}
	
		setErrors(newErrors);
	
		if (!hasError) {
			stepperRef.current.nextCallback();
			setActiveStep((prev) => prev + 1);
		}
	};
	

	const handleRefresh = () => {
		if(existingSheet){
			setEquipmentSheet({
				barcode: existingSheet.Barcode || "",
				modelId: existingSheet.EquipmentModel?.id || "",
				model: existingSheet.EquipmentModel?.name || "",
				typeId: existingSheet.EquipmentType?.id || "",
				type:existingSheet.EquipmentType?.name ||  "",
			});
			setPendingModel({
				id: existingSheet.EquipmentModel?.id || "",
				name: existingSheet.EquipmentModel?.name || "",
			});

			setPendingType({
				id: existingSheet.EquipmentType?.id || "",
				name: existingSheet.EquipmentType?.name || "",
			});
		} else {
			setEquipmentSheet({
				barcode: "",
				modelId: "",
				model: "",
				typeId: "",
				type: "",
			});
			setPendingModel({ id: "", name: "" });
			setPendingType({ id: "", name: "" });
		}
		setActiveStep(0);
		setErrors({});
	};

	return (
		<Modal show={showModal} onHide={() => { closeModal(); handleRefresh()}} size="lg" className={showNewModelModal || showNewTypeModal ? 'd-none' : ''}>
			<Modal.Header closeButton>
                <Modal.Title>{existingSheet ? "Edit Equipment Sheet" : "Add New Equipment Sheet"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
                <Stepper ref={stepperRef} style={{ flexBasis: '60rem' }} className="custom-stepper" linear="true">
                    <StepperPanel header="Choose Model" style={{ paddingLeft: '0px' }}>
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <Form.Group className="mb-3">
                                    <Form.Label>Choose Equipment Model</Form.Label>
                                    <div className="d-flex">
                                        <Form.Control
                                            type="text"
                                            name="model"
                                            value={pendingModel.name}
                                            isInvalid={!!errors.model}
                                            readOnly
                                            className="rounded-pill me-2"
                                        />
                                        <Button
                                            className="rounded-pill"
                                            style={{ backgroundColor: "var(--variant-one", border: "none" , width: "100px"}}
                                            onClick={() => {setShowModelModal(true)}
                                            }
										>
											Select
                                        </Button>
                                    </div>
                                    {errors.model && (
                                        <div className="invalid-feedback d-block">
                                            {errors.model}
                                        </div>
                                    )}
                                </Form.Group>
                            </div>
                                <Row className="d-flex justify-content-between align-items-center ">
                                    <Col xs={7} className="text-start">
                                    If the equipment model you're looking for does not exist, add a new one:
                                    </Col>
                                    <Col xs="auto" className="d-flex justify-content-end align-self-center">
                                    <Button
                                        className="rounded-pill"
                                        style={{ backgroundColor: "var(--variant-one", border: "none" }}
                                        onClick={() => setShowNewModelModal(true)}
                                        >Add new Equipment Model
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
					<StepperPanel header="Choose Type" style={{ paddingLeft: '0px' }}>
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <Form.Group className="mb-3">
                                    <Form.Label>Choose Equipment Type</Form.Label>
                                    <div className="d-flex">
                                        <Form.Control
                                            type="text"
                                            name="type"
                                            value={pendingType.name}
                                            isInvalid={!!errors.type}
                                            readOnly
                                            className="rounded-pill me-2"
                                        />
                                        <Button
                                            className="rounded-pill"
                                            style={{ backgroundColor: "var(--variant-one", border: "none" , width: "100px"}}
                                            onClick={() => {setShowTypeModal(true)}
                                            }
										>
											Select
                                        </Button>
                                    </div>
                                    {errors.type && (
                                        <div className="invalid-feedback d-block">
                                            {errors.type}
                                        </div>
                                    )}
                                </Form.Group>
                            </div>
                                <Row className="d-flex justify-content-between align-items-center ">
                                    <Col xs={7} className="text-start">
                                    If the equipment type you're looking for does not exist, add a new one:
                                    </Col>
                                    <Col xs="auto" className="d-flex justify-content-end align-self-center">
                                    <Button
                                        className="rounded-pill"
                                        style={{ backgroundColor: "var(--variant-one", border: "none" }}
                                        onClick={() => setShowNewTypeModal(true)}
                                        >Add new Equipment Type
                                    </Button>
                                    </Col>
                                </Row>          
                        </div>
						<div className="flex pt-4 justify-content-start"></div>
						<Stack gap={2} direction="horizontal">
                            <Button className="rounded-pill" label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => {stepperRef.current.prevCallback(); setActiveStep((prev) => prev - 1); }}/>
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
                    <StepperPanel header="Barcode">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <Form.Group className="mb-3">
                                    <Form.Label>Barcode</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter barcode"
                                        name="barcode"
                                        value={equipmentSheet.barcode}
                                        isInvalid={!!errors.barcode}
                                        onChange={handleChanges}
                                        className="rounded-pill"
										disabled={existingSheet ? true : false}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.barcode}
                                    </Form.Control.Feedback>
								</Form.Group>
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
                            <Button className="rounded-pill" label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => {stepperRef.current.prevCallback(); setActiveStep((prev) => prev - 1)}} />
                            <Button
                                className="rounded-pill ms-auto"
                                style={{ backgroundColor: "var(--variant-one)", border: "none" }}
                                onClick={handleSubmit}
                            >
                                {existingSheet ? "Update Equipment Sheet" : "Add Equipment Sheet"}
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
                showModal={showModelModal}
                closeModal={() => setShowModelModal(false)}
                title="model"
                selectedItem = {{ id: equipmentSheet.modelId, name: equipmentSheet.model }}
                onSelect={handleSelectModel}
            />

			{/* Modal de seleção para Type */}
			<ModalToSelect
                showModal={showTypeModal}
                closeModal={() => setShowTypeModal(false)}
                title="type"
                selectedItem = {{ id: equipmentSheet.typeId, name: equipmentSheet.type }}
                onSelect={handleSelectType}
            />

            {/* Modal de criação de novo equipment model */}
			<FormsEquipmentModel 
				showModal={showNewModelModal} 
				closeModal={() => setShowNewModelModal(false)} 
				refreshTable={refreshTable}	
			/>

			<FormsEquipmentType 
				showModal={showNewTypeModal} 
				closeModal={() => setShowNewTypeModal(false)} 
				refreshTable={refreshTable}	
			/>


		</Modal>
	);
}
