import React, { useState, useEffect } from "react";
import api from "../../utils/axios";
import { Modal, Button, Form, Stack } from "react-bootstrap";

export default function ModalEdit({
	show,
	handleClose,
	modelToEdit,
	id,
	attributesToEdit,
	onSave,
}) {
	const [formData, setFormData] = useState({});
	const [errors, setErrors] = useState({});
	const [modals, setModals] = useState({}); // Gerencia quais modais de seleção estão abertos

	// Buscar os dados do item ao abrir o modal
	useEffect(() => {
		if (id && show) {
			api
				.get(`api/${modelToEdit}/${id}`)
				.then((res) => {
					setFormData(res.data);
				})
				.catch((error) => console.error("Erro ao buscar dados:", error));
		}
	}, [id, modelToEdit, show]);

	// Atualiza os valores do formulário
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Validação básica
		let newErrors = { ...errors };
		newErrors[name] = value ? "" : "Este campo é obrigatório";
		setErrors(newErrors);
	};

	const handleSelectValue = (attribute, { id, name }) => {
		setFormData((prev) => ({
			...prev,
			[attribute]: name,
			[`${attribute}Id`]: id,
		}));
		setModals((prev) => ({ ...prev, [attribute]: false }));
	};

	// Enviar os dados atualizados
	const handleSubmit = async () => {
		// Validação antes do envio
		let hasError = false;
		let newErrors = {};

		attributesToEdit.forEach((attribute) => {
			if (!formData[attribute]) {
				newErrors[attribute] = "Este campo é obrigatório";
				hasError = true;
			}
		});

		setErrors(newErrors);
		if (hasError) return;

		const dataToSubmit = { ...formData };
		delete dataToSubmit.createdAt;
		delete dataToSubmit.updatedAt;

		try {
			await api.put(`api/${modelToEdit}/${id}`, dataToSubmit);
			onSave(); // Atualiza a lista na tabela
			handleClose(); // Fecha o modal
		} catch (error) {
			console.error("Erro ao atualizar:", error);
		}
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Editar {modelToEdit}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{attributesToEdit
					.filter(
						(attr) =>
							attr !== "id" && attr !== "createdAt" && attr !== "updatedAt"
					) // Remove campos desnecessários
					.map((attribute, index) => (
						<Form.Group key={index} className="mb-3">
							<Form.Label>{attribute}</Form.Label>
							{attribute.toLowerCase().includes("id") ? (
								// Se for um campo de ID, exibe um botão de seleção
								<div className="d-flex">
									<Form.Control
										type="text"
										name={attribute}
										value={formData[attribute] || ""}
										isInvalid={!!errors[attribute]}
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
										Selecionar
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
				<Stack gap={2} direction="horizontal" className="justify-content-end">
					<Button
						className=" rounded-pill"
						variant="secondary"
						onClick={handleClose}
					>
						Cancelar
					</Button>
					<Button
						className="rounded-pill"
						style={{ backgroundColor: "var(--variant-one)", border: "none" }}
						onClick={handleSubmit}
					>
						Salvar Alterações
					</Button>
				</Stack>
			</Modal.Body>

			{/* Modais de seleção para atributos do tipo ID */}
			{attributesToEdit
				.filter((attr) => attr.toLowerCase().includes("id"))
				.map((attr, index) => (
					<ModalToSelect
						key={index}
						show={modals[attr]}
						closeModal={() => setModals((prev) => ({ ...prev, [attr]: false }))}
						title={attr}
						onSelect={(selected) => handleSelectValue(attr, selected)}
					/>
				))}
		</Modal>
	);
}
