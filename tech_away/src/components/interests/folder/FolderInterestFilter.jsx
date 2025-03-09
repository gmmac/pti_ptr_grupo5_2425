import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Accordion } from 'react-bootstrap';
import { useFilter } from '../../../contexts/InterestsFilterProvider';
import SearchBar from '../../searchBar/SearchBar';

const FolderInterestFilter = () => {
    const { filters, setFilters } = useFilter();
    const [localFilters, setLocalFilters] = useState(filters);
    const [orderField, setOrderField] = useState('');
    const [orderDirection, setOrderDirection] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleOrderSelection = (field, direction) => {
        if (orderField === field && orderDirection === direction) {
            setOrderField('');
            setOrderDirection('');
        } else {
            setOrderField(field);
            setOrderDirection(direction);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...localFilters,
            orderBy: orderField,
            orderDirection: orderDirection,
        }));
    };

    const handleClear = () => {
        const clearedFilters = {
            name: '',
            recentlyAdded: '',
            clientNIC: '',
            orderBy: 'createdAt',
            orderDirection: 'DESC',
        };

        setLocalFilters(clearedFilters);
        setFilters(clearedFilters);
        setOrderField('createdAt');
        setOrderDirection('DESC');
    };

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    return (
        <Container className="my-4">
            <Accordion className="shadow-sm">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Show Filters</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className="gy-3 d-block d-flex flex-md-row">
                                {/* Name Filter */}
                                <Col xs={12} md={6}>
                                    <SearchBar 
                                        value={localFilters.name} 
                                        onChange={handleChange}
                                        name="name"
                                        placeholder="Search by Name"
                                    />
                                </Col>

                                {/* Name Sorting */}
                                <Col xs={6} md={3}>
                                    <Form.Group>
                                        <Form.Label className='d-flex justify-content-center'>Name Sorting</Form.Label>
                                        <Container className="d-flex flex-column flex-md-row gap-md-5 justify-content-md-center">
                                            <Form.Check
                                                type="radio"
                                                label="A-Z"
                                                name="sorting"
                                                checked={orderField === 'name' && orderDirection === 'ASC'}
                                                onChange={() => handleOrderSelection('name', 'ASC')}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Z-A"
                                                name="sorting"
                                                checked={orderField === 'name' && orderDirection === 'DESC'}
                                                onChange={() => handleOrderSelection('name', 'DESC')}
                                            />
                                        </Container>
                                    </Form.Group>
                                </Col>

                                {/* CreatedAt Sorting */}
                                <Col xs={6} md={3}>
                                    <Form.Group>
                                        <Form.Label className='d-flex justify-content-center'>Date Sorting</Form.Label>
                                        <Container className="d-flex flex-column flex-md-row gap-md-5 justify-content-md-center">
                                            <Form.Check
                                                type="radio"
                                                label="Oldest First"
                                                name="sorting"
                                                checked={orderField === 'createdAt' && orderDirection === 'ASC'}
                                                onChange={() => handleOrderSelection('createdAt', 'ASC')}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Newest First"
                                                name="sorting"
                                                checked={orderField === 'createdAt' && orderDirection === 'DESC'}
                                                onChange={() => handleOrderSelection('createdAt', 'DESC')}
                                            />
                                        </Container>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className='d-flex align-items-center justify-content-center'>
                                {/* Buttons */}
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
};

export default FolderInterestFilter;
