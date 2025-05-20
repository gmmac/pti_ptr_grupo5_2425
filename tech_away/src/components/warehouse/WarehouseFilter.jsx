import React,{useState,useEffect} from 'react';
import { Form, Button, Accordion, Container, Row, Col } from 'react-bootstrap';

export default function WarehouseFilter({ filters,onFilterChange,resetFilter }){
  const [local, setLocal]=useState({ name:'', totalSlots:'', availableSlots:'' });
  useEffect(()=>setLocal(filters),[filters]);
  useEffect(()=>{ if(resetFilter){ setLocal({ name:'', totalSlots:'', availableSlots:''}); onFilterChange({}); } },[resetFilter]);
  const handleChange=e=>setLocal({...local,[e.target.name]:e.target.value});
  const handleSubmit=e=>{e.preventDefault(); onFilterChange(local);} ;
  const handleClear=()=>{ setLocal({name:'',totalSlots:'',availableSlots:''}); onFilterChange({}); };
  return(
    <Container className="my-4">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Show Filters</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="gy-3">
                <Col md={4}><Form.Group controlId="filterName"><Form.Label>Name</Form.Label><Form.Control name="name" value={local.name} onChange={handleChange} placeholder="Name"/></Form.Group></Col>
                <Col md={4}><Form.Group controlId="filterTotal"><Form.Label>Total Slots</Form.Label><Form.Control name="totalSlots" value={local.totalSlots} onChange={handleChange} placeholder="Total Slots"/></Form.Group></Col>
                <Col md={4}><Form.Group controlId="filterAvail"><Form.Label>Available Slots</Form.Label><Form.Control name="availableSlots" value={local.availableSlots} onChange={handleChange} placeholder="Available Slots"/></Form.Group></Col>
              </Row>
              <Row className="mt-3"><Col md={6}><Button type="submit" className="w-100">Apply Filters</Button></Col><Col md={6}><Button variant="secondary" className="w-100" onClick={handleClear}>Clear Filters</Button></Col></Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}