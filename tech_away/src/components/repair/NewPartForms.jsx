import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import api from "../../utils/axios";
import EquipmentCatalogModal from "../storePurchase/EquipmentCatalogModal";

export default function NewPartForms({ partID, showModal, closeModal, refreshTable }) {
	const [part, setPart] = useState({
		name: "",
		price: "",
		arriveTime: "",
		equipmentId: "",
	});

	const [showModalEq, setShowModalEq] = useState(false);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Busca a Part para editar quando partID mudar e modal abrir
	useEffect(() => {
		if (partID && showModal) {
			api.get(`/api/part/${partID}`)
				.then((res) => {
					const data = res.data;
					// Ajuste conforme estrutura da sua API
					setPart({
						name: data.name || "",
						price: data.price || "",
						arriveTime: data.arriveTime || "",
						equipmentId: data.equipmentId || "",
					});
					setErrors({});
				})
				.catch((err) => {
					console.error("Erro ao carregar part para edição:", err);
				});
		} else {
			// Se não houver partID, limpa o formulário ao abrir modal
			handleRefresh();
		}
	}, [partID, showModal]);

	const handleChanges = (e) => {
		const { name, value } = e.target;
		setPart((prev) => ({ ...prev, [name]: value }));

		let newErrors = {};

		if (!value) {
			newErrors[name] = "This field is required";
		} else {
			newErrors[name] = "";
		}

		setErrors((prev) => ({ ...prev, ...newErrors }));
	};

	const handleSelectEquipment = (equipmentSheet) => {
		setPart((prev) => ({
			...prev,
			equipmentId: equipmentSheet.barcode,
		}));

		setShowModalEq(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let hasError = false;
		let newErrors = {};

		Object.keys(part).forEach((field) => {
			if (!part[field]) {
				newErrors[field] = "This field is required";
				hasError = true;
			}
		});

		setErrors(newErrors);
		if (hasError) return;

		setIsSubmitting(true);

		const dataToSubmit = {
			name: part.name,
			price: part.price,
			arriveTime: part.arriveTime,
			equipmentId: part.equipmentId,
		};

		try {
			if (partID) {
				await api.put(`/api/part/${partID}`, dataToSubmit);
			} else {
				await api.post("/api/part/", dataToSubmit);
			}
			handleRefresh();
			refreshTable();
			closeModal();
		} catch (error) {
			if (error.response && error.response.status === 400) {
				setErrors((prevErrors) => ({
					...prevErrors,
					exist: error.response.data.error,
				}));
			} else {
				console.error("API error:", error.message);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleRefresh = () => {
		setPart({
			name: "",
			price: "",
			arriveTime: "",
			equipmentId: "",
		});
		setErrors({});
	};

	return (
		<Modal show={showModal} onHide={() => { closeModal(); handleRefresh(); }}>
			<Modal.Header closeButton>
				<Modal.Title>{partID ? "Edit Part" : "Add New Part"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="mb-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter name"
						name="name"
						value={part.name}
						isInvalid={!!errors.name}
						onChange={handleChanges}
						className="rounded-pill"
						disabled={isSubmitting}
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
						value={part.price}
						isInvalid={!!errors.price}
						onChange={handleChanges}
						className="rounded-pill"
						onKeyDown={(evt) =>
							['e', 'E', '+', '-', ','].includes(evt.key) && evt.preventDefault()
						}
						disabled={isSubmitting}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.price}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Arrival Time (Days)</Form.Label>
					<Form.Control
						type="number"
						placeholder="Enter arrival time"
						name="arriveTime"
						value={part.arriveTime}
						isInvalid={!!errors.arriveTime}
						onChange={handleChanges}
						className="rounded-pill"
						onKeyDown={(evt) =>
							['e', 'E', '+', '-', ',', '.'].includes(evt.key) && evt.preventDefault()
						}
						disabled={isSubmitting}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.arriveTime}
					</Form.Control.Feedback>
				</Form.Group>

				<Row className="mb-3">
					<Col md={6}>
						<Form.Group controlId="formEquipmentId">
							<Form.Label>Equipment Sheet</Form.Label>
							<Form.Control
								type="number"
								name="equipmentId"
								value={part.equipmentId}
								onChange={handleChanges}
								placeholder="Enter equipment barcode"
								isInvalid={!!errors.equipmentId}
								disabled={isSubmitting}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.equipmentId}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col md={6} className="d-flex align-items-end">
						<Button
							onClick={() => setShowModalEq(true)}
							className="w-100 rounded-pill shadow-sm"
							variant="outline-secondary"
							disabled={isSubmitting}
						>
							Search Equipment Sheet
						</Button>
					</Col>
				</Row>

				<Form.Group className="mt-4">
					{errors.exist && (
						<div className="text-danger mb-3">{errors.exist}</div>
					)}
					<Button
						className="w-100 rounded-pill"
						style={{ backgroundColor: "var(--variant-one)", border: "none" }}
						onClick={handleSubmit}
						disabled={isSubmitting}
					>
						{isSubmitting ? (partID ? "Updating..." : "Creating...") : (partID ? "Update Part" : "Add Part")}
					</Button>
				</Form.Group>
			</Modal.Body>

			<EquipmentCatalogModal
				show={showModalEq}
				handleClose={() => setShowModalEq(false)}
				handleSelectEquipment={handleSelectEquipment}
				selectedEquipment={part.equipmentId}
			/>
		</Modal>
	);
}
