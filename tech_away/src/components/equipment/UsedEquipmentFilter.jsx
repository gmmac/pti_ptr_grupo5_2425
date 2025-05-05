import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";

export default function UsedEquipmentFilter({ setFilters }) {
    const [localFilters, setLocalFilters] = useState({
        id: "",
        price: "",
        equipmentId: "",
        storeId: "",
        orderDirection: "ASC"
    });
    
    const [orderField, setOrderField] = useState("id");
    const [orderDirection, setOrderDirection] = useState("ASC");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...localFilters, // Atualiza os filtros
            orderBy: orderField,
            orderDirection: orderDirection,
        }));
    };
    

    const handleClear = () => {
        const clearedFilters = {
            id: "",
            price: "",
            equipmentId: "",
            storeId: "",
            orderDirection: "ASC"
        };

        setLocalFilters(clearedFilters);
        setFilters(clearedFilters);
        setOrderField("id");
        setOrderDirection("ASC");
    };

    return (
        <Container className="my-4">
            <Accordion className="shadow-sm">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Show Filters</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className="gy-3 d-block d-flex flex-md-row">

                                <Col xs={12} md={6}>
                                    <Form.Group controlId="filterName">
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control 
                                        type="number" 
                                        name="id" 
                                        value={localFilters.id} 
                                        placeholder="Insert ID"
                                        onChange={handleChange} 
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="filterName">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control 
                                        type="number" 
                                        name="price" 
                                        value={localFilters.price} 
                                        placeholder="Insert Price"
                                        onChange={handleChange} 
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="filterName">
                                        <Form.Label>Equipment ID</Form.Label>
                                        <Form.Control 
                                        type="number" 
                                        name="equipmentId" 
                                        value={localFilters.equipmentId} 
                                        placeholder="Insert Equipment ID"
                                        onChange={handleChange} 
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="filterName">
                                        <Form.Label>Store ID</Form.Label>
                                        <Form.Control 
                                        type="number" 
                                        name="storeId" 
                                        value={localFilters.storeId} 
                                        placeholder="Insert Store ID"
                                        onChange={handleChange} 
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='d-flex align-items-center justify-content-center'>
                                <Col xs={12} md={6} lg={4} className="mt-3 mt-md-4">
                                    <Button
                                        style={{
                                            backgroundColor:'#b5a8c9',
                                            color: 'white',
                                            border: 'none'
                                        }} 
                                        variant="primary" type="submit" className="w-100 rounded-pill">
                                        Apply Filters
                                    </Button>
                                </Col>
                                <Col xs={12} md={6} lg={4} className="mt-2 mt-md-4">
                                    <Button 
                                        style={{
                                            backgroundColor: '#708c7e',
                                            color: 'white',
                                            border: 'none'
                                        }} 
                                        variant="secondary" 
                                        className="w-100 rounded-pill" 
                                        onClick={handleClear}
                                    >
                                        Clear Filters
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}
