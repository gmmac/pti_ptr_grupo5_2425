import React, { useState } from 'react'
import EmployeeRepairsCatalog from '../repair/EmployeeRepairsCatalog'
import { Button, Col, Container, Row } from 'react-bootstrap'
import NewRepairForms from '../repair/NewRepairForms';
import SelectClientModal from '../client/SelectClientModal';

export default function EmployeeRepairs() {
	const [show, setShow] = useState(false);
	const [showClientModal, setShowClientModal] = useState(false);

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const handleClientModal = ({ id, name }) => {
		setRepair((prev) => ({
		  ...prev,
		  clientId: id,
		  clientName: name
		}));
	};

	return (
		<Container className="mt-4">
			<Row className="mb-3">
				<Col className="text-end">
					<Button style={{ backgroundColor: "var(--variant-one)", border: "none" }} onClick={handleShow}>Create Repair</Button>
				</Col>
			</Row>

			<EmployeeRepairsCatalog />

			<NewRepairForms showModal={show} closeModal={handleClose} setShowClientModal={setShowClientModal}/>

			{/* Modal de seleção do cliente */}
			<SelectClientModal
				showModal={showClientModal}
				closeModal={() => setShowClientModal(false)}
				onSelect={handleClientModal}
			/>
		</Container>
	)
}
