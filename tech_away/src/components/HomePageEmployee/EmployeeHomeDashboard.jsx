import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import DashboardTopCard from './Dashboard/DashboardTopGrid';
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
                <DashboardTopCard />

            <Row>
                <Col xl={8} lg={12} md={12} >
                    <DashboardGrid sections={sections}/>
                </Col>

                <Col xl={4} lg={12} md={12} className='pt-4 pt-xl-0 gx-xl-5' >
                    <DashboardVerticalSection />
                </Col>

            </Row>
        </Container>
    );
}
