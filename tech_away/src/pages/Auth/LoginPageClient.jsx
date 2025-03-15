// LoginPageClient.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Stack } from "react-bootstrap";
import LoginForms from '../../components/authentication/LoginForms';

export default function LoginPageClient() {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 56px)" }}>
            <div style={{ width: "700px", maxWidth: "100%", padding: "20px" }}>
                <LoginForms />
            </div>
        </div>
    );
}
