import React, { useState } from "react";
import { Button, Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import SalesDisplayTable from "../storeSales/SalesDisplayTable";
import NewSaleModal from "../storeSales/NewSaleModal";

export default function EmployeeStoreSales() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

  const refreshTable = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
          <Col className="text-end">
              <Button style={{ backgroundColor: "var(--variant-one)", border: "none" }} onClick={handleShow}>New Sale</Button>
          </Col>
      </Row>
      <Tabs
        id="sales-tabs"
        defaultActiveKey="all"
        className="custom-manage-tabs mb-3"
      >
        <Tab eventKey="all" title="All Sales">
          <SalesDisplayTable filterType="all" key={refreshKey} refreshAllTables={refreshTable} />
        </Tab>
        <Tab eventKey="byMe" title="My Sales">
          <SalesDisplayTable filterType="byMe" key={refreshKey + 1} refreshAllTables={refreshTable} />
        </Tab>
        <Tab eventKey="myStore" title="My Store Sales">
          <SalesDisplayTable filterType="myStore" key={refreshKey + 2} refreshAllTables={refreshTable} />
        </Tab>
        <Tab eventKey="pending" title="Sales Pending Approval">
          <SalesDisplayTable filterType="pending" key={refreshKey + 3} refreshAllTables={refreshTable} />
        </Tab>
      </Tabs>

      <NewSaleModal showModal={show} closeModal={handleClose} refreshTable={refreshTable}/>
    </Container>
  );
}
