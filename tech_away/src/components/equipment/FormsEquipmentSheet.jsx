import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import api from "../../utils/axios";
import ModalToSelect from "./ModalToSelect"; // Importa o modal

export default function FormsEquipmentSheet({ showModal, closeModal }) {
	const [showModelModal, setShowModelModal] = useState(false);
	const [showTypeModal, setShowTypeModal] = useState(false);

	const [equipmentSheet, setEquipmentSheet] = useState({
		barcode: "",
		model: "",
		type: "",
	});

	const [errors, setErrors] = useState({});

	const handleChanges = (e) => {
		const { name, value } = e.target;
		setEquipmentSheet((prev) => ({ ...prev, [name]: value }));

		let newErrors = { ...errors };

		if (!value) {
			newErrors[name] = "This field is required";
		} else {
			newErrors[name] = "";
		}

		// Validação de barcode
		if (name === "barcode" && value.length !== 20) {
			newErrors[name] = "Barcode needs to have 20 characters";
		}

		setErrors(newErrors);
	};

	// Função para atualizar os campos com os valores do modal
	const handleSelectModel = (selectedName) => {
		setEquipmentSheet((prev) => ({ ...prev, model: selectedName }));
	};

	const handleSelectType = (selectedName) => {
		setEquipmentSheet((prev) => ({ ...prev, type: selectedName }));
	};

	// Post de uma nova equipmentSheet
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validação antes do envio
		let hasError = false;
		let newErrors = {};

		Object.keys(equipmentSheet).forEach((field) => {
			if (!equipmentSheet[field]) {
				newErrors[field] = "This field is required";
				hasError = true;
			}
		});

		setErrors(newErrors);
		if (hasError) return;

		console.log(equipmentSheet);

		await api
			.post("api/equipmentSheet/", equipmentSheet)
			.then(() => {
				handleRefresh();
				closeModal();
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	};

	const handleRefresh = () => {
		setEquipmentSheet({
			barcode: "",
			model: "",
			type: "",
		});
		setErrors({});
	};

	return (
		<Modal show={showModal} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>Add New Equipment Sheet</Modal.Title>
			</Modal.Header>
			<Modal.Body>
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
					/>
					<Form.Control.Feedback type="invalid">
						{errors.barcode}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Model</Form.Label>
					<div className="d-flex">
						<Form.Control
							type="text"
							name="model"
							value={equipmentSheet.model}
							isInvalid={!!errors.model}
							readOnly
							className="rounded-pill me-2"
						/>
						<Button onClick={() => setShowModelModal(true)}>Select</Button>
					</div>
					<Form.Control.Feedback type="invalid">
						{errors.model}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Type</Form.Label>
					<div className="d-flex">
						<Form.Control
							type="text"
							name="type"
							value={equipmentSheet.type}
							isInvalid={!!errors.type}
							readOnly
							className="rounded-pill me-2"
						/>
						<Button onClick={() => setShowTypeModal(true)}>Select</Button>
					</div>
					<Form.Control.Feedback type="invalid">
						{errors.type}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mt-4">
					<Button className="w-100" onClick={handleSubmit}>
						Add Equipment Sheet
					</Button>
				</Form.Group>
			</Modal.Body>

			{/* Modal de seleção para Model */}
			<ModalToSelect
				showModal={showModelModal}
				closeModal={() => setShowModelModal(false)}
				title="model"
				onSelect={handleSelectModel}
			/>

			{/* Modal de seleção para Type */}
			<ModalToSelect
				showModal={showTypeModal}
				closeModal={() => setShowTypeModal(false)}
				title="type"
				onSelect={handleSelectType}
			/>
		</Modal>
	);
}
