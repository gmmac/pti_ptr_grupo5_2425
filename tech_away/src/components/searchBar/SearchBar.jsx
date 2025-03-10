import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

export default function SearchBar({ value, onChange, name, placeholder, type="text" }) {
    const [nameLower, setNameLower] = useState(name.toLowerCase())

    return (
        <Form.Group controlId={nameLower}>
            <Form.Label>{name}</Form.Label>
            <Form.Control
                type={type}
                name={nameLower}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="rounded-pill"
            />
        </Form.Group>
    );
}
