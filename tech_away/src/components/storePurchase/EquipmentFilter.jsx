import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";
import SearchBar from "../searchBar/SearchBar";

export default function EquipmentFilter({ setFilters }) {
    const [localFilters, setLocalFilters] = useState({
        barcode: "",
        model: "",
        releaseYear: "",
        type: "",
        orderDirection: "ASC"
    });
    
    const [orderField, setOrderField] = useState("barcode");
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
            barcode: "",
            model: "",
            releaseYear: "",
            type: "",
            orderDirection: "ASC"
        };

        setLocalFilters(clearedFilters);
        setFilters(clearedFilters);
        setOrderField("barcode");
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
                                        <Form.Label>Barcode</Form.Label>
                                        <Form.Control 
                                        type="number" 
                                        name="barcode" 
                                        value={localFilters.barcode} 
                                        placeholder="Insert barcode"
                                        onChange={handleChange} 
                                        />
                                    
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="filterName">
                                        <Form.Label>Model</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="model" 
                                        value={localFilters.model} 
                                        placeholder="Insert model"
                                        onChange={handleChange} 
                                        />
                                    
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="filterName">
                                        <Form.Label>Release Year</Form.Label>
                                        <Form.Control 
                                        type="number" 
                                        name="releaseYear" 
                                        value={localFilters.releaseYear} 
                                        placeholder="Insert release year"
                                        onChange={handleChange} 
                                        />
                                    
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="filterName">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="type" 
                                        value={localFilters.type} 
                                        placeholder="Insert type"
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
