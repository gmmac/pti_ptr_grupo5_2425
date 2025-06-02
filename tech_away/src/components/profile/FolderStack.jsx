import React, { useEffect, useState } from "react";
import { Stack, Button, Modal, Form } from "react-bootstrap";
import { useInterests } from "../../contexts/InterestsProvider";

const FolderStack = () => {
	const {
		folders,
		fetchInterestFolders,
		userLoaded,
		createFolder,
		setFolderToOpen,
		folderToOpen,
	} = useInterests();
	const [showModal, setShowModal] = useState(false);
	const [folderName, setFolderName] = useState("");

	useEffect(() => {
		fetchInterestFolders();
	}, [userLoaded]);

	return (
		<>
			<Stack direction="horizontal" gap={2} className="flex-wrap">
				<Button
					className="rounded-pill py-2 px-4"
					style={{
						backgroundColor:
							folderToOpen == null
								? "var(--variant-one)"
								: "var(--variant-one-light)",
						border: "none",
						color: "var(--dark-grey)",
					}}
					onClick={() => setFolderToOpen(null)}
				>
					All
				</Button>
				{folders &&
					folders.map((folder) => (
						<Button
							key={folder.id}
							className="rounded-pill py-2 px-4"
							style={{
								backgroundColor:
									folderToOpen == folder.id
										? "var(--variant-one)"
										: "var(--variant-one-light)",
								border: "none",
								color: "var(--dark-grey)",
							}}
							onClick={() => setFolderToOpen(folder.id)}
						>
							{folder.name}
						</Button>
					))}

				{folders && folders.length < 6 && (
					<Button
						className="rounded-pill py-2 px-4"
						style={{
							backgroundColor: "var(--variant-one-light)",
							border: "none",
							color: "var(--dark-grey)",
						}}
						onClick={() => setShowModal(true)}
					>
						<i className="pi pi-plus" style={{ color: "var(--dark-grey)" }}></i>
					</Button>
				)}
			</Stack>
			<Modal show={showModal} centered>
				<Modal.Header>
					<Stack
						direction="horizontal"
						gap={2}
						className="justify-content-between align-items-center w-100"
					>
						<h5 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
							Create New Folder
						</h5>
						<Button variant="close" onClick={() => setShowModal(false)} />
					</Stack>
				</Modal.Header>
				<Modal.Body>
					<Stack gap={4}>
						<Form>
							<Form.Group controlId="folderName">
								<Form.Label>Folder Name</Form.Label>
								<Form.Control
									type="text"
									value={folderName}
									onChange={(e) => setFolderName(e.target.value)}
									className="rounded-pill"
									placeholder="Enter folder name"
									required
								/>
							</Form.Group>
						</Form>
						<Stack direction="horizontal" gap={3}>
							<Button
								variant="secondary"
								className="rounded-pill w-100"
								onClick={() => {
									setShowModal(false);
									setFolderName("");
								}}
							>
								Cancel
							</Button>
							<Button
								style={{
									backgroundColor: "var(--variant-one)",
									border: "none",
								}}
								className="rounded-pill w-100"
								onClick={() => {
									createFolder(folderName);
									setFolderName("");
									setShowModal(false);
								}}
							>
								Create
							</Button>
						</Stack>
					</Stack>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default FolderStack;
