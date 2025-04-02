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
                                    <SearchBar 
                                        type="number"
                                        value={localFilters.barcode} 
                                        onChange={handleChange}
                                        name="Barcode"
                                        placeholder="Search by barcode"
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <SearchBar 
                                        value={localFilters.model} 
                                        onChange={handleChange}
                                        name="Model"
                                        placeholder="Search by Model"
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <SearchBar 
                                    type="number"
                                        value={localFilters.releaseYear} 
                                        onChange={handleChange}
                                        name="Release Year"
                                        placeholder="Search by Release Year"
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <SearchBar 
                                        value={localFilters.type} 
                                        onChange={handleChange}
                                        name="Type"
                                        placeholder="Search by Type"
                                    />
                                </Col>
                            </Row>
                            <Row className='d-flex align-items-center justify-content-center'>
                                <Col xs={12} md={6} lg={4} className="mt-3 mt-md-4">
                                    <Button variant="primary" type="submit" className="w-100 rounded-pill">
                                        Apply Filters
                                    </Button>
                                </Col>
                                <Col xs={12} md={6} lg={4} className="mt-2 mt-md-4">
                                    <Button 
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
