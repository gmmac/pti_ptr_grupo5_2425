// src/components/SuccessModal.jsx
import { Modal, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SuccessModal({ show, onClose }) {
	const navigate = useNavigate();

	const handleGoHome = () => {
		onClose();
		navigate("/");
	};

	const handleGoProfile = () => {
		onClose();
		navigate("/profile");
	};

	return (
		<Modal
			show={show}
			onHide={onClose}
			centered
			size="md"
			style={{ fontFamily: "var(--body-font)", color: "var(--dark-grey)" }}
		>
			<Modal.Header closeButton>
				<Modal.Title style={{ fontFamily: "var(--title-font)" }}>
					Thanks for your order!
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p className="text-center">
					Your purchase was completed successfully. 🎉
				</p>
				<Stack
					direction="horizontal"
					gap={3}
					className="w-100 justify-content-center mt-3"
				>
					<Stack
						direction="horizontal"
						gap={2}
						style={{
							cursor: "pointer",
							border: "2px solid var(--variant-two)",
							backgroundColor: "var(--variant-two-light)",

							color: "var(--variant-two-dark)",
							borderRadius: "6px",
							padding: "6px 12px",
							fontSize: "14px",
						}}
						className="rounded-pill"
						onClick={handleGoHome}
					>
						<i className="pi pi-home" style={{ fontSize: "14px" }} />
						<p className="m-0">Go to Home</p>
					</Stack>

					<Stack
						direction="horizontal"
						gap={2}
						style={{
							cursor: "pointer",
							border: "2px solid var(--variant-one)",
							backgroundColor: "var(--variant-one-light)",
							color: "var(--variant-one-dark)",
							borderRadius: "6px",
							padding: "6px 12px",
							fontSize: "14px",
						}}
						className="rounded-pill "
						onClick={handleGoProfile}
					>
						<i className="pi pi-user" style={{ fontSize: "14px" }} />
						<p className="m-0">Go to Profile</p>
					</Stack>
				</Stack>
			</Modal.Body>
		</Modal>
	);
}
