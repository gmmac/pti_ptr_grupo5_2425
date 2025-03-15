import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Stack } from "react-bootstrap";
import RegisterForms from '../../components/authentication/RegisterForms';

const mobileSize = 768;

export default function RegisterPageClient() {

    return (
        <div className="d-flex align-items-center justify-content-center overflow-hidden mt-3">
            <div style={{ width: "700px", maxWidth: "100%", padding: "20px" }}>
                <RegisterForms />
            </div>
        </div>
    );
}
