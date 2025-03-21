import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";
import SearchBar from "../searchBar/SearchBar";

export default function StoreFilter({ setFilters }) {
    const [localFilters, setLocalFilters] = useState({
        nipc: "",
        name: "",
        email: "",
        phone: "",
        openTime: "",
        closeTime: "",
        address: "",
        // latitude: "",
        // longitude: "",
        orderBy: "nipc",
        orderDirection: "ASC"
    });
    
    const [orderField, setOrderField] = useState("nipc");
    const [orderDirection, setOrderDirection] = useState("ASC");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({ ...prev, [name]: value }));
    };

    // const handleOrderSelection = (field, direction) => {
    //     if (orderField === field && orderDirection === direction) {
    //         setOrderField("createdAt");
    //         setOrderDirection("DESC");
    //     } else {
    //         setOrderField(field);
    //         setOrderDirection(direction);
    //     }
    // };

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
            nipc: "",
            name: "",
            email: "",
            phone: "",
            openTime: "",
            closeTime: "",
            address: "",
            // latitude: "",
            // longitude: "",
            orderBy: "nipc",
            orderDirection: "ASC"
        };

        setLocalFilters(clearedFilters);
        setFilters(clearedFilters);
        setOrderField("nipc");
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
                                        value={localFilters.nipc} 
                                        onChange={handleChange}
                                        name="NIPC"
                                        placeholder="Search by NIPC"
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <SearchBar 
                                        value={localFilters.name} 
                                        onChange={handleChange}
                                        name="Name"
                                        placeholder="Search by Name"
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <SearchBar 
                                        value={localFilters.email} 
                                        onChange={handleChange}
                                        name="Email"
                                        placeholder="Search by Email"
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <SearchBar 
                                        value={localFilters.address} 
                                        onChange={handleChange}
                                        name="Address"
                                        placeholder="Search by Address"
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
