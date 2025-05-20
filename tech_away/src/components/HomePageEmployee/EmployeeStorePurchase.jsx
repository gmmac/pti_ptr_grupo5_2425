import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import DisplayTablePurchases from '../storePurchase/DisplayTablePurchases'
import StorePurchaseForms from '../storePurchase/StorePurchaseForms'

export default function EmployeeStorePurchase() {
    const [show, setShow] = useState(false);
    const [refreshPurchases, setRefreshPurchases] = useState(false);
    const handleShow = () => setShow(true);
    
    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col className="text-end">
                    <Button style={{ backgroundColor: "var(--variant-one)", border: "none" }} onClick={handleShow}>New Purchase</Button>
                </Col>
            </Row>

        <DisplayTablePurchases refreshTable={refreshPurchases} />
        <StorePurchaseForms
            show={show}
            handleClose={() => setShow(false)}
            setRefreshPurchases={setRefreshPurchases}
        />
        </Container>
        
    )
}
