import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import DisplayTable from "../../equipment/DisplayTable";
import FormsNewBrand from "../../brands/FormsNewBrand";

export default function BrandsManage() {
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
                    <Button style={{ backgroundColor: "var(--variant-one)", border: "none" }} onClick={handleShow}>Add Brand</Button>
                </Col>
            </Row>
			
			<Tabs
				id="types-tabs"
				defaultActiveKey="active"
				// activeKey={activeTab}
				// onSelect={handleTabChange}
				className="mb-3"
			>
				<Tab eventKey="active" title="Active Brands">
					<DisplayTable model="brand" params="" key={refreshKey} active="1" refreshAllTables={refreshTable}/>
				</Tab>
				<Tab eventKey="inactive" title="Deleted Brands">
					<DisplayTable model="brand" params="" key={refreshKey} active="0" refreshAllTables={refreshTable}/>
				</Tab>
			</Tabs>

			<FormsNewBrand showModal={show} closeModal={handleClose} refreshTable={refreshTable} />
		</Container>
	);
}
