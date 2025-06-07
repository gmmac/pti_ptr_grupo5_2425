import React, { useState, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";
import "../../styles/AuthPage.css";
import { IsMobileContext } from "../../contexts/IsMobileContext";

export default function RegisterForms({ userType = "client" }) {
	const isMobile = useContext(IsMobileContext);

	const [formData, setFormData] = useState({
		nic: "",
		nif: "",
		phone: "",
		birthDate: "",
		gender: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		nic: "",
		nif: "",
		phone: "",
		birthDate: "",
		gender: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const ChangeToLogin = () => {
		if (userType === "client") {
			navigate("/login");
		} else if (userType === "organizer") {
			navigate("/organizer/login");
		}
	};

	const validatePassword = (password) => {
		const errors = [];
		const minLength = 8;
		const specialChars = /[!@#$%^&*]/;
		const lowerCase = /[a-z]/;
		const upperCase = /[A-Z]/;
		const numbers = /[0-9]/;

		if (password.length < minLength) {
			errors.push("have at least 8 characters");
		}
		if (!specialChars.test(password)) {
			errors.push("contain at least one special character (@#$%^&*)");
		}
		if (!lowerCase.test(password)) {
			errors.push("contain at least one lowercase letter");
		}
		if (!upperCase.test(password)) {
			errors.push("contain at least one capital letter");
		}
		if (!numbers.test(password)) {
			errors.push("contain at least one number");
		}

		return errors.length > 0 ? `The password must ${errors.join(", ")}.` : "";
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Verificar campos vazios
		let newErrors = { ...errors };
		let hasError = false;

		Object.keys(formData).forEach((field) => {
			if (!formData[field]) {
				newErrors[field] = "This field is mandatory";
				hasError = true;
			} else {
				newErrors[field] = ""; // Limpa erro se o campo não estiver vazio
			}
		});

		setErrors(newErrors);

		if (hasError) {
			return; // Impede o envio do formulário se houver erros
		}

		verifyData();
	};

	const verifyData = async () => {
		const response = await api.put("/api/auth/generateAuthToken");

		await api
			.post(`/api/${userType}/`, {
				nic: formData.nic,
				nif: formData.nif,
				birthDate: formData.birthDate,
				gender: formData.gender,
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				phone: formData.phone,
				adress: null,
				latitude: null,
				longitude: null,
			})
			.then(async (response) => {
				if (response.data.errorTag) {
					let newErrors = { ...errors };
					newErrors[response.data.errorTag] =
						"There is already a user with this " + response.data.errorTag;
					setErrors(newErrors);
				} else {
					await api.post("/api/auth/register", {
						email: formData.email,
						password: formData.password,
					});
					if (userType !== "organizer") {
						await api.post("/api/actualCart", { clientNIC: formData.nic });
					}
					ChangeToLogin();
				}
			})
			.catch((error) => {});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		let newErrors = { ...errors };

		if (!value) {
			newErrors[name] = "This field is mandatory";
		} else if (name === "email") {
			const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			newErrors[name] = emailPattern.test(value)
				? ""
				: "Email must be valid";
		} else if (name === "password") {
			newErrors[name] = validatePassword(value);
		} else if (name === "birthDate") {
			const birthDate = new Date(value);
			const today = new Date();
			const age = today.getFullYear() - birthDate.getFullYear();
			const isBirthdayPassed =
				today.getMonth() > birthDate.getMonth() ||
				(today.getMonth() === birthDate.getMonth() &&
					today.getDate() >= birthDate.getDate());

			if (age < 16 || (age === 16 && !isBirthdayPassed)) {
				newErrors[name] = "You must be at least 16 years old to create an account.";
			} else {
				newErrors[name] = "";
			}
		} else {
			newErrors[name] = "";
		}

		setErrors(newErrors);
	};

	return (
		<div
			className=" w-100 p-md-5 p-4"
			style={{
				boxShadow: "var(--shadow-default)",
				fontFamily: "var(--body-font)",
				backgroundColor: "var(--white)",
				borderRadius: isMobile ? "var(--rounded-sm)" : "var(--rounded-lg)",
			}}
		>
			<h1 className="mb-2" style={{ fontFamily: "var(--title-font)" }}>
				Register
			</h1>
			<Form onSubmit={handleSubmit}>
				<Row>
					<Col lg={6} xs={12}>
						{/* Name */}
						<Form.Group className="mb-3" controlId="formBasicName">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								className="auth-input"
								type="text"
								placeholder="Enter your first name"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								isInvalid={!!errors.firstName}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.firstName}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col lg={6} xs={12}>
						<Form.Group className="mb-3" controlId="formBasicName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								className="auth-input"
								type="text"
								placeholder="Enter your last name"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								isInvalid={!!errors.lastName}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.lastName}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col lg={6} xs={12}>
						{/* Gender */}
						<Form.Group className="mb-3" controlId="formBasicGender">
							<Form.Label>Gender</Form.Label>
							<Form.Control
								className="auth-input"
								as="select"
								name="gender"
								value={formData.gender}
								onChange={handleChange}
								isInvalid={!!errors.gender}
							>
								<option value="">Choose your gender</option>
								<option value="M">Male</option>
								<option value="F">Female</option>
								<option value="O">Other</option>
							</Form.Control>
							<Form.Control.Feedback type="invalid">
								{errors.gender}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>

					<Col lg={6} xs={12}>
						{/* Date of Birth */}
						<Form.Group className="mb-3" controlId="formBasicbirthDate">
							<Form.Label>Date of Birth</Form.Label>
							<Form.Control
								className="auth-input"
								type="date"
								name="birthDate"
								value={formData.birthDate}
								onChange={handleChange}
								isInvalid={!!errors.birthDate}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.birthDate}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col md={6} xs={12}>
						{/* NIC (City Card Number) */}
						<Form.Group className="mb-3" controlId="formBasicNIC">
							<Form.Label>NIC (City Card Number)</Form.Label>
							<Form.Control
								className="auth-input"
								type="text"
								placeholder="Enter your NIC"
								name="nic"
								value={formData.nic}
								onChange={(e) => {
									const value = e.target.value.replace(/\D/g, "");
									setFormData({ ...formData, nic: value });
									if (value.length != 9) {
										errors[e.target.name] = "Este campo deve ter 9 dígitos!";
									} else {
										errors[e.target.name] = "";
									}
								}}
								isInvalid={!!errors.nic}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.nic}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>

					<Col md={6} xs={12}>
						{/* NIF */}
						<Form.Group className="mb-3" controlId="formBasicNIF">
							<Form.Label>NIF</Form.Label>
							<Form.Control
								className="auth-input"
								type="number"
								maxLength="9"
								placeholder="Enter your NIF"
								name="nif"
								value={formData.nif}
								onChange={(e) => {
									const value = e.target.value.replace(/\D/g, "");
									setFormData({ ...formData, nif: value });
									if (value.length != 9) {
										errors[e.target.name] = "Este campo deve ter 9 dígitos!";
									} else {
										errors[e.target.name] = "";
									}
								}}
								isInvalid={!!errors.nif}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.nif}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				{/* Phone Number */}
				<Form.Group className="mb-3" controlId="formBasicPhone">
					<Form.Label>Phone Number</Form.Label>
					<Form.Control
						className="auth-input"
						type="text"
						maxLength="9"
						placeholder="Enter your phone number"
						name="phone"
						value={formData.phone}
						onChange={(e) => {
							const value = e.target.value.replace(/\D/g, "");
							setFormData({ ...formData, phone: value });
							if (value.length < 9) {
								errors[e.target.name] = "Este campo deve ter 9 dígitos!";
							} else {
								errors[e.target.name] = "";
							}
						}}
						isInvalid={!!errors.phone}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.phone}
					</Form.Control.Feedback>
				</Form.Group>

				{/* Email */}
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						className="auth-input"
						type="email"
						placeholder="Enter your email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						isInvalid={!!errors.email}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.email}
					</Form.Control.Feedback>
				</Form.Group>

				{/* Password */}
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						className="auth-input"
						type="password"
						placeholder="Enter your password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						isInvalid={!!errors.password}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.password}
					</Form.Control.Feedback>
				</Form.Group>

				<Button
					type="submit"
					className="w-100 rounded-pill py-2 fs-5"
					style={{
						boxShadow: "var(--shadow-default)",
						color: "var(--dark-grey)",
						backgroundColor: "var(--variant-one)",
						border: "none",
						fontFamily: "var(--title-font)",
					}}
				>
					Register
				</Button>
			</Form>
			<div className="d-flex flex-align-items justify-content-end m-2">
				<p className="m-0">Already a member? </p>
				<p className="ms-2 mb-0 underText" onClick={ChangeToLogin}>
					Sign in
				</p>
			</div>
		</div>
	);
}
