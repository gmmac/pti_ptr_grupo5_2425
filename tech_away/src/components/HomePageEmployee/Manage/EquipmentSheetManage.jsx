import React, { useState } from "react";
import { Button, Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import DisplayTable from "../../equipment/DisplayTable";
import FormsEquipmentSheet from "../../equipment/FormsEquipmentSheet";

export default function EquipmentSheetManage() {
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
                    <Button style={{ backgroundColor: "var(--variant-one)", border: "none" }} onClick={handleShow}>Add Equipment Sheet</Button>
                </Col>
            </Row>

			<Tabs
				id="types-tabs"
				defaultActiveKey="active"
				// activeKey={activeTab}
				// onSelect={handleTabChange}
				className="custom-manage-tabs mb-3"
			>
				<Tab eventKey="active" title="Active Equipment Types">
					<DisplayTable model="equipmentSheet" params="" key={refreshKey} active="1" refreshAllTables={refreshTable}/>
				</Tab>
				<Tab eventKey="inactive" title="Deleted Equipment Types">
					<DisplayTable model="equipmentSheet" params="" key={refreshKey} active="0" refreshAllTables={refreshTable}/>
				</Tab>
			</Tabs>

			<FormsEquipmentSheet showModal={show} closeModal={handleClose} refreshTable={refreshTable} />
		</Container>
	);
}
