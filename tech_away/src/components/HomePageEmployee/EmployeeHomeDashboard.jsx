import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import DashboardTopCard from './Dashboard/DashboardTopCard';
import DashboardGrid from './Dashboard/DashboardGrid';
import DashboardVerticalSection from './Dashboard/DashboardVerticalSection';

export default function EmployeeHomeDashboard() {

    const sections = [
        { title: 'Models' },
        { title: 'Types' },
        { title: 'Types' },
        { title: '' },
        { title: '' },
        { title: '' },
        { title: '' },
        { title: '' },
        { title: '' },
        { title: '' },
        { title: '' },
        { title: '' }
      ];
      


    return (
        <Container fluid className="py-4">
            {/* Top Cards */}
                <DashboardTopCard />

            {/* Main Content */}
            <Row>
                {/* Manage Section */}
                <Col md={8} xs={12} >
                    <DashboardGrid sections={sections}/>
                </Col>

                {/* Analytics Section */}
                <Col md={4} xs={12} >
                    <DashboardVerticalSection />
                </Col>

            </Row>
        </Container>
    );
}
