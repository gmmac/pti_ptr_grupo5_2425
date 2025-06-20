import React, { useState } from "react";
import { Button, Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import SalesDisplayTable from "../storeSales/SalesDisplayTable";

export default function EmployeeStoreSales() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTable = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <Container className="mt-4">
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
    </Container>
  );
}
