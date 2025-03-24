import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import api from "../../utils/axios";

export default function FormsEquipmentSheet({ showModal, closeModal }) {
	const [models, setModels] = useState([]);
	const [types, setTypes] = useState([]);

	const [equipmentSheet, setEquipmentSheet] = useState({
		barcode: "",
		model: "",
		type: "",
	});

	const [errors, setErrors] = useState({});

	const handleChanges = (e) => {
		const { name, value } = e.target;
		console.log(name, value);

		// Atualiza o estado do equipmentSheet corretamente
		setEquipmentSheet((prev) => ({ ...prev, [name]: value }));

		let newErrors = { ...errors };

		// Validação de campos obrigatórios
		if (!value) {
			newErrors[name] = "This field is required";
		} else {
			newErrors[name] = "";
		}

		// Validação de barcode
		if (name === "barcode" && value.length !== 20) {
			newErrors[name] = "Barcode needs to have 20 characters";
		}

		// Validação de model
		if (name === "model" && value === "") {
			newErrors[name] = "Please select a model";
		}

		// Validação de type
		if (name === "type" && value === "") {
			newErrors[name] = "Please select a type";
		}

		setErrors(newErrors);
	};

	// get de todos os models para o select
	useEffect(() => {
		api
			.get("api/model")
			.then((res) => {
				setModels(res.data);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, []);

	// get de todos os types para o select
	useEffect(() => {
		api
			.get("api/type")
			.then((res) => {
				setTypes(res.data);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, []);

	// post de uma nova equipmentSheet
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Verificar campos vazios
		let newErrors = { ...errors };
		let hasError = false;

		Object.keys(equipmentSheet).forEach((field) => {
			if (!equipmentSheet[field]) {
				newErrors[field] = "Este campo é obrigatório";
				hasError = true;
			} else {
				newErrors[field] = ""; // Limpa erro se o campo não estiver vazio
			}
		});

		setErrors(newErrors);

		if (hasError) {
			return; // Impede o envio do formulário se houver erros
		}

		console.log(equipmentSheet);

		await api
			.post("api/equipmentSheet/", {
				barcode: equipmentSheet.barcode,
				model: equipmentSheet.model,
				type: equipmentSheet.type,
			})
			.then((res) => {
				console.log(res.data);
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
				<Modal.Title
					style={{
						color: "var(--variant-one)",
						fontFamily: "var(--title-font)",
					}}
				>
					Add New Equipment Sheet
				</Modal.Title>
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
					<Form.Select
						name="model"
						value={equipmentSheet.model}
						onChange={handleChanges}
						className="rounded-pill"
					>
						<option value="">Select a model</option>
						{models.map((model) => (
							<option key={model.id} value={model.id}>
								{model.name}
							</option>
						))}
					</Form.Select>
					<Form.Control.Feedback type="invalid">
						{errors.model}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Type</Form.Label>
					<Form.Select
						name="type"
						value={equipmentSheet.type}
						onChange={handleChanges}
						className="rounded-pill"
					>
						<option value="">Select a type</option>
						{types.map((type) => (
							<option key={type.id} value={type.id}>
								{type.name}
							</option>
						))}
					</Form.Select>
					<Form.Control.Feedback type="invalid">
						{errors.type}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mt-4 btn-variant-two rounded-pill">
					<Button variant=" w-100 " onClick={handleSubmit}>
						Add Equipment Sheet
					</Button>
				</Form.Group>
			</Modal.Body>
		</Modal>
	);
}
