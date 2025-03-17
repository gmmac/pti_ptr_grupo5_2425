// LoginPageClient.js
import React from 'react';
import LoginForms from '../../components/authentication/LoginForms';

export default function LoginPageClient({handle}) {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 56px)" }}>
            <div style={{ width: "700px", maxWidth: "100%", padding: "20px" }}>
                <LoginForms handle={handle}/>
            </div>
        </div>
    );
}
