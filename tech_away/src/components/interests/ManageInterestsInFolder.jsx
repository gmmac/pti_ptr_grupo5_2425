import React from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";

export default function ManageInterestsInFolder({
	show,
	setShow,
	folder,
	notInFolderInterests,
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
						</Stack>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
}
