import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";
import SearchBar from "../searchBar/SearchBar";

export default function StoreFilter({ setFilters }) {
    const [localFilters, setLocalFilters] = useState({
        name: "",
        email: "",
        phone: "",
        openTime: "",
        closeTime: "",
        orderBy: "createdAt",
        orderDirection: "DESC"
    });
    
    const [orderField, setOrderField] = useState("createdAt");
    const [orderDirection, setOrderDirection] = useState("DESC");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleOrderSelection = (field, direction) => {
        if (orderField === field && orderDirection === direction) {
            setOrderField("createdAt");
            setOrderDirection("DESC");
        } else {
            setOrderField(field);
            setOrderDirection(direction);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilters({
            ...localFilters,
            orderBy: orderField,
            orderDirection: orderDirection,
        });
    };

    const handleClear = () => {
        const clearedFilters = {
            name: "",
            email: "",
            phone: "",
            openTime: "",
            closeTime: "",
            orderBy: "createdAt",
            orderDirection: "DESC"
        };

        setLocalFilters(clearedFilters);
        setFilters(clearedFilters);
        setOrderField("createdAt");
        setOrderDirection("DESC");
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
                                        value={localFilters.name} 
                                        onChange={handleChange}
                                        name="name"
                                        placeholder="Search by Name"
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <SearchBar 
                                        value={localFilters.email} 
                                        onChange={handleChange}
                                        name="email"
                                        placeholder="Search by Email"
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <SearchBar 
                                        value={localFilters.phone} 
                                        onChange={handleChange}
                                        name="phone"
                                        placeholder="Search by Phone"
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
