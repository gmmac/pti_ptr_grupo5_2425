import React, { useState } from 'react'
import EmployeeRepairsCatalog from '../repair/EmployeeRepairsCatalog'
import { Button, Col, Container, Row } from 'react-bootstrap'
import EditRepairForms from '../repair/EditRepairForms';

export default function EmployeeRepairs() {
	const [show, setShow] = useState(false);
	const [refreshRepairs, setRefreshRepairs] = useState(false)

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	return (
		<Container className="mt-4">
			<Row className="mb-3">
				<Col className="text-end">
					<Button style={{ backgroundColor: "var(--variant-one)", border: "none" }} onClick={handleShow}>Create Repair</Button>
				</Col>
			</Row>

			<EmployeeRepairsCatalog refreshRepairs={refreshRepairs}/>

			<EditRepairForms repairID={null} showModal={show} closeModal={handleClose} setRefreshRepairs={setRefreshRepairs}/>
		</Container>
	)
}
