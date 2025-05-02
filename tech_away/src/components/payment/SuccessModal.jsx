// src/components/SuccessModal.jsx
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SuccessModal({ show, onClose }) {
	const navigate = useNavigate();

	const handleGoHome = () => {
		onClose(); // fecha o modal antes
		navigate("/"); // redireciona pra home
	};

	return (
		<Modal show={show} onHide={onClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Thanks for your order!</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Your purchase was completed successfully. 🎉</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={handleGoHome}>
					Go to Home
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
