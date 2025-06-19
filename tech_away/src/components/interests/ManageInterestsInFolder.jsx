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
	return (
		<Modal
			show={show}
			centered
			size="lg"
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
					<Col xs={12} lg={6} className="d-flex flex-column">
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
											maxHeight: "120px",
											overflowY: "auto",
										}}
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
								))}
							</Stack>
						</Stack>
					</Col>
					<Col xs={12} lg={6} className="d-flex flex-column">
						<Stack
							direction="vertical"
							className="p-3 align-items-start h-100"
							style={{
								backgroundColor: "var(--variant-one-light)",
								borderRadius: "16px",
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
											maxHeight: "120px",
											overflowY: "auto",
										}}
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
								))}
							</Stack>
						</Stack>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
}
