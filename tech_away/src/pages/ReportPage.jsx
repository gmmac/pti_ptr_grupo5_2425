// src/pages/ReportPage.jsx
import React, { Suspense, lazy } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Alert, Spinner } from 'react-bootstrap';
import RepairsReport from '../components/reports/RepairsReport';
import SalesReport from '../components/reports/SalesReport';
import ProjectReport from '../components/reports/ProjectReport';
import InterestsReport from '../components/reports/InterestsReport';

export default function ReportPage() {
  const { type } = useParams();
  const navigate = useNavigate()

  const renderReport = () => {
    switch (type) {
      case 'sales':
        return <SalesReport reportType={type} handleChangePage={handleChangePage} />;
      case 'repairs':
        return <RepairsReport reportType={type} handleChangePage={handleChangePage} />;
      case 'charityProjects':
        return <ProjectReport reportType={type} handleChangePage={handleChangePage} />;
      case 'interests':
        return <InterestsReport reportType={type} handleChangePage={handleChangePage} />;
      default:
        return (
          <Alert variant="warning">
            Report type "{type}" not found.
          </Alert>
        );
    }
  };

    const handleChangePage = () => {
    navigate("/employee")
  }

  return (
    <Container className="my-4">
        <Suspense fallback={
            <div className="text-center my-5">
                <Spinner animation="border" />
                <p>Loading report…</p>
            </div>
        }>
        {renderReport()}
      </Suspense>
    </Container>
  );
}
