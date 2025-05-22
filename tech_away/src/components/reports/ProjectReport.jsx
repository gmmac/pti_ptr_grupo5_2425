// src/components/reports/ProjectReport.jsx
import React, { useEffect, useState } from "react";
import { Button, Spinner, Row, Col, Alert, Stack } from "react-bootstrap";
import api from "../../utils/axios";
import { exportReportToExcel } from "../../utils/excelExporter";
import { ArrowReturnLeft } from "react-bootstrap-icons";
import ReportSection from "./ReportSection";

export default function ProjectReport({ reportType = 'projects', handleChangePage }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/api/report/projects");
        setReport(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load project report. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const handleExport = () => {
    if (!report) return;
    const sheets = {};

    if (report.donationsByType?.length) {
      sheets['DonationsByType'] = report.donationsByType.map(d => ({
        TypeID: d.typeId,
        Type: d.typeName,
        Donations: d.donationCount
      }));
    }

    if (report.donationsByModel?.length) {
      sheets['DonationsByModel'] = report.donationsByModel.map(d => ({
        ModelID: d.modelId,
        Model: `${d.brandName} ${d.modelName}`,
        Donations: d.donationCount
      }));
    }

    if (report.donationsByStore?.length) {
      sheets['DonationsByStore'] = report.donationsByStore.map(d => ({
        NIPC: d.NIPC,
        Store: d.storeName,
        Donations: d.donationCount
      }));
    }

    if (report.projectsByStatus?.length) {
      sheets['ProjectsByStatus'] = report.projectsByStatus.map(p => ({
        Status: p.state,
        Count: p.projectCount
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

  // Preprocess model data to combine brand and model
  const modelData = report.donationsByModel?.map(d => ({
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
            <h2>Projects Report</h2>
          </Col>

          <Col className="text-end">
            <Button onClick={handleExport} style={{ backgroundColor: "#708c7e", border: "0px" }}>
              Export to Excel
            </Button>
          </Col>
        </Row>
      </Stack>

      <ReportSection
        title="Donations by Equipment Type"
        data={report.donationsByType}
        columns={[
          { key: 'typeId',    label: 'Type ID' },
          { key: 'typeName',  label: 'Type'    },
          { key: 'donationCount', label: 'Donations' }
        ]}
      />

      <ReportSection
        title="Donations by Equipment Model"
        data={modelData}
        columns={[
          { key: 'modelId',     label: 'Model ID' },
          { key: 'brandModel',  label: 'Model'    },
          { key: 'donationCount', label: 'Donations' }
        ]}
      />

      <ReportSection
        title="Donations by Store"
        data={report.donationsByStore}
        columns={[
          { key: 'NIPC',      label: 'NIPC'     },
          { key: 'storeName', label: 'Store'    },
          { key: 'donationCount', label: 'Donations' }
        ]}
      />

      <ReportSection
        title="Projects by Status"
        data={report.projectsByStatus}
        columns={[
          { key: 'state',        label: 'Status'  },
          { key: 'projectCount', label: 'Count'   }
        ]}
      />
    </div>
  );
}
