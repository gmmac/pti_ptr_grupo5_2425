import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";
import SearchBar from "../searchBar/SearchBar";

export default function ClientFilter({ setFilters }) {
    const [localFilters, setLocalFilters] = useState({
        nic: "",
        name: "",
        email: "",
        phone: "",
        orderBy: "nic",
        orderDirection: "ASC"
    });
    
    const [orderField, setOrderField] = useState("nic");
    const [orderDirection, setOrderDirection] = useState("ASC");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({ ...prev, [name]: value }));

        console.log(localFilters)
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
            nic: "",
            name: "",
            email: "",
            phone: "",
            orderBy: "nic",
            orderDirection: "ASC"
        };

        setLocalFilters(clearedFilters);
        setFilters(clearedFilters);
        setOrderField("nic");
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
                                        <Form.Label>NIC</Form.Label>
                                        <Form.Control 
                                        type="number" 
                                        name="nic" 
                                        value={localFilters.nic} 
                                        placeholder="Insert NIC"
                                        onChange={handleChange} 
                                        />
                                    
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="filterName">
                                        <Form.Label>Client Name</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="name" 
                                        value={localFilters.name} 
                                        placeholder="Insert last name"
                                        onChange={handleChange} 
                                        />
                                    
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="filterName">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="email" 
                                        value={localFilters.email} 
                                        placeholder="Insert email"
                                        onChange={handleChange} 
                                        />
                                    
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="filterName">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control 
                                        type="number" 
                                        name="phone" 
                                        value={localFilters.phone} 
                                        placeholder="Insert phone number"
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
