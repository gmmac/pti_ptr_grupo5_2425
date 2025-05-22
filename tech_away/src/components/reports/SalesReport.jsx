import React, { useEffect, useState } from "react";
import { Button, Spinner, Row, Col, Alert, Stack } from "react-bootstrap";
import api from "../../utils/axios";
import { exportReportToExcel } from "../../utils/excelExporter";
import { ArrowReturnLeft } from "react-bootstrap-icons";
import ReportSection from "./ReportSection";

export default function DefaultReport({ reportType = 'default', handleChangePage }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/api/report/sales")
      .then(({ data }) => setReport(data))
      .catch(err => {
        console.error(err);
        setError("Failed to load report. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const formatNIPC = (nipc, name) =>
    nipc === "000000000" && name === "Online" ? "---------" : nipc;

  const handleExport = () => {
    if (!report) return;
    const sheets = {};
    if (report.unsoldEquipments?.length) {
      sheets.UnsoldEquipments = report.unsoldEquipments.map(e => ({
        NIPC: formatNIPC(e.nipc, e.name),
        Store: e.name,
        "Unsold Count": e.unsoldCount,
      }));
    }

    if (report.salesByStore?.length) {
      sheets.SalesByStore = report.salesByStore.map(s => ({
        NIPC: formatNIPC(s.nipc, s.name),
        Store: s.name,
        "Total Sales": s.totalSales,
      }));
    }
    if (report.numSoldEquipmentsByStore?.length) {
      sheets.SoldEquipmentsByStore = report.numSoldEquipmentsByStore.map(s => ({
        NIPC: formatNIPC(s.nipc, s.name),
        Store: s.name,
        "Sold Equipments": s.equipmentsCount,
      }));
    }
    exportReportToExcel(sheets, reportType);
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-50">
      <Spinner animation="border" />
    </div>
  );

  if (error) return <Alert variant="danger" className="m-3">{error}</Alert>;

  return (
    <div className="px-3 px-md-5 py-4">
      <Stack direction="horizontal" className="fw-bold mb-4">
        <Row className="align-items-center mb-4 w-100">
          <Col>
            <Button
              className="me-4 text-light rounded-pill px-3"
              style={{ backgroundColor: "var(--variant-two)", border: "none" }}
              onClick={handleChangePage}
            >
              <ArrowReturnLeft style={{ fontSize: '1.5rem' }} />
            </Button>
          </Col>

          <Col>
            <h2>Sales Report</h2>
          </Col>

          <Col className="text-end">
            <Button onClick={handleExport} style={{ backgroundColor: "#708c7e", border: "0px" }}>
              Export to Excel
            </Button>
          </Col>
        </Row>
      </Stack>

      <ReportSection
        title="Unsold Equipments"
        data={report.unsoldEquipments?.map(e => ({
          nipc: formatNIPC(e.nipc, e.name),
          store: e.name,
          unsoldCount: e.unsoldCount,
        }))}
        columns={[
          { key: 'nipc', label: 'NIPC' },
          { key: 'store', label: 'Store' },
          { key: 'unsoldCount', label: 'Unsold Count' },
        ]}
      />

      <ReportSection
        title="Sales by Store"
        data={report.salesByStore?.map(s => ({
            nipc: formatNIPC(s.nipc, s.name),
            store: s.name,
            totalSales: `${s.totalSales} €`,
        }))}
        columns={[
            { key: 'nipc', label: 'NIPC' },
            { key: 'store', label: 'Store' },
            { key: 'totalSales', label: 'Total Sales' },
        ]}
      />

      <ReportSection
        title="Sold Equipments by Store"
        data={report.numSoldEquipmentsByStore?.map(s => ({
            nipc: formatNIPC(s.nipc, s.name),
            store: s.name,
            soldEquipments: s.equipmentsCount,
        }))}
        columns={[
            { key: 'nipc', label: 'NIPC' },
            { key: 'store', label: 'Store' },
            { key: 'soldEquipments', label: 'Sold Equipments' },
        ]}
      />
      
    </div>
  );
}
