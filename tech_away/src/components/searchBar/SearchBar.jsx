import React from 'react';
import { Row, Col, FormControl, Button } from 'react-bootstrap';

export default function SearchBar({ value, onChange, onSearch }) {
  const handleClear = () => {
    onChange('');
    onSearch('');
  };

  return (
    <Row className="mb-3 shadow-sm gx-2 align-items-center">
      <Col xs>
        <FormControl
          placeholder="Search by name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-start rounded-sm"
        />
      </Col>
      <Col xs="auto">
        <Button
          style={{
            backgroundColor: '#b5a8c9',
            color: 'white',
            border: 'none'
          }}
          variant="primary"
          type="submit"
          className="rounded-pill"
          onClick={() => onSearch(value)}
        >
          Search
        </Button>
      </Col>
      <Col xs="auto">
        <Button
          style={{
            backgroundColor: '#708c7e',
            color: 'white',
            border: 'none'
          }}
          variant="secondary"
          className="rounded-pill"
          onClick={handleClear}
        >
          Clear
        </Button>
      </Col>
    </Row>
  );
}
