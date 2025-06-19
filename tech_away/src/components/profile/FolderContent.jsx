import React, { useEffect, useState, useRef } from "react";
import { Stack, Row, Col } from "react-bootstrap";
import { useInterests } from "../../contexts/InterestsProvider";
import DetailsModal from "../interests/DetailsModal";
import DeleteInterestModal from "../interests/DeleteInterestModal";
import { Toast } from "primereact/toast";
import EditFolderNameModal from "./EditFolderNameModal";
import DeleteFolderModal from "./DeletFolderModal";
import ManageInterestsInFolder from "../interests/ManageInterestsInFolder";

export default function FolderContent() {
	const {
		folderToOpen,
		loadedInterests,
		fetchInterests,
		deleteInterest,
		editInterest,
		editFolderName,
		deleteInterestFolder,
	} = useInterests();
	const [selectedInterest, setSelectedInterest] = useState(null);
	const [showDetails, setShowDetails] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [showEditFolderName, setShowEditFolderName] = useState(false);
	const [showDeleteFolder, setShowDeleteFolder] = useState(false);
	const [showManageInterestsInFolder, setShowManageInterestsInFolder] =
		useState(false);

	const toastRef = useRef(null);

	useEffect(() => {
		fetchInterests();
	}, [folderToOpen]);

	const handleDelete = () => {
		deleteInterest(selectedInterest.id);
		setSelectedInterest(null); // limpa o interesse selecionado
		toastRef.current?.show({
			severity: "success",
			summary: "Interest Deleted",
			detail: "The selected interest was successfully deleted.",
			life: 3000,
		});
	};

	return (
		<>
			<Toast ref={toastRef} />
			<Stack direction="vertical" gap={4}>
				{folderToOpen != null && (
					<Stack
						direction="horizontal"
						className="justify-content-start align-items-start flex-wrap"
						gap={5}
					>
						<p
							className="m-0 d-flex gap-2 align-items-center"
							style={{ cursor: "pointer" }}
							onClick={() => setShowManageInterestsInFolder(true)}
						>
							<i className="pi pi-objects-column"></i>
							<span>Manage Interests in Folder</span>
						</p>
						<p
							className="m-0 d-flex gap-2 align-items-center"
							style={{ cursor: "pointer" }}
							onClick={() => {
								setShowEditFolderName(true);
							}}
						>
							<i className="pi pi-pencil"></i>
							<span>Edit Folder</span>
						</p>
						<p
							className="m-0 d-flex gap-2 align-items-center"
							style={{ cursor: "pointer" }}
							onClick={() => {
								setShowDeleteFolder(true);
							}}
						>
							<i className="pi pi-trash"></i>
							<span>Delete Folder</span>
						</p>
					</Stack>
				)}
				<Row className="g-4">
					{(Array.isArray(loadedInterests) ? loadedInterests : []).map(
						(interest, index) => (
							<Col key={index} xs={12} sm={6} md={4} lg={3}>
								<Stack
									gap={4}
									className="p-3 align-items-start h-100"
									style={{
										backgroundColor: "var(--variant-one-light)",
										borderRadius: "16px",
									}}
								>
									<Stack>
										<p className="m-0">
											Interest in{" "}
											{[
												interest?.model?.name,
												interest?.brand?.name,
												interest?.type?.name,
											]
												.filter(Boolean)
												.join(" · ")}
										</p>

										{interest?.preferredStores?.length > 0 && (
											<p className="m-0 text-muted">
												{interest.preferredStores.map((store, idx) => (
													<span key={idx}>
														{store.store?.name || store.storeId}
														{idx < interest.preferredStores.length - 1 && ", "}
													</span>
												))}
											</p>
										)}
										<p className="m-0 text-muted">
											Creation date:{" "}
											{new Date(interest.createdAt).toLocaleDateString("pt-PT")}
										</p>
									</Stack>
									<i
										className="pi pi-external-link mt-1 align-self-end"
										style={{ cursor: "pointer" }}
										onClick={() => {
											setSelectedInterest(interest);
											setShowDetails(true);
										}}
									/>
								</Stack>
							</Col>
						)
					)}
				</Row>
			</Stack>
			{/* Modal de detalhes */}
			<DetailsModal
				show={showDetails}
				setShow={setShowDetails}
				interest={selectedInterest}
				openDeleteModal={() => setShowDelete(true)}
				editInterest={editInterest}
			/>
			<DeleteInterestModal
				show={showDelete}
				setShow={setShowDelete}
				onConfirm={handleDelete}
				reopenDetails={() => setShowDetails(true)}
			/>

			<EditFolderNameModal
				showModal={showEditFolderName}
				setShowModal={setShowEditFolderName}
				currentName={folderToOpen?.name}
				onSave={editFolderName}
				folderToOpen={folderToOpen}
			/>

			<DeleteFolderModal
				showModal={showDeleteFolder}
				setShowModal={setShowDeleteFolder}
				folderToDelete={folderToOpen}
				onConfirm={deleteInterestFolder}
			/>

			<ManageInterestsInFolder
				show={showManageInterestsInFolder}
				setShow={setShowManageInterestsInFolder}
				folder={folderToOpen}
			/>
		</>
	);
}
