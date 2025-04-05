import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export default function SearchBar({ value, onChange, onSearch }) {
  const handleClear = () => {
    onChange('');
    onSearch('');
  };

  return (
    <InputGroup className="mb-3 shadow-sm">
      <FormControl
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-start rounded-sm"
      />
      <Button variant="primary" onClick={() => onSearch(value)} className="rounded-0">
        Search
      </Button>
      <Button variant="outline-secondary" onClick={handleClear} className="rounded-end rounded-sm">
        Clear
      </Button>
    </InputGroup>
  );
}
