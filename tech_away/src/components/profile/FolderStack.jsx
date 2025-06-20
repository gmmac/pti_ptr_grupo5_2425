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
									folderToOpen?.id == folder.id
										? "var(--variant-one)"
										: "var(--variant-one-light)",
								border: "none",
								color: "var(--dark-grey)",
							}}
							onClick={() => setFolderToOpen(folder)}
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
						<i
							className="pi pi-folder-plus"
							style={{ color: "var(--dark-grey)" }}
						></i>
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
						<Stack
							direction="horizontal"
							gap={2}
							className="justify-content-center  text-muted p-3  "
							style={{
								backgroundColor: "var(--variant-one-light)",
								borderRadius: "16px",
							}}
						>
							<i className="pi pi-lightbulb"></i>
							<p className="m-0">
								Folders help you organize your interests. You can create up to 6
								folders to categorize your interests effectively.
							</p>
						</Stack>

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
