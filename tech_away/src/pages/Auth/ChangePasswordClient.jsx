// LoginPageClient.js
import React from 'react';
import ResetPasswordForms from '../../components/authentication/ResetPasswordForms';

export default function ChangePasswordClient() {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 56px)" }}>
            <div style={{ width: "700px", maxWidth: "100%", padding: "20px" }}>
                <ResetPasswordForms/>
            </div>
        </div>
    );
}
