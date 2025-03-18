import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function EmployeeHomeDashboard() {
    const navigate = useNavigate();

    return (
        <Row className="g-4 d-flex align-items-center justify-content-center">
            {/* Reports Generation Card */}
            <Col md={4}>
                <Card className="shadow-sm text-center">
                    <Card.Body>
                        <Card.Title>Generate Reports</Card.Title>
                        <Card.Text>
                            Create detailed reports of operations.
                        </Card.Text>
                        <Button variant="primary" onClick={() => navigate('/reports')}>
                            Access
                        </Button>
                    </Card.Body>
                </Card>
            </Col>

            {/* Sales Statistics Card */}
            <Col md={4}>
                <Card className="shadow-sm text-center">
                    <Card.Body>
                        <Card.Title>Sales Statistics</Card.Title>
                        <Card.Text>
                            View sales charts and trends.
                        </Card.Text>
                        <Button variant="success" onClick={() => navigate('/sales-statistics')}>
                            View Statistics
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
