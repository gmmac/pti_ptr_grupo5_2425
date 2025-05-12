import React, {  useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import api from "../../utils/axios";

export default function NewPartForms({ showModal, closeModal, refreshTable}) {

	const [part, setPart] = useState({
		name: "",
		price: "",
		arriveTime: "",
	});

	const [errors, setErrors] = useState({});

	const handleChanges = (e) => {
		const { name, value } = e.target;
		setPart((prev) => ({ ...prev, [name]: value }));

		let newErrors = {};

		if (!value) {
			newErrors[name] = "This field is required";
		} else {
			newErrors[name] = "";
		}

		setErrors(newErrors);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validação antes do envio
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

		const dataToSubmit = {
			name: part.name,
			price: part.price,
			arriveTime: part.arriveTime,
		};

		await api
			.post("api/part/", dataToSubmit)
			.then(() => {
				handleRefresh();
				refreshTable();
				closeModal();
			})
			.catch((error) => {
                if (error.response && error.response.status === 400) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        exist: error.response.data.error
                    }));
                    } else {
                        console.error("API error:", error.message);
                    }
				
			});
	};

	const handleRefresh = () => {
		setPart({
			name: "",
			price: "",
			arriveTime: "",
		});
		setErrors({});
	};

	return (
		<Modal show={showModal} onHide={() => { closeModal(); handleRefresh()}}>
			<Modal.Header closeButton>
				<Modal.Title>Add New Part</Modal.Title>
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
							['e', 'E', '+', '-', ',', '.'].includes(
								evt.key
							) && evt.preventDefault()
						}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.arriveTime}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mt-4 ">
                    {errors.exist && (
                        <div className="text-danger mb-3">
                            {errors.exist}
                        </div>
                     )}
					<Button
						className="w-100 rounded-pill"
						style={{ backgroundColor: "var(--variant-one", border: "none" }}
						onClick={handleSubmit}
					>
						Add Part
					</Button>
				</Form.Group>
			</Modal.Body>
		</Modal>
	);
}
