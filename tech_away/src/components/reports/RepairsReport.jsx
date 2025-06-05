// src/components/reports/RepairsReport.jsx
import React, { useEffect, useState } from "react";
import { Button, Spinner, Row, Col, Alert, Stack } from "react-bootstrap";
import api from "../../utils/axios";
import { exportReportToExcel } from "../../utils/excelExporter";
import { ArrowReturnLeft } from "react-bootstrap-icons";
import ReportSection from "./ReportSection";

export default function RepairsReport({ reportType = 'repairs', handleChangePage }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/api/report/repairs");
        setReport(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load repairs report. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const handleExport = () => {
    if (!report) return;
    const sheets = {};
    if (report.repairsByStore?.length) {
      sheets['RepairsByStore'] = report.repairsByStore.map(r => ({
        NIPC: r.NIPC,
        Store: r.storeName,
        Repairs: r.repairCount
      }));
    }
    if (report.repairsByEquipmentSheet?.length) {
      sheets['RepairsByEquipmentSheet'] = report.repairsByEquipmentSheet.map(r => ({
        Barcode: r.barcode,
        Model: r.modelName,
        Brand: r.brandName,
        Repairs: r.repairCount
      }));
    }
    if (report.repairsByStatus?.length) {
      sheets['RepairsByStatus'] = report.repairsByStatus.map(s => ({
        Status: s.state,
        Count: s.repairCount
      }));
    }
    if (report.avgEstimateDeliveryTime) {
      sheets['AverageTimeStatus1to6'] = [report.avgEstimateDeliveryTime];
    }
    exportReportToExcel(sheets, reportType);
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-50">
      <Spinner animation="border" />
    </div>
  );

  if (error) return <Alert variant="danger" className="m-3">{error}</Alert>;


    const modelData = report.repairsByEquipmentSheet?.map(d => ({
    ...d,
    brandModel: `${d.brandName} ${d.modelName}`
  })) || [];

  return (
    <div className="px-3 px-md-5 py-4">
      <Stack direction="horizontal" className="fw-bold mb-4 w-100">
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
            <h2>Repairs Report</h2>
          </Col>

          <Col className="text-end">
            <Button onClick={handleExport} style={{ backgroundColor: "#708c7e", border: "0px" }}>
              Export to Excel
            </Button>
          </Col>
        </Row>
      </Stack>

      <ReportSection
        title="Repairs by Store"
        data={report.repairsByStore}
        columns={[
          { key: 'NIPC',    label: 'NIPC' },
          { key: 'storeName',  label: 'Store'    },
          { key: 'repairCount',label: 'Repairs'  }
        ]}
      />

      <ReportSection
        title="Repairs by Equipment Sheet"
        data={modelData}
        columns={[
          { key: 'barcode',    label: 'Barcode'  },
          { key: 'brandModel',  label: 'Model'    },
          { key: 'repairCount',label: 'Repairs'  }
        ]}
      />

      <ReportSection
        title="Repairs by Status"
        data={report.repairsByStatus}
        columns={[
          { key: 'state',      label: 'Status'   },
          { key: 'repairCount',label: 'Count'    }
        ]}
      />

      <ReportSection
        title="Average Time to finish a repair"
        data={report.avgEstimateDelivaryDate}
        columns={[
          { key: 'seconds', label: 'Seconds' },
          { key: 'hours',   label: 'Hours'   },
          { key: 'days',    label: 'Days'    }
        ]}
      />
    </div>
  );
}