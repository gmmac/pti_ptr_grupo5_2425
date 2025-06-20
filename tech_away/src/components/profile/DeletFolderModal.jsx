import React from "react";
import { Modal, Button, Stack } from "react-bootstrap";

export default function DeleteFolderModal({
	showModal,
	setShowModal,
	folderToDelete,
	onConfirm,
}) {
	const handleCancel = () => {
		setShowModal(false);
	};

	const handleDelete = () => {
		if (folderToDelete?.id) {
			onConfirm(folderToDelete.id);
			setShowModal(false);
		}
	};

	return (
		<Modal show={showModal} centered>
			<Modal.Header>
				<h5 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
					Delete Folder
				</h5>
			</Modal.Header>

			<Modal.Body>
				<p className="mb-4">
					Are you sure you want to delete the folder{" "}
					<strong>{folderToDelete?.name}</strong>? This action cannot be undone.
				</p>

				<Stack direction="horizontal" gap={3}>
					<Button
						variant="secondary"
						className="rounded-pill w-100"
						onClick={handleCancel}
					>
						Cancel
					</Button>
					<Button
						variant="danger"
						className="rounded-pill w-100"
						onClick={handleDelete}
					>
						Delete
					</Button>
				</Stack>
			</Modal.Body>
		</Modal>
	);
}
