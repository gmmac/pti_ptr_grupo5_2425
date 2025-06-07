import React, { useEffect, useState } from "react";
import { Button, Spinner, Row, Col, Alert, Stack } from "react-bootstrap";
import api from "../../utils/axios";
import { exportReportToExcel } from "../../utils/excelExporter";
import { ArrowReturnLeft } from "react-bootstrap-icons";
import ReportSection from "./ReportSection";
import DashboardStatCard from "../HomePageEmployee/Dashboard/DashboardStatCard";

export default function InterestsReport({ reportType = 'projects', handleChangePage }) {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReport = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/api/report/interests");
            setReport(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load interests report. Please try again later.");
        } finally {
            setLoading(false);
        }
        };

        fetchReport();
    }, []);

    const handleExport = () => {
        if (!report) return;
        const sheets = {};
    
        if (report.interestsByType?.length) {
          sheets['InterestsByEquipmentType'] = report.interestsByType.map(d => ({
            Type: d.typeName,
            TotalInterests: d.interestCount
          }));
        }
    
        if (report.interestsByModel?.length) {
          sheets['InterestsByEquipmentModel'] = report.interestsByModel.map(d => ({
            Model: d.modelName,
            TotalInterests: d.interestCount
          }));
        }
    
        if (report.interestsByEquipment?.length) {
          sheets['InterestsByEquipmentSheet'] = report.interestsByEquipment.map(d => ({
            EquipmentBarcode: d.equipmentBarcode,
            TotalInterests: d.interestCount
          }));
        }

        sheets['SimpleStatistics'] = [{
            TotalInterests: report.totalInterests,
            TotalFolderInterests: report.totalFolderInterests,
            NewInterestsToday: report.interestsToday
        }];
    
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
                <h2>Interests Report</h2>
                </Col>

                <Col className="text-end">
                <Button onClick={handleExport} style={{ backgroundColor: "#708c7e", border: "0px" }}>
                    Export to Excel
                </Button>
                </Col>
            </Row>
            </Stack>

            <Row className="mb-4 justify-content-center g-4">
                <Col xs={12} sm={10} md={6} lg={4} className="mb-3">
                    <DashboardStatCard
                        value={report.totalInterests !== null ? report.totalInterests : "Loading..."}
                        label="Total Interests"
                    />
                </Col>
                <Col xs={12} sm={10} md={6} lg={4} className="mb-3">
                    <DashboardStatCard
                        value={report.totalFolderInterests !== null ? report.totalFolderInterests : "Loading..."}
                        label="Total Interests Folders"
                    />
                </Col>
                <Col xs={12} sm={10} md={6} lg={4} className="mb-3">
                    <DashboardStatCard
                        value={report.interestsToday !== null ? report.interestsToday : "Loading..."}
                        label="New Interests Today"
                    />
                </Col>
            </Row>

            <ReportSection
                title="Interests by Equipment Type"
                data={report.interestsByType}
                columns={[
                    { key: 'typeName',  label: 'Type'    },
                    { key: 'interestCount', label: 'Total Interests' }
                ]}
            />

            <ReportSection
                title="Interests by Equipment Model"
                data={report.interestsByModel}
                columns={[
                    { key: 'modelName', label: 'Store'    },
                    { key: 'interestCount', label: 'Total Interests' }
                ]}
            />

            <ReportSection
                title="Interests by Equipment Sheet"
                data={report.interestsByEquipment}
                columns={[
                    { key: 'equipmentBarcode',        label: 'equipmentBarcode'  },
                    { key: 'interestCount', label: 'Total Interests'   }
                ]}
            />
        </div>
    )
}
