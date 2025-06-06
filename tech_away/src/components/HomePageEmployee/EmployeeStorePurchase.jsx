import React, { useState } from 'react'
import { Button, Col, Container, Row, Form } from 'react-bootstrap'
import DisplayTablePurchases from '../storePurchase/DisplayTablePurchases'
import StorePurchaseForms from '../storePurchase/StorePurchaseForms'

export default function EmployeeStorePurchase() {
    const [show, setShow] = useState(false);
    const [refreshPurchases, setRefreshPurchases] = useState(false);
    const handleShow = () => setShow(true);
    const [onlyMyPurchases, setOnlyMyPurchases] = useState(false);
    const [storePurchasesOnly, setStorePurchasesOnly] = useState(false);

    const toggleOnlyMyPurchases = () => {
        setOnlyMyPurchases(prev => !prev);
        setRefreshTable(prev => !prev); // força reload da tabela
    };

    // Função para alternar o filtro "storePurchasesOnly"
    const toggleStorePurchasesOnly = () => {
        setStorePurchasesOnly(prev => !prev);
        setRefreshTable(prev => !prev); // força reload da tabela
    };

    
    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col className="text-end">
                    <Button style={{ backgroundColor: "var(--variant-one)", border: "none" }} onClick={handleShow}>New Purchase</Button>
                </Col>
            </Row>

             <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '600', color: '#333' }}>
                    <input
                    type="checkbox"
                    checked={onlyMyPurchases}
                    onChange={toggleOnlyMyPurchases}
                    style={{
                        marginRight: '8px',
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: '#b5a8c9', 
                    }}
                    />
                    Purchases by me
                </label>

                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '600', color: '#333' }}>
                    <input
                    type="checkbox"
                    checked={storePurchasesOnly}
                    onChange={toggleStorePurchasesOnly}
                    style={{
                        marginRight: '8px',
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: '#b5a8c9',
                    }}
                    />
                    Purchases by my store
                </label>
                </div>

        <DisplayTablePurchases
            refreshTable={refreshPurchases} 
            onlyMyPurchases={onlyMyPurchases} 
            storePurchasesOnly={storePurchasesOnly}
        />

        <StorePurchaseForms
            show={show}
            handleClose={() => setShow(false)}
            setRefreshPurchases={setRefreshPurchases}
        />
        </Container>
        
    )
}
