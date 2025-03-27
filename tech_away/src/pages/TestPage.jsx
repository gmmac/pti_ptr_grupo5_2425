import React, { useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import DisplayTable from "../components/equipment/DisplayTable";
import FormsNewBrand from "../components/brands/FormsNewBrand";

export default function TestPage() {
	const [show, setShow] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const refreshTable = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

	return (
		<Container>
			<Stack gap={3} className="justify-content-center align-items-center">
				<h2>Test Page</h2>
				<Button variant="primary" onClick={handleShow}>
					Criar Brand
				</Button>

				<DisplayTable model="brand" params="" key={refreshKey} />
			</Stack>

			<FormsNewBrand showModal={show} closeModal={handleClose} refreshTable={refreshTable} />
		</Container>
	);
}
