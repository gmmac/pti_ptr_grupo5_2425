import React, { useState, useEffect } from "react";
import api from "../../utils/axios";
import { Modal, Button, Form, Stack } from "react-bootstrap";
import ModalToSelect from "./ModalToSelect"; // Componente para selecionar EquipmentModel e EquipmentType

export default function ModalEdit({
	show,
	handleClose,
	modelToEdit,
	attributesToEdit,
	onSave,
	objectToChange,
}) {
	const [formData, setFormData] = useState({});
	const [errors, setErrors] = useState({});
	const [modals, setModals] = useState({
		EquipmentModel: false,
		EquipmentType: false,
	});
	const id = Object.values(objectToChange)[0];

	useEffect(() => {
		if (objectToChange) {
			setFormData({
				...objectToChange,
				EquipmentModel: objectToChange.EquipmentModel?.id || null,
				EquipmentType: objectToChange.EquipmentType?.id || null,
			});
		}
	}, [objectToChange]);

	// Atualiza os valores do formulário
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		let newErrors = { ...errors };
		newErrors[name] = value ? "" : "This field is required";
		setErrors(newErrors);
	};

	// Função para selecionar valores nos modais
	const handleSelectValue = (attribute, selectedItem) => {
		setFormData((prev) => ({
			...prev,
			[attribute]: selectedItem.id, // Armazena o ID para envio ao servidor
			[`${attribute}Name`]: selectedItem.name, // Armazena o nome para exibição
		}));

		setModals((prev) => ({ ...prev, [attribute]: false })); // Fecha o modal
	};

	// Enviar os dados atualizados
	const handleSubmit = async () => {
		let hasError = false;
		let newErrors = {};

		const payload = {};

		attributesToEdit.forEach((attribute) => {
			if (!formData[attribute] && !formData[`${attribute}Name`]) {
				newErrors[attribute] = "This field is required";
				hasError = true;
			}
			payload[attribute] = formData[attribute] || null;
		});

		setErrors(newErrors);
		if (hasError) return;

		try {
			await api.put(`api/${modelToEdit}/${id}`, payload);
			onSave();
			handleClose();
		} catch (error) {
			if (error.response && error.response.status === 400) {
				setErrors((prevErrors) => ({
					...prevErrors,
					exist: error.response.data.error // Ver se o exist aqui não gera erro
				}));
			} 
			else{
				console.error("Erro ao atualizar:", error);
			}
		}
	};

	const capitalizeFirstLetter = (value) => {
        return String(value).charAt(0).toUpperCase() + String(value).slice(1);
    }

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					Edit {capitalizeFirstLetter(modelToEdit)}
					<br />
					ID: {id}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{attributesToEdit
					.filter(
						(attr) =>
							attr !== "id" && attr !== "createdAt" && attr !== "updatedAt"
					)
					.map((attribute, index) => (
						<Form.Group key={index} className="mb-3">
							<Form.Label>{capitalizeFirstLetter(attribute)}</Form.Label>
							{attribute === "barcode" ? (
								<Form.Control
									type="text"
									name={attribute}
									value={id || ""}
									disabled
									className="rounded-pill"
								/>
							) : ["EquipmentModel", "EquipmentType"].includes(attribute) ? (
								<div className="d-flex">
									<Form.Control
										type="text"
										name={attribute}
										value={
											formData[`${attribute}Name`] ||
											objectToChange?.[attribute]?.name ||
											""
										}
										readOnly
										className="rounded-pill me-2"
									/>
									<Button
										className="rounded-pill"
										style={{
											backgroundColor: "var(--variant-two)",
											border: "none",
										}}
										onClick={() =>
											setModals((prev) => ({ ...prev, [attribute]: true }))
										}
									>
										Select
									</Button>
								</div>
							) : (
								<Form.Control
									type="text"
									name={attribute}
									value={formData[attribute] || ""}
									isInvalid={!!errors[attribute]}
									onChange={handleChange}
									className="rounded-pill"
								/>
							)}
							<Form.Control.Feedback type="invalid">
								{errors[attribute]}
							</Form.Control.Feedback>
						</Form.Group>
					))}
					{errors.exist && (
                        <div className="text-danger mb-3">
                            {errors.exist}
                        </div>
                     )}
				<Stack gap={2} direction="horizontal" className="justify-content-end">
					<Button
						className="rounded-pill"
						variant="secondary"
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						className="rounded-pill"
						style={{ backgroundColor: "var(--variant-one)", border: "none" }}
						onClick={handleSubmit}
					>
						Save Changes
					</Button>
				</Stack>
			</Modal.Body>

			{/* Modais de seleção para EquipmentModel e EquipmentType */}
			<ModalToSelect
				showModal={modals.EquipmentModel}
				closeModal={() =>
					setModals((prev) => ({ ...prev, EquipmentModel: false }))
				}
				title="model"
				onSelect={(selected) => handleSelectValue("EquipmentModel", selected)}
			/>
			<ModalToSelect
				showModal={modals.EquipmentType}
				closeModal={() =>
					setModals((prev) => ({ ...prev, EquipmentType: false }))
				}
				title="type"
				onSelect={(selected) => handleSelectValue("EquipmentType", selected)}
			/>
		</Modal>
	);
}
