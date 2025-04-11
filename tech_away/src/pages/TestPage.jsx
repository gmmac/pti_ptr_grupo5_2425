import React, { useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import DisplayTable from "../components/equipment/DisplayTable";
import FormsEquipmentSheet from "../components/equipment/FormsEquipmentSheet";
import FiltersBarEquipmentSheet from "../components/equipment/FiltersBarEquipmentSheet";

export default function TestPage() {
	const [show, setShow] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [paramsTofilter, setParamsTofilter] = useState({});

	const handleFilterSet = (params) => {
		setParamsTofilter(params);
	};
	return (
		<Container style={{ backgroundColor: "var(--light-grey)" }}>
			<Stack gap={3} className="justify-content-center align-items-center">
				<h2>Test Page</h2>

				<DisplayTable model="equipmentSheet" />
			</Stack>
		</Container>
	);
}
