import React, { useState } from "react";
import { Button, Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import DisplayTable from "../../equipment/DisplayTable";
import NewPartForms from "../../repair/NewPartForms";
import PartsDisplayTable from "../../part/PartsDisplayTable";


export default function PartsManage() {
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
                    <Button style={{ backgroundColor: "var(--variant-one)", border: "none" }} onClick={handleShow}>Add Part</Button>
                </Col>
            </Row>

			<Tabs
				id="types-tabs"
				defaultActiveKey="active"
				className="custom-manage-tabs mb-3"
			>
				<Tab eventKey="active" title="Active Parts">
					<PartsDisplayTable activeParts="1" key={refreshKey} refreshAllTables={refreshTable}/>
				</Tab>
				<Tab eventKey="inactive" title="Deleted Parts">
					<PartsDisplayTable activeParts="0" key={refreshKey} refreshAllTables={refreshTable}/>
				</Tab>

			</Tabs>

			<NewPartForms partID={null} showModal={show} closeModal={handleClose} refreshTable={refreshTable}/>

		</Container>
	);
}