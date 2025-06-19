import React from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";

export default function ManageInterestsInFolder({
	show,
	setShow,
	folder,
	interestsInFolder,
	interestsNotInFolder,
	addInterestToFolder,
	removeInterestFromFolder,
}) {
	const addAll = () => {
		interestsNotInFolder.forEach((interest) => {
			addInterestToFolder(folder.id, interest.id);
		});
	};

	const removeAll = () => {
		interestsInFolder.forEach((interest) => {
			removeInterestFromFolder(folder.id, interest.id);
		});
	};

	return (
		<Modal
			show={show}
			centered
			size="xl"
			onHide={() => setShow(false)}
			style={{ fontFamily: "var(--body-font)", color: "var(--dark-grey)" }}
		>
			<Modal.Header closeButton>
				<Modal.Title style={{ fontFamily: "var(--title-font)" }}>
					Manage Interests in {folder?.name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className="align-items-stretch">
					<Col xs={12} lg={6} className="d-flex flex-column ">
						<Stack
							direction="vertical"
							className="p-3 align-items-start h-100"
							style={{
								backgroundColor: "var(--variant-two-light)",
								borderRadius: "16px",
							}}
						>
							<h5
								style={{
									fontFamily: "var(--title-font)",
									color: "var(--variant-two-dark)",
								}}
							>
								Not in Folder
							</h5>
							<Stack
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									const interestId = e.dataTransfer.getData("interestId");
									removeInterestFromFolder(folder.id, parseInt(interestId));
								}}
								style={{ height: "450px", overflowY: "auto" }}
							>
								{interestsNotInFolder.map((interest, index) => (
									<Stack
										key={index}
										draggable
										onDragStart={(event) => {
											event.dataTransfer.setData("interestId", interest.id);
										}}
										className="p-2 mb-2"
										style={{
											backgroundColor: "var(--variant-two-light)",
											borderRadius: "8px",
											border: "2px dashed var(--variant-two)",
											cursor: "pointer",
											userSelect: "none",
											maxHeight: "140px",
										}}
									>
										<Stack
											direction="vertical"
											gap={1}
											style={{ overflowY: "auto" }}
										>
											<p
												className="m-0"
												style={{ color: "var(--variant-two-dark)" }}
											>
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
															{idx < interest.preferredStores.length - 1 &&
																", "}
														</span>
													))}
												</p>
											)}
											<p className="m-0 text-muted">
												Creation date:{" "}
												{new Date(interest.createdAt).toLocaleDateString(
													"pt-PT"
												)}
											</p>
										</Stack>
										<Stack
											direction="horizontal"
											className="justify-content-start"
										>
											<Stack
												direction="horizontal"
												gap={2}
												className=" py-1 px-2  "
												style={{
													color: "var(--variant-two-dark)",
													border: "2px solid var(--variant-two)",
													fontSize: "13px",
													borderRadius: "6px",
												}}
												onClick={() => {
													addInterestToFolder(folder.id, interest.id);
												}}
											>
												<i
													className="pi pi-plus"
													style={{ fontSize: "13px" }}
												></i>
												<p className="m-0">Add</p>
											</Stack>
										</Stack>
									</Stack>
								))}
							</Stack>
							<Stack
								direction="horizontal"
								gap={2}
								className="mt-3 justify-content-center align-items-center"
								style={{ cursor: "pointer", color: "var(--variant-two-dark)" }}
								onClick={() => addAll()}
							>
								<i className="pi pi-file-plus"></i>
								<p className="m-0">Add All</p>
							</Stack>
						</Stack>
					</Col>
					<Col xs={12} lg={6} className="d-flex flex-column">
						<Stack
							direction="vertical"
							className="p-3 align-items-between"
							style={{
								backgroundColor: "var(--variant-one-light)",
								borderRadius: "16px",
								height: "100%",
							}}
						>
							<h5
								style={{
									fontFamily: "var(--title-font)",
									color: "var(--variant-one-dark)",
								}}
							>
								In Folder
							</h5>
							<Stack
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									const interestId = e.dataTransfer.getData("interestId");
									addInterestToFolder(folder.id, parseInt(interestId));
								}}
								style={{ height: "450px", overflowY: "auto" }}
							>
								{interestsInFolder.map((interest, index) => (
									<Stack
										key={index}
										draggable
										onDragStart={(event) => {
											event.dataTransfer.setData("interestId", interest.id);
										}}
										className="p-2 mb-2"
										style={{
											backgroundColor: "var(--variant-one-light)",
											borderRadius: "8px",
											width: "100%",
											border: "2px solid var(--variant-one)",
											cursor: "pointer",
											userSelect: "none",

											maxHeight: "140px",
										}}
									>
										<Stack
											direction="vertical"
											gap={1}
											style={{ overflowY: "auto" }}
										>
											<p
												className="m-0"
												style={{ color: "var(--variant-one-dark)" }}
											>
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
															{idx < interest.preferredStores.length - 1 &&
																", "}
														</span>
													))}
												</p>
											)}
											<p className="m-0 text-muted">
												Creation date:{" "}
												{new Date(interest.createdAt).toLocaleDateString(
													"pt-PT"
												)}
											</p>
										</Stack>
										<Stack
											direction="horizontal"
											className="justify-content-start"
										>
											<Stack
												direction="horizontal"
												gap={2}
												className=" py-1 px-2 "
												style={{
													color: "var(--variant-one-dark)",
													border: "2px solid var(--variant-one)",
													fontSize: "13px",
													borderRadius: "6px",
												}}
												onClick={() => {
													removeInterestFromFolder(folder.id, interest.id);
												}}
											>
												<i
													className="pi pi-trash"
													style={{ fontSize: "13px" }}
												></i>
												<p className="m-0">Remove</p>
											</Stack>
										</Stack>
									</Stack>
								))}
							</Stack>
							<Stack
								direction="horizontal"
								gap={2}
								className="mt-3 justify-content-center align-items-center"
								style={{ cursor: "pointer", color: "var(--variant-one-dark)" }}
								onClick={() => removeAll()}
							>
								<i className="pi pi-trash"></i>
								<p className="m-0">Clear All</p>
							</Stack>
						</Stack>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
}
