import React, { useState, useEffect } from "react";
import { Stack, Form, Row, Col, Card, Button } from "react-bootstrap";
import { PencilSquare, XCircleFill } from "react-bootstrap-icons";
import api from "../../utils/axios";

export default function ClientInfo({ userType = "client" }) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		birthDate: "",
		phone: "",
		email: "",
		nic: "",
		nif: "",
		address: "",
		gender: "",
	});

	const [errors, setErrors] = useState({
		nif: "",
		phone: "",
		birthDate: "",
		firstName: "",
		lastName: "",
	});

	const [originalData, setOriginalData] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const [changedFields, setChangedFields] = useState([]);

	useEffect(() => {
		fetchClientData();
	}, []);

	const fetchClientData = async () => {
		try {
			const res = await api.get("/api/auth/user-info", {
				params: {
					userType: userType,
				},
			});
			const userInfo = res.data.userInfo;
			setFormData(userInfo);
			setOriginalData(userInfo); // Armazena os dados originais
		} catch (error) {
			console.error("Erro ao buscar os dados do cliente:", error.message);
		}
	};

	const handleEditClick = () => {
		if (isEditing) {
			setFormData({ ...originalData }); // Volta a colocar os valores originais nos inputs
			setChangedFields([]); // Limpa a lista de campos alterados
			setErrors({}); // Remove os erros dos inputs
		}
		setIsEditing(!isEditing); // Alterna o estado de edição
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		// Verifica se o valor alterado é diferente do original
		if (value !== originalData[name]) {
			setChangedFields({ ...changedFields, [name]: value }); // Armazena campo e valor
		} else {
			// Remove o campo se voltar ao valor original
			const updatedFields = { ...changedFields };
			delete updatedFields[name];
			setChangedFields(updatedFields);
		}

		let newErrors = { ...errors };
		if (!value) {
			newErrors[name] = "Este campo é obrigatório";
		} else if (name === "birthDate") {
			const birthDate = new Date(value);
			const today = new Date();
			const age = today.getFullYear() - birthDate.getFullYear();
			const isBirthdayPassed =
				today.getMonth() > birthDate.getMonth() ||
				(today.getMonth() === birthDate.getMonth() &&
					today.getDate() >= birthDate.getDate());

			if (age < 16 || (age === 16 && !isBirthdayPassed)) {
				newErrors[name] = "Deves ter pelo menos 16 anos para criar uma conta.";
			} else {
				newErrors[name] = "";
			}
		} else {
			newErrors[name] = "";
		}

		if (name === "nif" || name === "phone") {
			if (value.length != 9) {
				newErrors[name] = "Este campo deve ter 9 dígitos!";
			}
		}

		setErrors(newErrors);
	};

	const handleSaveChanges = () => {
		api
			.put(`/api/client/${formData.nic}`, changedFields)
			.then((res) => {
				setOriginalData({ ...originalData, ...changedFields });
				setChangedFields([]);
				setIsEditing(false);
			})
			.catch((error) => {
				let newErrors = { ...errors };
				newErrors[error.response.data.errorTag] =
					"Já existe um utilizador com este " + error.response.data.errorTag;
				setErrors(newErrors);
				console.log("Erro ao atualizar os dados:", error.response.data);
			});
	};

	const refreshFormData = () => {
		fetchClientData();
	};

	return (
		<Stack
			style={{
				fontFamily: "var(--body-font)",
				backgroundColor: "var(--white)",
				borderRadius: "var(--rounded-sm)",
			}}
			className="p-4"
			gap={3}
		>
			<Stack direction="horizontal" className="justify-content-between">
				<h4 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
					Personal <br /> Information
				</h4>
				{isEditing ? (
					<Stack direction="horizontal" gap={2}>
						<Button
							onClick={handleSaveChanges}
							disabled={changedFields.length == 0}
							className="rounded-pill"
							style={{ backgroundColor: "var(--variant-one)", border: "none" }}
						>
							<Stack direction="horizontal" gap={2}>
								<i className="pi pi-bookmark"></i>
								<span>Save</span>
							</Stack>
						</Button>
						<Button
							onClick={() => {
								setIsEditing(false);
								refreshFormData();
							}}
							className="rounded-pill"
							variant="secondary"
						>
							<Stack direction="horizontal" gap={2}>
								<i className="pi pi-undo"></i>
								<span>Cancel</span>
							</Stack>
						</Button>
					</Stack>
				) : (
					<Button
						className="rounded-pill px-5"
						style={{
							color: "var(--white)",
							border: "none",
							backgroundColor: "var(--variant-two)",
						}}
						onClick={handleEditClick}
					>
						<Stack direction="horizontal" gap={2}>
							<i className="pi pi-pencil"></i>
							<span>Edit</span>
						</Stack>
					</Button>
				)}
			</Stack>

			<Form>
				{/* Personal Information Card */}

				<Row>
					<Col md={6}>
						<Form.Group className="mb-3">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								className="profile-input"
								type="text"
								name="firstName"
								value={formData.firstName || ""}
								disabled={!isEditing} // Controla se o campo é editável
								onChange={handleInputChange}
								isInvalid={!!errors.firstName}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.firstName}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group className="mb-3">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								className="profile-input"
								type="text"
								name="lastName"
								value={formData.lastName || ""}
								disabled={!isEditing}
								onChange={handleInputChange}
								isInvalid={!!errors.lastName}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.lastName}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group className="mb-3">
							<Form.Label>Birth Date</Form.Label>
							<Form.Control
								className="profile-input"
								type="date"
								name="birthDate"
								value={
									formData.birthDate ? formData.birthDate.split("T")[0] : ""
								}
								disabled={!isEditing}
								onChange={handleInputChange}
								isInvalid={!!errors.birthDate}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.birthDate}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Form.Group className="mb-3">
							<Form.Label>Phone</Form.Label>
							<Form.Control
								className="profile-input"
								type="tel"
								name="phone"
								value={formData.phone || ""}
								disabled={!isEditing}
								onChange={handleInputChange}
								isInvalid={!!errors.phone}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.phone}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								className="profile-input"
								type="email"
								name="email"
								value={formData.email || ""}
								disabled
								onChange={handleInputChange}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Form.Group className="mb-3">
							<Form.Label>NIC</Form.Label>
							<Form.Control
								className="profile-input"
								type="text"
								name="nic"
								value={formData.nic || ""}
								disabled
								onChange={handleInputChange}
							/>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group className="mb-3">
							<Form.Label>NIF</Form.Label>
							<Form.Control
								className="profile-input"
								type="text"
								name="nif"
								value={formData.nif || ""}
								disabled={!isEditing}
								onChange={handleInputChange}
								isInvalid={!!errors.nif}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.nif}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				{userType !== "organizer" && (
					<Row>
						<Col md={12}>
							<Form.Group className="mb-3">
								<Form.Label>Address</Form.Label>
								<Form.Control
									className="profile-input"
									type="text"
									name="address"
									value={formData.address || ""}
									disabled={!isEditing}
									onChange={handleInputChange}
								/>
							</Form.Group>
						</Col>
					</Row>
				)}
			</Form>
		</Stack>
	);
}
