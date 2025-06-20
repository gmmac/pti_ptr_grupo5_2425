import React, { useState, useEffect } from "react";
import { Modal, Button, Stack, Form } from "react-bootstrap";

export default function EditFolderNameModal({
	showModal,
	setShowModal,
	currentName,
	onSave,
	folderToOpen,
}) {
	const [newFolderName, setNewFolderName] = useState("");

	useEffect(() => {
		setNewFolderName(currentName || "");
	}, [currentName, showModal]);

	const handleSave = () => {
		const trimmedName = trimInput(newFolderName);
		if (trimmedName === "" || !folderToOpen?.id) return;
		onSave(folderToOpen.id, trimmedName);
		setShowModal(false);
	};

	const handleCancel = () => {
		setShowModal(false);
		setNewFolderName(currentName || "");
	};

	const trimInput = (input) => {
		return input
			.trim()
			.replace(/['";]/g, "") // remove ', ", ;
			.replace(/--/g, "") // remove comentários tipo --
			.replace(/\/\*.*?\*\//g, "") // remove comentários tipo /* */
			.replace(/\s{2,}/g, " "); // normaliza espaços
	};

	return (
		<Modal show={showModal} centered>
			<Modal.Header>
				<Stack
					direction="horizontal"
					gap={2}
					className="justify-content-between align-items-center w-100"
				>
					<h5 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
						Edit Folder Name
					</h5>
					<Button variant="close" onClick={handleCancel} />
				</Stack>
			</Modal.Header>

			<Modal.Body>
				<Stack gap={4}>
					<Form>
						<Form.Group controlId="editFolderName">
							<Form.Control
								type="text"
								value={newFolderName}
								onChange={(e) => setNewFolderName(e.target.value)}
								className="rounded-pill"
								placeholder="Enter new folder name"
								required
							/>
						</Form.Group>
					</Form>

					<Stack direction="horizontal" gap={3}>
						<Button
							variant="secondary"
							className="rounded-pill w-100"
							onClick={handleCancel}
						>
							Cancel
						</Button>
						<Button
							style={{
								backgroundColor: "var(--variant-one)",
								border: "none",
							}}
							className="rounded-pill w-100"
							onClick={handleSave}
							disabled={
								!newFolderName.trim() ||
								newFolderName.trim() === currentName?.trim()
							}
						>
							Save
						</Button>
					</Stack>
				</Stack>
			</Modal.Body>
		</Modal>
	);
}
