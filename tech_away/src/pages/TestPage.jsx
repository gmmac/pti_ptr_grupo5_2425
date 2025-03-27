import React, { useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import DisplayTable from "../components/equipment/DisplayTable";
import FormsNewBrand from "../components/brands/FormsNewBrand";

export default function TestPage() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Container>
			<Stack gap={3} className="justify-content-center align-items-center">
				<h2>Test Page</h2>

				<Button variant="primary" onClick={handleShow}>
					Criar Brand
				</Button>

				<DisplayTable model="brand" params="" />
			</Stack>

			<FormsNewBrand showModal={show} closeModal={handleClose} />
		</Container>
	);
}
