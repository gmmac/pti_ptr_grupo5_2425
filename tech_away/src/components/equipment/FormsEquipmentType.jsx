import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import api from "../../utils/axios";

export default function FormsEquipmentType({ showModal, closeModal, refreshTable}) {

	const [equipmentType, setEquipmentType] = useState({
		name: "",
	});

	const [errors, setErrors] = useState({});

	const handleChanges = (e) => {
		const { name, value } = e.target;
		setEquipmentType((prev) => ({ ...prev, [name]: value }));

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

		Object.keys(equipmentType).forEach((field) => {
			if (!equipmentType[field]) {
				newErrors[field] = "This field is required";
				hasError = true;
			}
		});

		setErrors(newErrors);
		if (hasError) return;

		const dataToSubmit = {
			name: equipmentType.name,
		};

		await api
			.post("api/type/", dataToSubmit)
			.then(() => {
				handleRefresh();
				refreshTable();
				closeModal();
			})
			.catch((error) => {
                if (error.response && error.response.status === 400) {
                    // Se for erro 400, mostra a mensagem vinda do backend
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
		setEquipmentType({
			name: "",
		});
		setErrors({});
	};

	return (
		<Modal show={showModal} onHide={() => { closeModal(); handleRefresh()}}>
			<Modal.Header closeButton>
				<Modal.Title>Add New Equipment Type</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="mb-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter name"
						name="name"
						value={equipmentType.name}
						isInvalid={!!errors.name}
						onChange={handleChanges}
						className="rounded-pill"
					/>
					<Form.Control.Feedback type="invalid">
						{errors.name}
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
						Add equipment type
					</Button>
				</Form.Group>
			</Modal.Body>
		</Modal>
	);
}
