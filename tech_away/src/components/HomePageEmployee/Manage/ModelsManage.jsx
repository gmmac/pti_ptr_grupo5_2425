import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import DisplayTable from "../../equipment/DisplayTable";
import FormsNewBrand from "../../brands/FormsNewBrand";

export default function ModelsManage() {
	const [show, setShow] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const refreshTable = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

	return (
		<Container className="mt-4">
            <Row className="mb-3">
                <Col className="text-end">
                    <Button variant="success" onClick={handleShow}>Add Model</Button>
                </Col>
            </Row>

            <DisplayTable model="model" params="" key={refreshKey} />

			<FormsNewBrand showModal={show} closeModal={handleClose} refreshTable={refreshTable} />
		</Container>
	);
}
